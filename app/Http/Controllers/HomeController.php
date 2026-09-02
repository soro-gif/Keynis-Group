<?php

namespace App\Http\Controllers;

use App\Models\MarketWatchArticle;
use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'categories' => ProductCategory::whereNull('parent_id')
                ->orderBy('order')
                ->get(['id', 'name', 'slug', 'sector', 'icon']),
            'featuredProducts' => Product::whereHas('category', fn ($q) => $q->where('slug', 'equipements-machines'))
                ->orderByDesc('is_featured')
                ->latest()
                ->limit(6)
                ->get(['id', 'name', 'slug', 'type', 'origin', 'images']),
            'latestArticles' => MarketWatchArticle::where('status', 'publie')
                ->latest('published_at')
                ->limit(3)
                ->get(['id', 'title', 'slug', 'category', 'excerpt', 'cover_image', 'published_at']),
        ]);
    }
}
