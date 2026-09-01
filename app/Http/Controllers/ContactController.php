<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormSubmitted;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50', 'regex:/^[0-9+\-\s()]{6,20}$/'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ], [
            'name.required' => 'Indiquez votre nom pour que nous sachions à qui répondre.',
            'email.required' => 'Cette adresse e-mail est incomplète.',
            'email.email' => 'Cette adresse e-mail est incomplète.',
            'phone.regex' => 'Le numéro de téléphone n\'est pas valide.',
            'subject.required' => 'Précisez l\'objet de votre demande.',
            'message.required' => 'Décrivez votre demande en quelques mots (10 caractères minimum).',
            'message.min' => 'Décrivez votre demande en quelques mots (10 caractères minimum).',
        ]);

        $contact = Contact::create($validated);

        try {
            Mail::to('admin@keynisgroup.ci')->send(new ContactFormSubmitted($contact));
        } catch (\Throwable $e) {
            Log::error('Échec de l\'envoi du mail de notification de contact', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage(),
            ]);
        }

        session()->flash('contact_submission_id', $contact->id);
        session()->flash('contact_submission', [
            'reference' => 'CT-'.str_pad((string) $contact->id, 6, '0', STR_PAD_LEFT),
            'name' => $contact->name,
            'email' => $contact->email,
            'phone' => $contact->phone,
            'subject' => $contact->subject,
            'message' => $contact->message,
            'submitted_at' => $contact->created_at,
            'confirmed_at' => null,
        ]);

        return redirect()->route('contact.confirmation');
    }

    public function confirmation(): Response|RedirectResponse
    {
        $submission = session('contact_submission');

        if (! $submission) {
            return redirect()->route('contact');
        }

        session()->keep(['contact_submission', 'contact_submission_id']);

        return Inertia::render('Contact/Confirmation', [
            'submission' => $submission,
        ]);
    }

    public function confirm(): RedirectResponse
    {
        $id = session('contact_submission_id');
        $submission = session('contact_submission');

        if (! $id || ! $submission) {
            return redirect()->route('contact');
        }

        $contact = Contact::find($id);

        if ($contact && ! $contact->confirmed_at) {
            $contact->update(['confirmed_at' => now()]);
        }

        $submission['confirmed_at'] = $contact?->confirmed_at;

        session()->flash('contact_submission_id', $id);
        session()->flash('contact_submission', $submission);

        return redirect()->route('contact.confirmation');
    }
}
