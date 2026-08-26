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
        $adminPassword = env('ADMIN_PASSWORD') ?: Str::random(16);

        User::factory()->create([
            'name' => 'Admin Keynis',
            'email' => 'admin@keynisgroup.ci',
            'role' => 'super_admin',
            'password' => Hash::make($adminPassword),
        ]);

        if (! env('ADMIN_PASSWORD')) {
            $this->command?->warn("No ADMIN_PASSWORD set in .env — generated one-time admin password: {$adminPassword}");
            $this->command?->warn('Log in and change it immediately, this will not be shown again.');
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
