<?php

namespace App\Console\Commands;

use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

/**
 * Exécute les seeders uniquement quand la base est encore vide.
 *
 * Sur Render (plan gratuit), le conteneur redémarre à chaque réveil : la
 * commande est donc appelée à chaque démarrage. Les seeders sont idempotents
 * (updateOrCreate) mais coûtent plusieurs secondes inutilement ; ce garde-fou
 * raccourcit le démarrage à froid que subit le visiteur.
 */
class SeedIfEmpty extends Command
{
    protected $signature = 'keynis:seed-if-empty';

    protected $description = 'Lance les seeders seulement si la base de données n\'est pas encore initialisée';

    public function handle(): int
    {
        if (! $this->databaseIsReady()) {
            $this->warn('Migrations non appliquées : seed ignoré.');

            return self::SUCCESS;
        }

        if ($this->isAlreadySeeded()) {
            $this->info('Base déjà initialisée : seed ignoré.');

            return self::SUCCESS;
        }

        $this->info('Base vide : exécution des seeders.');

        return (int) $this->call('db:seed', ['--force' => true]);
    }

    /**
     * Les tables existent-elles déjà ? (le premier démarrage lance les
     * migrations juste avant cet appel, mais pas le tout premier conteneur).
     */
    private function databaseIsReady(): bool
    {
        return Schema::hasTable('users')
            && Schema::hasTable('product_categories');
    }

    /**
     * Un seul enregistrement suffit : soit le compte admin, soit les
     * catégories produits (toujours créées par ProductCategorySeeder).
     */
    private function isAlreadySeeded(): bool
    {
        return User::query()->exists() || ProductCategory::query()->exists();
    }
}
