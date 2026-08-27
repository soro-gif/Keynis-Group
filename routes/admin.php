<?php

use App\Http\Controllers\Admin\AssetController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RfqController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/rfqs', [RfqController::class, 'index'])->name('rfqs.index');
    Route::get('/rfqs/{rfq}', [RfqController::class, 'show'])->name('rfqs.show');
    Route::get('/rfqs/{rfq}/edit', [RfqController::class, 'edit'])->name('rfqs.edit');
    Route::patch('/rfqs/{rfq}', [RfqController::class, 'update'])->name('rfqs.update');
    Route::delete('/rfqs/{rfq}', [RfqController::class, 'destroy'])->name('rfqs.destroy');

    Route::get('/categories-produits', [ProductCategoryController::class, 'index'])->name('product-categories.index');
    Route::get('/categories-produits/create', [ProductCategoryController::class, 'create'])->name('product-categories.create');
    Route::post('/categories-produits', [ProductCategoryController::class, 'store'])->name('product-categories.store');
    Route::get('/categories-produits/{productCategory}/edit', [ProductCategoryController::class, 'edit'])->name('product-categories.edit');
    Route::put('/categories-produits/{productCategory}', [ProductCategoryController::class, 'update'])->name('product-categories.update');
    Route::delete('/categories-produits/{productCategory}', [ProductCategoryController::class, 'destroy'])->name('product-categories.destroy');

    Route::get('/produits', [ProductController::class, 'index'])->name('products.index');
    Route::get('/produits/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/produits', [ProductController::class, 'store'])->name('products.store');
    Route::get('/produits/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/produits/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/produits/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/produits/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/actifs', [AssetController::class, 'index'])->name('assets.index');
    Route::get('/actifs/create', [AssetController::class, 'create'])->name('assets.create');
    Route::post('/actifs', [AssetController::class, 'store'])->name('assets.store');
    Route::get('/actifs/{asset}', [AssetController::class, 'show'])->name('assets.show');
    Route::get('/actifs/{asset}/edit', [AssetController::class, 'edit'])->name('assets.edit');
    Route::patch('/actifs/{asset}', [AssetController::class, 'update'])->name('assets.update');
    Route::delete('/actifs/{asset}', [AssetController::class, 'destroy'])->name('assets.destroy');

    Route::get('/partenaires', [PartnerController::class, 'index'])->name('partners.index');
    Route::get('/partenaires/create', [PartnerController::class, 'create'])->name('partners.create');
    Route::post('/partenaires', [PartnerController::class, 'store'])->name('partners.store');
    Route::get('/partenaires/{partner}', [PartnerController::class, 'show'])->name('partners.show');
    Route::get('/partenaires/{partner}/edit', [PartnerController::class, 'edit'])->name('partners.edit');
    Route::patch('/partenaires/{partner}', [PartnerController::class, 'update'])->name('partners.update');
    Route::delete('/partenaires/{partner}', [PartnerController::class, 'destroy'])->name('partners.destroy');

    Route::get('/messages', [ContactController::class, 'index'])->name('contacts.index');
    Route::patch('/messages/{contact}', [ContactController::class, 'update'])->name('contacts.update');
    Route::delete('/messages/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
});
