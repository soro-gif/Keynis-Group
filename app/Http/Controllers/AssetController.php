<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:asset_categories,id'],
            'owner_name' => ['required', 'string', 'max:255'],
            'owner_type' => ['nullable', 'string', 'max:100'],
            'owner_company' => ['nullable', 'string', 'max:255'],
            'owner_phone' => ['required', 'string', 'max:50'],
            'owner_whatsapp' => ['nullable', 'string', 'max:50'],
            'owner_email' => ['nullable', 'email', 'max:255'],
            'id_number' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'contact_role' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:10'],
            'capacity' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'availability' => ['nullable', 'string', 'max:255'],
            'indicative_price' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
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
            'price_per_day' => ['nullable', 'string', 'max:50'],
            'price_per_mission' => ['nullable', 'string', 'max:50'],
            'documents_provided' => ['nullable', 'array'],
            'documents_provided.*' => ['string', 'max:255'],
            'agreement' => ['accepted'],
        ]);

        if ($request->hasFile('image')) {
            $validated['photos'] = [$request->file('image')->store('assets', 'public')];
        }
        unset($validated['image']);

        $validated['listing_type'] = 'propose';
        $validated['status'] = 'en_attente';

        Asset::create($validated);

        return back()->with('success', 'Votre actif a bien été soumis. Notre équipe le validera avant publication.');
    }
}
