<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\AssetCategory;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    public function run(): void
    {
        $assets = [
            // Véhicules
            [
                'category' => 'camions',
                'name' => 'Camion porteur 20T',
                'brand' => 'Mercedes-Benz',
                'model' => 'Actros 2033',
                'year' => '2019',
                'capacity' => '20 tonnes',
                'location' => 'Abidjan, Zone 4',
                'availability' => 'Disponible immédiatement',
                'indicative_price' => '250 000 FCFA / jour',
                'owner_name' => 'Ibrahim Coulibaly',
                'owner_company' => 'Transport Coulibaly & Fils',
                'owner_phone' => '+225 07 01 02 03 04',
                'description' => 'Camion porteur en bon état, entretien à jour, disponible pour transport longue distance.',
            ],
            [
                'category' => 'camions-bennes',
                'name' => 'Camion-benne 10m³',
                'brand' => 'Renault Trucks',
                'model' => 'K380',
                'year' => '2020',
                'capacity' => '10 m³',
                'location' => 'Yamoussoukro',
                'availability' => 'Disponible sous 48h',
                'indicative_price' => '180 000 FCFA / jour',
                'owner_name' => 'Fatou Diabaté',
                'owner_company' => 'BTP Services CI',
                'owner_phone' => '+225 05 02 03 04 05',
                'description' => 'Camion-benne idéal pour évacuation de gravats et transport de matériaux de construction.',
            ],
            [
                'category' => '4x4',
                'name' => 'Pick-up 4x4 double cabine',
                'brand' => 'Toyota',
                'model' => 'Hilux',
                'year' => '2021',
                'capacity' => '1 tonne',
                'location' => 'Abidjan, Cocody',
                'availability' => 'Disponible',
                'indicative_price' => '75 000 FCFA / jour',
                'owner_name' => 'Kouassi N\'Guessan',
                'owner_company' => null,
                'owner_phone' => '+225 01 02 03 04 05',
                'description' => 'Véhicule tout-terrain robuste, adapté aux missions terrain et zones rurales.',
            ],

            // Engins BTP
            [
                'category' => 'excavatrices',
                'name' => 'Excavatrice hydraulique 20T',
                'brand' => 'Caterpillar',
                'model' => '320D',
                'year' => '2018',
                'capacity' => '20 tonnes',
                'location' => 'San-Pédro',
                'availability' => 'Disponible sous 72h',
                'indicative_price' => '350 000 FCFA / jour',
                'owner_name' => 'Moussa Traoré',
                'owner_company' => 'Traoré Engins BTP',
                'owner_phone' => '+225 07 05 06 07 08',
                'description' => 'Excavatrice performante pour terrassement, fondations et travaux de génie civil.',
            ],
            [
                'category' => 'chargeuses',
                'name' => 'Chargeuse sur pneus',
                'brand' => 'Volvo',
                'model' => 'L120H',
                'year' => '2019',
                'capacity' => '3.5 m³',
                'location' => 'Abidjan, Yopougon',
                'availability' => 'Disponible',
                'indicative_price' => '280 000 FCFA / jour',
                'owner_name' => 'Aminata Ouattara',
                'owner_company' => 'OTP Location',
                'owner_phone' => '+225 05 06 07 08 09',
                'description' => 'Chargeuse polyvalente pour manutention de matériaux sur chantier.',
            ],
            [
                'category' => 'grues',
                'name' => 'Grue mobile 50T',
                'brand' => 'Liebherr',
                'model' => 'LTM 1050',
                'year' => '2017',
                'capacity' => '50 tonnes',
                'location' => 'Abidjan, Marcory',
                'availability' => 'Sur réservation',
                'indicative_price' => '450 000 FCFA / jour',
                'owner_name' => 'Yao Kouadio',
                'owner_company' => 'Kouadio Levage',
                'owner_phone' => '+225 01 06 07 08 09',
                'description' => 'Grue mobile pour levage industriel et montage de structures.',
            ],

            // Machines agricoles
            [
                'category' => 'tracteurs',
                'name' => 'Tracteur agricole 90 CV',
                'brand' => 'Massey Ferguson',
                'model' => 'MF 375',
                'year' => '2020',
                'capacity' => '90 CV',
                'location' => 'Bouaké',
                'availability' => 'Disponible en saison',
                'indicative_price' => '90 000 FCFA / jour',
                'owner_name' => 'Adama Bamba',
                'owner_company' => 'Coopérative Agricole du Gbêkê',
                'owner_phone' => '+225 07 07 08 09 10',
                'description' => 'Tracteur polyvalent pour labour, semis et travaux agricoles divers.',
            ],
            [
                'category' => 'moissonneuses',
                'name' => 'Moissonneuse-batteuse',
                'brand' => 'John Deere',
                'model' => 'W540',
                'year' => '2016',
                'capacity' => '5 tonnes/heure',
                'location' => 'Korhogo',
                'availability' => 'Disponible à la récolte',
                'indicative_price' => '200 000 FCFA / jour',
                'owner_name' => 'Salimata Cissé',
                'owner_company' => 'AgroNord Services',
                'owner_phone' => '+225 05 08 09 10 11',
                'description' => 'Moissonneuse-batteuse pour récolte de céréales à grande échelle.',
            ],

            // Équipements
            [
                'category' => 'groupes-electrogenes',
                'name' => 'Groupe électrogène 100 kVA',
                'brand' => 'Perkins',
                'model' => 'P100',
                'year' => '2021',
                'capacity' => '100 kVA',
                'location' => 'Abidjan, Treichville',
                'availability' => 'Disponible',
                'indicative_price' => '60 000 FCFA / jour',
                'owner_name' => 'Jean-Baptiste Kra',
                'owner_company' => 'Kra Énergie',
                'owner_phone' => '+225 01 09 10 11 12',
                'description' => 'Groupe électrogène silencieux pour chantiers et événements.',
            ],
            [
                'category' => 'pompes',
                'name' => 'Pompe à eau industrielle',
                'brand' => 'Grundfos',
                'model' => 'NB 80',
                'year' => '2020',
                'capacity' => '80 m³/h',
                'location' => 'Abidjan, Port-Bouët',
                'availability' => 'Disponible',
                'indicative_price' => '35 000 FCFA / jour',
                'owner_name' => 'Marie-Ange Konan',
                'owner_company' => 'Hydro Services CI',
                'owner_phone' => '+225 07 10 11 12 13',
                'description' => 'Pompe haute capacité pour assèchement de chantier et irrigation.',
            ],
            [
                'category' => 'compresseurs',
                'name' => 'Compresseur d\'air mobile',
                'brand' => 'Atlas Copco',
                'model' => 'XAS 90',
                'year' => '2019',
                'capacity' => '9 bars',
                'location' => 'Abidjan, Vridi',
                'availability' => 'Disponible',
                'indicative_price' => '45 000 FCFA / jour',
                'owner_name' => 'Paul Assi',
                'owner_company' => 'Assi Matériel Industriel',
                'owner_phone' => '+225 05 11 12 13 14',
                'description' => 'Compresseur mobile pour outils pneumatiques sur chantier.',
            ],

            // Infrastructures
            [
                'category' => 'entrepots',
                'name' => 'Entrepôt logistique 800 m²',
                'brand' => null,
                'model' => null,
                'year' => null,
                'capacity' => '800 m²',
                'location' => 'Abidjan, Zone industrielle de Koumassi',
                'availability' => 'Disponible à la location',
                'indicative_price' => '1 500 000 FCFA / mois',
                'owner_name' => 'Groupe Immo Koumassi',
                'owner_company' => 'Immo Koumassi SARL',
                'owner_phone' => '+225 01 12 13 14 15',
                'description' => 'Entrepôt sécurisé avec quai de chargement, proche du port d\'Abidjan.',
            ],
            [
                'category' => 'chambres-froides',
                'name' => 'Chambre froide 200 m³',
                'brand' => null,
                'model' => null,
                'year' => null,
                'capacity' => '200 m³',
                'location' => 'San-Pédro',
                'availability' => 'Disponible',
                'indicative_price' => '600 000 FCFA / mois',
                'owner_name' => 'Frigo San-Pédro',
                'owner_company' => 'Frigo San-Pédro SA',
                'owner_phone' => '+225 07 13 14 15 16',
                'description' => 'Chambre froide adaptée à la conservation de produits agricoles et halieutiques.',
            ],
            [
                'category' => 'espaces-de-stockage',
                'name' => 'Espace de stockage sécurisé 300 m²',
                'brand' => null,
                'model' => null,
                'year' => null,
                'capacity' => '300 m²',
                'location' => 'Abidjan, Yopougon',
                'availability' => 'Disponible',
                'indicative_price' => '400 000 FCFA / mois',
                'owner_name' => 'Espace Pro CI',
                'owner_company' => 'Espace Pro CI',
                'owner_phone' => '+225 05 14 15 16 17',
                'description' => 'Espace de stockage clôturé et gardienné, accès camion facile.',
            ],
        ];

        foreach ($assets as $item) {
            $category = AssetCategory::where('slug', $item['category'])->first();

            if (! $category) {
                continue;
            }

            Asset::updateOrCreate(
                ['name' => $item['name'], 'owner_phone' => $item['owner_phone']],
                [
                    'category_id' => $category->id,
                    'listing_type' => 'propose',
                    'status' => 'publie',
                    'owner_name' => $item['owner_name'],
                    'owner_company' => $item['owner_company'],
                    'owner_phone' => $item['owner_phone'],
                    'name' => $item['name'],
                    'brand' => $item['brand'],
                    'model' => $item['model'],
                    'year' => $item['year'],
                    'capacity' => $item['capacity'],
                    'location' => $item['location'],
                    'availability' => $item['availability'],
                    'indicative_price' => $item['indicative_price'],
                    'description' => $item['description'],
                ]
            );
        }
    }
}
