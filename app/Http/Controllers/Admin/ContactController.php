<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(Request $request): Response
    {
        $contacts = Contact::query()
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'filters' => $request->only(['status']),
        ]);
    }

    public function update(Request $request, Contact $contact): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:nouveau,traite'],
        ]);

        $contact->update($validated);

        return back()->with('success', 'Statut du message mis à jour.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return back()->with('success', 'Message supprimé.');
    }
}
