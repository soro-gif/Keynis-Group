<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AssetController extends Controller
{
    public function index(Request $request): Response
    {
        $assets = Asset::query()
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->with('category:id,name')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Assets/Index', [
            'assets' => $assets,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Assets/Form', [
            'categories' => AssetCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['nullable', 'exists:asset_categories,id'],
            'listing_type' => ['required', 'in:propose,recherche'],
            'owner_name' => ['required', 'string', 'max:255'],
            'owner_company' => ['nullable', 'string', 'max:255'],
            'owner_phone' => ['required', 'string', 'max:50'],
            'owner_whatsapp' => ['nullable', 'string', 'max:50'],
            'owner_email' => ['nullable', 'email', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:10'],
            'capacity' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'availability' => ['nullable', 'string', 'max:255'],
            'indicative_price' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:en_attente,publie,indisponible'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            $validated['photos'] = [$request->file('image')->store('assets', 'public')];
        }
        unset($validated['image']);

        $asset = Asset::create($validated);

        return redirect()->route('admin.assets.show', $asset)->with('success', 'Actif créé.');
    }

    public function show(Asset $asset): Response
    {
        $asset->load('category:id,name');

        return Inertia::render('Admin/Assets/Show', [
            'asset' => $asset,
        ]);
    }

    public function edit(Asset $asset): Response
    {
        return Inertia::render('Admin/Assets/Form', [
            'asset' => $asset,
            'categories' => AssetCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Asset $asset): RedirectResponse
    {
        // The status dropdown in the list/show views submits just {status};
        // the full edit form submits every field. Both hit this endpoint.
        $validated = $request->validate([
            'category_id' => ['sometimes', 'nullable', 'exists:asset_categories,id'],
            'listing_type' => ['sometimes', 'in:propose,recherche'],
            'owner_name' => ['sometimes', 'string', 'max:255'],
            'owner_company' => ['sometimes', 'nullable', 'string', 'max:255'],
            'owner_phone' => ['sometimes', 'string', 'max:50'],
            'owner_whatsapp' => ['sometimes', 'nullable', 'string', 'max:50'],
            'owner_email' => ['sometimes', 'nullable', 'email', 'max:255'],
            'name' => ['sometimes', 'string', 'max:255'],
            'brand' => ['sometimes', 'nullable', 'string', 'max:255'],
            'model' => ['sometimes', 'nullable', 'string', 'max:255'],
            'year' => ['sometimes', 'nullable', 'string', 'max:10'],
            'capacity' => ['sometimes', 'nullable', 'string', 'max:255'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'availability' => ['sometimes', 'nullable', 'string', 'max:255'],
            'indicative_price' => ['sometimes', 'nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'status' => ['required', 'in:en_attente,publie,indisponible'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            foreach ($asset->photos ?? [] as $existing) {
                Storage::disk('public')->delete($existing);
            }

            $validated['photos'] = [$request->file('image')->store('assets', 'public')];
        }
        unset($validated['image']);

        $asset->update($validated);

        return back()->with('success', 'Actif mis à jour.');
    }

    public function destroy(Asset $asset): RedirectResponse
    {
        foreach ($asset->photos ?? [] as $existing) {
            Storage::disk('public')->delete($existing);
        }

        $asset->delete();

        return redirect()->route('admin.assets.index')->with('success', 'Actif supprimé.');
    }
}
