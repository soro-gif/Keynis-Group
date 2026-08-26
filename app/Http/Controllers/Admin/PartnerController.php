<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(Request $request): Response
    {
        $partners = Partner::query()
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Partners/Form');
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
            'status' => ['required', 'in:nouveau,en_qualification,valide,rejete'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partners', 'public');
        }

        $partner = Partner::create($validated);

        return redirect()->route('admin.partners.show', $partner)->with('success', 'Partenaire créé.');
    }

    public function show(Partner $partner): Response
    {
        return Inertia::render('Admin/Partners/Show', [
            'partner' => $partner,
        ]);
    }

    public function edit(Partner $partner): Response
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => $partner,
        ]);
    }

    public function update(Request $request, Partner $partner): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['sometimes', 'string'],
            'company_name' => ['sometimes', 'string', 'max:255'],
            'contact_name' => ['sometimes', 'string', 'max:255'],
            'country' => ['sometimes', 'string', 'max:255'],
            'city' => ['sometimes', 'nullable', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', 'max:50'],
            'whatsapp' => ['sometimes', 'nullable', 'string', 'max:50'],
            'email' => ['sometimes', 'email', 'max:255'],
            'website' => ['sometimes', 'nullable', 'string', 'max:255'],
            'sector' => ['sometimes', 'nullable', 'string', 'max:255'],
            'products_services' => ['sometimes', 'nullable', 'string'],
            'capacities' => ['sometimes', 'nullable', 'string'],
            'coverage_area' => ['sometimes', 'nullable', 'string', 'max:255'],
            'message' => ['sometimes', 'nullable', 'string'],
            'status' => ['required', 'in:nouveau,en_qualification,valide,rejete'],
            'logo' => ['sometimes', 'nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('logo')) {
            if ($partner->logo) {
                Storage::disk('public')->delete($partner->logo);
            }

            $validated['logo'] = $request->file('logo')->store('partners', 'public');
        } else {
            unset($validated['logo']);
        }

        $partner->update($validated);

        return back()->with('success', 'Partenaire mis à jour.');
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        if ($partner->logo) {
            Storage::disk('public')->delete($partner->logo);
        }

        $partner->delete();

        return redirect()->route('admin.partners.index')->with('success', 'Partenaire supprimé.');
    }
}
