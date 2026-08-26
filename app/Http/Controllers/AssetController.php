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
            'image' => ['nullable', 'image', 'max:4096'],
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
