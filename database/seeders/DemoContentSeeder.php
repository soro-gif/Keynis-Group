<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        $commodityCategory = ProductCategory::where('sector', 'commodities')->first();

        if (! $commodityCategory) {
            return;
        }

        $commodities = [
            'Cacao', 'Café', 'Anacarde', 'Maïs', 'Soja',
            'Riz', 'Sésame', 'Arachide', 'Manioc', 'Fruits',
        ];

        foreach ($commodities as $name) {
            Product::updateOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'category_id' => $commodityCategory->id,
                    'type' => 'commodity',
                    'name' => $name,
                    'origin' => 'Côte d\'Ivoire',
                    'price_mode' => 'sur_demande',
                    'status' => 'disponible',
                ]
            );
        }
    }
}
