<?php

namespace App\Http\Controllers;

use App\Models\Rfq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RfqController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Rfq/Create', [
            'presetType' => $request->query('type'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'in:demande,offre,partenariat'],
            'type' => ['required', 'string', 'max:100'],
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quantity' => ['nullable', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
            'delivery_location' => ['nullable', 'string', 'max:255'],
        ]);

        $rfq = Rfq::create($validated);

        return redirect()
            ->route('rfq.create')
            ->with('success', "Votre demande a bien été enregistrée sous la référence {$rfq->reference}. Notre équipe reviendra vers vous rapidement.");
    }
}
