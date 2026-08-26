<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Maps a product category's sector to the asset categories (by family)
     * that are relevant to it, so the catalog can surface rentable assets
     * alongside sellable products. Every sector maps to at least one family.
     */
    private const SECTOR_TO_ASSET_FAMILIES = [
        'agriculture' => ['machines_agricoles'],
        'commodities' => ['vehicules', 'infrastructures'],
        'btp' => ['engins_btp'],
        'industrie' => ['equipements', 'engins_btp'],
        'equipements' => ['equipements', 'vehicules'],
        'eau_energie' => ['equipements'],
        'froid' => ['infrastructures'],
        'materiaux' => ['vehicules', 'infrastructures'],
        'produits_pro' => ['equipements'],
    ];

    public function index(Request $request): Response
    {
        $selectedCategory = $request->category
            ? ProductCategory::where('slug', $request->category)->first()
            : null;

        $products = Product::query()
            ->when($request->category, fn ($query, $slug) => $query->whereHas(
                'category',
                fn ($q) => $q->where('slug', $slug)
            ))
            ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->with('category:id,name,slug')
            ->latest()
            ->paginate(6)
            ->withQueryString();

        $relatedAssets = collect();

        if ($selectedCategory && $families = self::SECTOR_TO_ASSET_FAMILIES[$selectedCategory->sector] ?? null) {
            $relatedAssets = Asset::where('listing_type', 'propose')
                ->where('status', 'publie')
                ->whereHas('category', fn ($q) => $q->whereIn('family', $families))
                ->with('category:id,name,slug,family')
                ->latest()
                ->limit(6)
                ->get(['id', 'name', 'brand', 'model', 'location', 'photos', 'category_id']);
        }

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => ProductCategory::orderBy('order')->get(['id', 'name', 'slug', 'sector']),
            'filters' => $request->only(['category', 'search']),
            'relatedAssets' => $relatedAssets,
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::where('slug', $slug)->with('category')->firstOrFail();

        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get(['id', 'name', 'slug', 'images']);

        return Inertia::render('Products/Show', [
            'product' => $product,
            'related' => $related,
        ]);
    }

    public function commodities(Request $request): Response
    {
        $commodities = Product::query()
            ->where('type', 'commodity')
            ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Commodities', [
            'commodities' => $commodities,
            'filters' => $request->only(['search']),
        ]);
    }
}
