<?php

namespace App\Http\Controllers;

use App\Models\MarketWatchArticle;
use Inertia\Inertia;
use Inertia\Response;

class MarketWatchController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('MarketWatch/Index', [
            'articles' => MarketWatchArticle::where('status', 'publie')
                ->latest('published_at')
                ->paginate(9),
        ]);
    }

    public function show(string $slug): Response
    {
        $article = MarketWatchArticle::where('slug', $slug)
            ->where('status', 'publie')
            ->firstOrFail();

        return Inertia::render('MarketWatch/Show', [
            'article' => $article,
        ]);
    }
}
