<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminEmail = 'admin@keynisgroup.ci';

        if (! User::where('email', $adminEmail)->exists()) {
            $adminPassword = Str::random(16);

            User::factory()->create([
                'name' => 'Admin Keynis',
                'email' => $adminEmail,
                'role' => 'super_admin',
                'password' => Hash::make($adminPassword),
            ]);

            $this->command?->warn("Generated one-time admin password: {$adminPassword}");
            $this->command?->warn('Log in and change it immediately, or reset it via `php artisan admin:reset-password`.');
        }

        $this->call([
            ProductCategorySeeder::class,
            AssetCategorySeeder::class,
            DemoContentSeeder::class,
            AssetSeeder::class,
            PartnerSeeder::class,
        ]);
    }
}
