<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rfq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RfqController extends Controller
{
    public function index(Request $request): Response
    {
        $rfqs = Rfq::query()
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->when($request->category, fn ($query, $category) => $query->where('category', $category))
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Rfqs/Index', [
            'rfqs' => $rfqs,
            'filters' => $request->only(['status', 'category']),
        ]);
    }

    public function show(Rfq $rfq): Response
    {
        return Inertia::render('Admin/Rfqs/Show', [
            'rfq' => $rfq,
        ]);
    }

    public function edit(Rfq $rfq): Response
    {
        return Inertia::render('Admin/Rfqs/Form', [
            'rfq' => $rfq,
        ]);
    }

    public function update(Request $request, Rfq $rfq): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['sometimes', 'in:demande,offre,partenariat'],
            'type' => ['sometimes', 'string', 'max:100'],
            'name' => ['sometimes', 'string', 'max:255'],
            'company' => ['sometimes', 'nullable', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', 'max:50'],
            'whatsapp' => ['sometimes', 'nullable', 'string', 'max:50'],
            'email' => ['sometimes', 'email', 'max:255'],
            'country' => ['sometimes', 'nullable', 'string', 'max:255'],
            'city' => ['sometimes', 'nullable', 'string', 'max:255'],
            'subject' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'quantity' => ['sometimes', 'nullable', 'string', 'max:255'],
            'budget' => ['sometimes', 'nullable', 'string', 'max:255'],
            'deadline' => ['sometimes', 'nullable', 'date'],
            'delivery_location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => ['required', 'in:nouvelle,en_analyse,sourcing,offre_disponible,negociation,validee,livraison,cloturee,annulee,rejetee,en_attente'],
        ]);

        $rfq->update($validated);

        return back()->with('success', 'Demande mise à jour.');
    }

    public function destroy(Rfq $rfq): RedirectResponse
    {
        $rfq->delete();

        return redirect()->route('admin.rfqs.index')->with('success', 'Demande supprimée.');
    }
}
