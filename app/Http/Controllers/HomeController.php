<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\MarketWatchArticle;
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
            'featuredProducts' => Asset::where('listing_type', 'propose')
                ->where('status', 'publie')
                ->whereHas('category', fn ($q) => $q->whereIn('family', ['equipements', 'vehicules']))
                ->latest()
                ->limit(6)
                ->get(['id', 'name', 'brand', 'model', 'location', 'photos']),
            'latestArticles' => MarketWatchArticle::where('status', 'publie')
                ->latest('published_at')
                ->limit(3)
                ->get(['id', 'title', 'slug', 'category', 'excerpt', 'cover_image', 'published_at']),
        ]);
    }
}
