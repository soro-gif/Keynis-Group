<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MarketWatchController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RfqController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/a-propos', [PageController::class, 'about'])->name('about');
Route::get('/trading', [PageController::class, 'trading'])->name('trading');
Route::get('/logistics', [PageController::class, 'logistics'])->name('logistics');
Route::get('/distribution', [PageController::class, 'distribution'])->name('distribution');
Route::get('/ressources', [PageController::class, 'resources'])->name('resources');

Route::get('/produits', [ProductController::class, 'index'])->name('products.index');
Route::get('/produits/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/commodities', [ProductController::class, 'commodities'])->name('commodities');

Route::get('/actifs', [AssetController::class, 'index'])->name('assets.index');
Route::post('/actifs', [AssetController::class, 'store'])->name('assets.store')->middleware('throttle:10,1');
Route::get('/actifs/confirmation', [AssetController::class, 'confirmation'])->name('assets.confirmation');
Route::post('/actifs/confirmation/confirm', [AssetController::class, 'confirm'])->name('assets.confirmation.confirm')->middleware('throttle:10,1');
Route::get('/actifs/{asset}', [AssetController::class, 'show'])->name('assets.show');
Route::get('/actifs/{asset}/demande', [AssetController::class, 'requestForm'])->name('assets.request');
Route::post('/actifs/{asset}/demande', [AssetController::class, 'submitRequest'])->name('assets.request.store')->middleware('throttle:10,1');

Route::get('/partenaires', [PartnerController::class, 'index'])->name('partners.index');
Route::post('/partenaires', [PartnerController::class, 'store'])->name('partners.store')->middleware('throttle:10,1');
Route::get('/partenaires/confirmation', [PartnerController::class, 'confirmation'])->name('partners.confirmation');
Route::post('/partenaires/confirmation/confirm', [PartnerController::class, 'confirm'])->name('partners.confirmation.confirm')->middleware('throttle:10,1');

Route::get('/market-watch', [MarketWatchController::class, 'index'])->name('market-watch.index');
Route::get('/market-watch/{slug}', [MarketWatchController::class, 'show'])->name('market-watch.show');

Route::get('/projets', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projets/{slug}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/rfq', [RfqController::class, 'create'])->name('rfq.create');
Route::post('/rfq', [RfqController::class, 'store'])->name('rfq.store')->middleware('throttle:10,1');
Route::get('/rfq/confirmation', [RfqController::class, 'confirmation'])->name('rfq.confirmation');
Route::post('/rfq/confirmation/confirm', [RfqController::class, 'confirm'])->name('rfq.confirmation.confirm')->middleware('throttle:10,1');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store')->middleware('throttle:10,1');
Route::get('/contact/confirmation', [ContactController::class, 'confirmation'])->name('contact.confirmation');
Route::post('/contact/confirmation/confirm', [ContactController::class, 'confirm'])->name('contact.confirmation.confirm')->middleware('throttle:10,1');

Route::get('/dashboard', function () {
    if (auth()->user()->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/sitemap.xml', function () {
    return response()->view('sitemap')
        ->header('Content-Type', 'application/xml');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
