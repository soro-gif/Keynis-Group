<?php

namespace Database\Seeders;

use App\Models\AssetCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AssetCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Camions', 'family' => 'vehicules'],
            ['name' => 'Camions-bennes', 'family' => 'vehicules'],
            ['name' => 'Pick-up', 'family' => 'vehicules'],
            ['name' => '4x4', 'family' => 'vehicules'],
            ['name' => 'Véhicules spécialisés', 'family' => 'vehicules'],
            ['name' => 'Excavatrices', 'family' => 'engins_btp'],
            ['name' => 'Bulldozers', 'family' => 'engins_btp'],
            ['name' => 'Chargeuses', 'family' => 'engins_btp'],
            ['name' => 'Niveleuses', 'family' => 'engins_btp'],
            ['name' => 'Compacteurs', 'family' => 'engins_btp'],
            ['name' => 'Grues', 'family' => 'engins_btp'],
            ['name' => 'Nacelles', 'family' => 'engins_btp'],
            ['name' => 'Tracteurs', 'family' => 'machines_agricoles'],
            ['name' => 'Motoculteurs', 'family' => 'machines_agricoles'],
            ['name' => 'Semoirs', 'family' => 'machines_agricoles'],
            ['name' => 'Moissonneuses', 'family' => 'machines_agricoles'],
            ['name' => 'Batteuses', 'family' => 'machines_agricoles'],
            ['name' => 'Groupes électrogènes', 'family' => 'equipements'],
            ['name' => 'Pompes', 'family' => 'equipements'],
            ['name' => 'Compresseurs', 'family' => 'equipements'],
            ['name' => 'Équipements de manutention', 'family' => 'equipements'],
            ['name' => 'Entrepôts', 'family' => 'infrastructures'],
            ['name' => 'Chambres froides', 'family' => 'infrastructures'],
            ['name' => 'Espaces de stockage', 'family' => 'infrastructures'],
        ];

        foreach ($categories as $category) {
            AssetCategory::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'family' => $category['family'],
                ]
            );
        }
    }
}
