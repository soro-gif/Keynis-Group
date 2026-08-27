<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ProductCategories/Index', [
            'categories' => ProductCategory::with('parent:id,name')
                ->withCount('products')
                ->orderBy('order')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/ProductCategories/Form', [
            'parents' => ProductCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);
        $validated['slug'] = $this->uniqueSlug($validated['name']);

        ProductCategory::create($validated);

        return redirect()->route('admin.product-categories.index')->with('success', 'Catégorie créée.');
    }

    public function edit(ProductCategory $productCategory): Response
    {
        return Inertia::render('Admin/ProductCategories/Form', [
            'category' => $productCategory,
            'parents' => ProductCategory::where('id', '!=', $productCategory->id)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory): RedirectResponse
    {
        $validated = $this->validated($request, $productCategory);

        if ($validated['name'] !== $productCategory->name) {
            $validated['slug'] = $this->uniqueSlug($validated['name'], $productCategory->id);
        }

        $productCategory->update($validated);

        return redirect()->route('admin.product-categories.index')->with('success', 'Catégorie mise à jour.');
    }

    public function destroy(ProductCategory $productCategory): RedirectResponse
    {
        $productCategory->delete();

        return redirect()->route('admin.product-categories.index')->with('success', 'Catégorie supprimée.');
    }

    private function validated(Request $request, ?ProductCategory $category = null): array
    {
        return $request->validate([
            'parent_id' => array_filter([
                'nullable',
                'exists:product_categories,id',
                $category ? 'not_in:'.$category->id : null,
            ]),
            'name' => ['required', 'string', 'max:255'],
            'sector' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 1;

        while (
            ProductCategory::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
