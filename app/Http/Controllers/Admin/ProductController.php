<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->when($request->type, fn ($query, $type) => $query->where('type', $type))
            ->with('category:id,name')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only(['type']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'categories' => ProductCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);
        $validated['slug'] = $this->uniqueSlug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['images'] = [$request->file('image')->store('products', 'public')];
        }
        unset($validated['image']);

        $product = Product::create($validated);

        return redirect()->route('admin.products.show', $product)->with('success', 'Produit créé.');
    }

    public function show(Product $product): Response
    {
        $product->load('category:id,name');

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => $product,
            'categories' => ProductCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $this->validated($request);

        if ($validated['name'] !== $product->name) {
            $validated['slug'] = $this->uniqueSlug($validated['name'], $product->id);
        }

        if ($request->hasFile('image')) {
            foreach ($product->images ?? [] as $existing) {
                Storage::disk('public')->delete($existing);
            }

            $validated['images'] = [$request->file('image')->store('products', 'public')];
        }
        unset($validated['image']);

        $product->update($validated);

        return redirect()->route('admin.products.show', $product)->with('success', 'Produit mis à jour.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        foreach ($product->images ?? [] as $existing) {
            Storage::disk('public')->delete($existing);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'category_id' => ['nullable', 'exists:product_categories,id'],
            'type' => ['required', 'in:produit,commodity'],
            'name' => ['required', 'string', 'max:255'],
            'reference' => ['nullable', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'origin' => ['nullable', 'string', 'max:255'],
            'conditioning' => ['nullable', 'string', 'max:255'],
            'min_quantity' => ['nullable', 'string', 'max:255'],
            'quantity_available' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'price_mode' => ['required', 'in:affiche,masque,sur_demande'],
            'price' => ['nullable', 'numeric'],
            'status' => ['required', 'in:disponible,indisponible,sur_demande'],
            'is_featured' => ['boolean'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 1;

        while (Product::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
