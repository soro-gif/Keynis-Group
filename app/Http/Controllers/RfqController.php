<?php

namespace App\Http\Controllers;

use App\Mail\RfqConfirmed;
use App\Mail\RfqSubmitted;
use App\Mail\VehicleRfqSubmitted;
use App\Models\Rfq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RfqController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Rfq/Create', [
            'presetType' => $request->query('type'),
            'presetSubject' => $request->query('subject'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'in:demande,offre,partenariat'],
            'type' => ['required', 'string', 'in:'.implode(',', [
                'demande_produit', 'demande_sourcing', 'demande_commodity', 'demande_logistique', 'recherche_actif',
                'offre_produit', 'offre_stock', 'offre_producteur', 'offre_fabricant', 'offre_actif',
                'partenariat_fournisseur', 'partenariat_producteur', 'partenariat_logistique', 'partenariat_distributeur',
            ])],
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'whatsapp' => ['nullable', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'email' => ['required', 'email', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'quantity' => ['nullable', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date', 'after_or_equal:today'],
            'delivery_location' => ['nullable', 'string', 'max:255'],
        ], [
            'phone.regex' => 'Le numéro de téléphone n\'est pas valide.',
            'whatsapp.regex' => 'Le numéro WhatsApp n\'est pas valide.',
            'deadline.after_or_equal' => 'Le délai souhaité ne peut pas être une date passée.',
            'type.in' => 'Le type de démarche sélectionné n\'est pas valide.',
        ]);

        $rfq = Rfq::create($validated);

        $isVehicleRequest = in_array($rfq->type, ['recherche_actif', 'offre_actif'], true)
            && Str::of($rfq->subject)->lower()->contains(['véhicule', 'vehicule']);

        try {
            Mail::to('admin@keynisgroup.ci')->send($isVehicleRequest ? new VehicleRfqSubmitted($rfq) : new RfqSubmitted($rfq));
        } catch (\Throwable $e) {
            Log::error('Échec de l\'envoi du mail de notification RFQ', [
                'rfq_id' => $rfq->id,
                'error' => $e->getMessage(),
            ]);
        }

        session()->flash('rfq_submission_id', $rfq->id);
        session()->flash('rfq_submission', [
            'reference' => $rfq->reference,
            'category' => $rfq->category,
            'type' => $rfq->type,
            'name' => $rfq->name,
            'company' => $rfq->company,
            'phone' => $rfq->phone,
            'whatsapp' => $rfq->whatsapp,
            'email' => $rfq->email,
            'country' => $rfq->country,
            'city' => $rfq->city,
            'subject' => $rfq->subject,
            'description' => $rfq->description,
            'quantity' => $rfq->quantity,
            'budget' => $rfq->budget,
            'deadline' => $rfq->deadline?->toDateString(),
            'delivery_location' => $rfq->delivery_location,
            'submitted_at' => $rfq->created_at,
            'confirmed_at' => null,
        ]);

        return redirect()->route('rfq.confirmation');
    }

    public function confirmation(): Response|RedirectResponse
    {
        $submission = session('rfq_submission');

        if (! $submission) {
            return redirect()->route('rfq.create');
        }

        session()->keep(['rfq_submission', 'rfq_submission_id']);

        return Inertia::render('Rfq/Confirmation', [
            'submission' => $submission,
        ]);
    }

    public function confirm(): RedirectResponse
    {
        $id = session('rfq_submission_id');
        $submission = session('rfq_submission');

        if (! $id || ! $submission) {
            return redirect()->route('rfq.create');
        }

        $rfq = Rfq::find($id);

        if ($rfq && ! $rfq->confirmed_at) {
            $rfq->update(['confirmed_at' => now()]);

            try {
                Mail::to('admin@keynisgroup.ci')->send(new RfqConfirmed($rfq));
            } catch (\Throwable $e) {
                Log::error('Échec de l\'envoi du mail de confirmation RFQ', [
                    'rfq_id' => $rfq->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $submission['confirmed_at'] = $rfq?->confirmed_at;

        session()->flash('rfq_submission_id', $id);
        session()->flash('rfq_submission', $submission);

        return redirect()->route('rfq.confirmation');
    }
}
