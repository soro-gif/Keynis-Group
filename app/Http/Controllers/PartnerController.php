<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'category' => ['required', 'string'],
            'company_name' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'sector' => ['nullable', 'string', 'max:255'],
            'products_services' => ['nullable', 'string'],
            'capacities' => ['nullable', 'string'],
            'coverage_area' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partners', 'public');
        }

        $validated['status'] = 'nouveau';

        Partner::create($validated);

        return back()->with('success', 'Votre candidature a bien été enregistrée. Notre équipe sourcing reviendra vers vous.');
    }
}
