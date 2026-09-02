<?php

namespace App\Http\Controllers;

use App\Mail\VehicleAssetSubmitted;
use App\Models\Asset;
use App\Models\AssetCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class AssetController extends Controller
{
    public function index(Request $request): Response
    {
        $assets = Asset::query()
            ->where('listing_type', 'propose')
            ->where('status', 'publie')
            ->when($request->family, fn ($query, $family) => $query->whereHas(
                'category',
                fn ($q) => $q->where('family', $family)
            ))
            ->when($request->category, fn ($query, $slug) => $query->whereHas(
                'category',
                fn ($q) => $q->where('slug', $slug)
            ))
            ->with('category:id,name,slug,family')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Assets/Index', [
            'assets' => $assets,
            'categories' => AssetCategory::orderBy('name')->get(['id', 'name', 'slug', 'family']),
            'filters' => $request->only(['family', 'category']),
        ]);
    }

    public function show(Asset $asset): Response
    {
        abort_unless($asset->listing_type === 'propose' && $asset->status === 'publie', 404);

        $asset->load('category:id,name,slug,family');

        $related = Asset::where('listing_type', 'propose')
            ->where('status', 'publie')
            ->where('category_id', $asset->category_id)
            ->where('id', '!=', $asset->id)
            ->limit(4)
            ->get(['id', 'name', 'brand', 'model', 'photos']);

        return Inertia::render('Assets/Show', [
            'asset' => $asset,
            'related' => $related,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:asset_categories,id'],
            'owner_name' => ['required', 'string', 'max:255'],
            'owner_type' => ['nullable', 'string', 'max:100'],
            'owner_company' => ['nullable', 'string', 'max:255'],
            'owner_phone' => ['required', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'owner_whatsapp' => ['nullable', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'owner_email' => ['nullable', 'email', 'max:255'],
            'id_number' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'contact_role' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'regex:/^(19|20)\d{2}$/'],
            'capacity' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'availability' => ['nullable', 'string', 'max:255'],
            'indicative_price' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'image' => ['nullable', 'image', 'max:4096'],
            'vehicle_category' => ['nullable', 'string', 'max:100'],
            'registration' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:50'],
            'mileage' => ['nullable', 'string', 'max:50'],
            'condition' => ['nullable', 'string', 'max:100'],
            'transmission' => ['nullable', 'string', 'max:50'],
            'engine' => ['nullable', 'string', 'max:100'],
            'air_conditioning' => ['nullable', 'string', 'max:50'],
            'equipment' => ['nullable', 'string', 'max:255'],
            'intervention_zone' => ['nullable', 'string', 'max:255'],
            'driver_available' => ['nullable', 'string', 'max:100'],
            'available_days' => ['nullable', 'array'],
            'available_days.*' => ['string', 'max:50'],
            'schedule' => ['nullable', 'array'],
            'schedule.*' => ['string', 'max:50'],
            'service_zone' => ['nullable', 'array'],
            'service_zone.*' => ['string', 'max:50'],
            'duration_type' => ['nullable', 'array'],
            'duration_type.*' => ['string', 'max:50'],
            'with_driver' => ['nullable', 'string', 'max:50'],
            'price_per_day' => ['nullable', 'string', 'max:50', 'regex:/^[0-9\s]+$/'],
            'price_per_mission' => ['nullable', 'string', 'max:50', 'regex:/^[0-9\s]+$/'],
            'documents_provided' => ['nullable', 'array'],
            'documents_provided.*' => ['string', 'max:255'],
            'agreement' => ['accepted'],
        ], [
            'owner_phone.regex' => 'Le numéro de téléphone n\'est pas valide.',
            'owner_whatsapp.regex' => 'Le numéro WhatsApp n\'est pas valide.',
            'year.regex' => "L'année doit être un nombre à 4 chiffres (ex : 2020).",
            'price_per_day.regex' => 'Le montant par jour doit être un nombre.',
            'price_per_mission.regex' => 'Le montant par mission doit être un nombre.',
        ]);

        if ($request->hasFile('image')) {
            $validated['photos'] = [$request->file('image')->store('assets', 'public')];
        }
        unset($validated['image']);

        $validated['listing_type'] = 'propose';
        $validated['status'] = 'en_attente';

        $asset = Asset::create($validated);
        $asset->load('category');

        if ($asset->category?->family === 'vehicules') {
            try {
                Mail::to('admin@keynisgroup.ci')->send(new VehicleAssetSubmitted($asset));
            } catch (\Throwable $e) {
                Log::error('Échec de l\'envoi du mail de notification véhicule (actif proposé)', [
                    'asset_id' => $asset->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        session()->flash('asset_submission_id', $asset->id);
        session()->flash('asset_submission', [
            'reference' => 'ACT-'.str_pad((string) $asset->id, 6, '0', STR_PAD_LEFT),
            'owner_name' => $asset->owner_name,
            'owner_type' => $asset->owner_type,
            'owner_company' => $asset->owner_company,
            'owner_phone' => $asset->owner_phone,
            'owner_whatsapp' => $asset->owner_whatsapp,
            'owner_email' => $asset->owner_email,
            'id_number' => $asset->id_number,
            'address' => $asset->address,
            'city' => $asset->city,
            'contact_person' => $asset->contact_person,
            'contact_role' => $asset->contact_role,
            'category_name' => $asset->category?->name,
            'name' => $asset->name,
            'brand' => $asset->brand,
            'model' => $asset->model,
            'year' => $asset->year,
            'capacity' => $asset->capacity,
            'location' => $asset->location,
            'availability' => $asset->availability,
            'indicative_price' => $asset->indicative_price,
            'description' => $asset->description,
            'vehicle_category' => $asset->vehicle_category,
            'registration' => $asset->registration,
            'color' => $asset->color,
            'mileage' => $asset->mileage,
            'condition' => $asset->condition,
            'transmission' => $asset->transmission,
            'engine' => $asset->engine,
            'air_conditioning' => $asset->air_conditioning,
            'equipment' => $asset->equipment,
            'intervention_zone' => $asset->intervention_zone,
            'driver_available' => $asset->driver_available,
            'available_days' => $asset->available_days,
            'schedule' => $asset->schedule,
            'service_zone' => $asset->service_zone,
            'duration_type' => $asset->duration_type,
            'with_driver' => $asset->with_driver,
            'price_per_day' => $asset->price_per_day,
            'price_per_mission' => $asset->price_per_mission,
            'documents_provided' => $asset->documents_provided,
            'submitted_at' => $asset->created_at,
            'confirmed_at' => null,
        ]);

        return redirect()->route('assets.confirmation');
    }

    public function confirmation(): Response|RedirectResponse
    {
        $submission = session('asset_submission');

        if (! $submission) {
            return redirect()->route('assets.index');
        }

        session()->keep(['asset_submission', 'asset_submission_id']);

        return Inertia::render('Assets/Confirmation', [
            'submission' => $submission,
        ]);
    }

    public function confirm(): RedirectResponse
    {
        $id = session('asset_submission_id');
        $submission = session('asset_submission');

        if (! $id || ! $submission) {
            return redirect()->route('assets.index');
        }

        $asset = Asset::find($id);

        if ($asset && ! $asset->confirmed_at) {
            $asset->update(['confirmed_at' => now()]);
        }

        $submission['confirmed_at'] = $asset?->confirmed_at;

        session()->flash('asset_submission_id', $id);
        session()->flash('asset_submission', $submission);

        return redirect()->route('assets.confirmation');
    }
}
