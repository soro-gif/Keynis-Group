<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Agriculture & Agro-industrie', 'sector' => 'agriculture', 'icon' => 'leaf'],
            ['name' => 'Commodities', 'sector' => 'commodities', 'icon' => 'globe'],
            ['name' => 'BTP & Construction', 'sector' => 'btp', 'icon' => 'building'],
            ['name' => 'Industrie', 'sector' => 'industrie', 'icon' => 'factory'],
            ['name' => 'Équipements & Machines', 'sector' => 'equipements', 'icon' => 'cog'],
            ['name' => 'Eau & Énergie', 'sector' => 'eau_energie', 'icon' => 'bolt'],
            ['name' => 'Froid & Chaîne du froid', 'sector' => 'froid', 'icon' => 'snowflake'],
            ['name' => 'Matériaux & Consommables', 'sector' => 'materiaux', 'icon' => 'box'],
            ['name' => 'Produits professionnels', 'sector' => 'produits_pro', 'icon' => 'briefcase'],
        ];

        foreach ($categories as $order => $category) {
            ProductCategory::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'sector' => $category['sector'],
                    'icon' => $category['icon'],
                    'order' => $order,
                ]
            );
        }
    }
}
