<?php

namespace App\Http\Controllers;

use App\Mail\PartnerConfirmed;
use App\Mail\PartnerSubmitted;
use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Partners/Index', [
            'partners' => Partner::where('status', 'valide')
                ->latest()
                ->get(['id', 'company_name', 'logo', 'category', 'country', 'city', 'sector']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'in:'.implode(',', [
                'producteur', 'cooperative', 'fabricant', 'fournisseur', 'detenteur_stock',
                'proprietaire_actif', 'transporteur', 'transitaire', 'entrepositaire', 'distributeur',
            ])],
            'company_name' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'whatsapp' => ['nullable', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'email' => ['required', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'sector' => ['nullable', 'string', 'max:255'],
            'products_services' => ['nullable', 'string', 'max:2000'],
            'capacities' => ['nullable', 'string', 'max:2000'],
            'coverage_area' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ], [
            'category.in' => 'La catégorie sélectionnée n\'est pas valide.',
            'phone.regex' => 'Le numéro de téléphone n\'est pas valide.',
            'whatsapp.regex' => 'Le numéro WhatsApp n\'est pas valide.',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partners', 'public');
        }

        $validated['status'] = 'nouveau';

        $partner = Partner::create($validated);

        try {
            Mail::to('admin@keynisgroup.ci')->send(new PartnerSubmitted($partner));
        } catch (\Throwable $e) {
            Log::error('Échec de l\'envoi du mail de notification partenaire', [
                'partner_id' => $partner->id,
                'error' => $e->getMessage(),
            ]);
        }

        session()->flash('partner_submission_id', $partner->id);
        session()->flash('partner_submission', [
            'reference' => 'PART-'.str_pad((string) $partner->id, 6, '0', STR_PAD_LEFT),
            'category' => $partner->category,
            'company_name' => $partner->company_name,
            'logo' => $partner->logo,
            'sector' => $partner->sector,
            'contact_name' => $partner->contact_name,
            'country' => $partner->country,
            'city' => $partner->city,
            'phone' => $partner->phone,
            'whatsapp' => $partner->whatsapp,
            'email' => $partner->email,
            'website' => $partner->website,
            'products_services' => $partner->products_services,
            'capacities' => $partner->capacities,
            'coverage_area' => $partner->coverage_area,
            'message' => $partner->message,
            'submitted_at' => $partner->created_at,
            'confirmed_at' => null,
        ]);

        return redirect()->route('partners.confirmation');
    }

    public function confirmation(): Response|RedirectResponse
    {
        $submission = session('partner_submission');

        if (! $submission) {
            return redirect()->route('partners.index');
        }

        session()->keep(['partner_submission', 'partner_submission_id']);

        return Inertia::render('Partners/Confirmation', [
            'submission' => $submission,
        ]);
    }

    public function confirm(): RedirectResponse
    {
        $id = session('partner_submission_id');
        $submission = session('partner_submission');

        if (! $id || ! $submission) {
            return redirect()->route('partners.index');
        }

        $partner = Partner::find($id);

        if ($partner && ! $partner->confirmed_at) {
            $partner->update(['confirmed_at' => now()]);

            try {
                Mail::to('admin@keynisgroup.ci')->send(new PartnerConfirmed($partner));
            } catch (\Throwable $e) {
                Log::error('Échec de l\'envoi du mail de confirmation partenaire', [
                    'partner_id' => $partner->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $submission['confirmed_at'] = $partner?->confirmed_at;

        session()->flash('partner_submission_id', $id);
        session()->flash('partner_submission', $submission);

        return redirect()->route('partners.confirmation');
    }
}
