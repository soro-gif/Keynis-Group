<?php

namespace Tests\Feature;

use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class SeedIfEmptyCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_seeds_the_database_when_it_is_empty(): void
    {
        $this->assertSame(0, ProductCategory::query()->count());

        Artisan::call('keynis:seed-if-empty');

        $this->assertStringContainsString('Base vide', Artisan::output());
        $this->assertGreaterThan(0, ProductCategory::query()->count());
    }

    public function test_it_skips_the_seeders_when_the_database_is_already_seeded(): void
    {
        Artisan::call('keynis:seed-if-empty');

        Artisan::call('keynis:seed-if-empty');

        $this->assertStringContainsString('déjà initialisée', Artisan::output());
    }

    public function test_it_skips_the_seeders_when_migrations_have_not_run(): void
    {
        // Renommer plutôt que supprimer : `Schema::dropAllTables()` déclenche un
        // VACUUM, impossible à l'intérieur de la transaction de RefreshDatabase.
        Schema::rename('users', 'users_backup');
        Schema::rename('product_categories', 'product_categories_backup');

        Artisan::call('keynis:seed-if-empty');

        $this->assertStringContainsString('Migrations non appliquées', Artisan::output());
    }
}
