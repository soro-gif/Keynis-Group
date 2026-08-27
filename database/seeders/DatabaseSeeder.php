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
        $admin = User::where('email', $adminEmail)->first();
        $envPassword = env('ADMIN_PASSWORD');

        if (! $admin) {
            $adminPassword = $envPassword ?: Str::random(16);

            User::factory()->create([
                'name' => 'Admin Keynis',
                'email' => $adminEmail,
                'role' => 'super_admin',
                'password' => Hash::make($adminPassword),
            ]);

            if (! $envPassword) {
                $this->command?->warn("No ADMIN_PASSWORD set — generated one-time admin password: {$adminPassword}");
                $this->command?->warn('Log in and change it immediately, this will not be shown again.');
            }
        } elseif ($envPassword) {
            // ADMIN_PASSWORD set on an existing admin: treat it as a "break glass"
            // reset (e.g. set it in Render's dashboard and redeploy to regain access).
            $admin->forceFill(['password' => Hash::make($envPassword)])->save();
            $this->command?->info('Admin password reset from ADMIN_PASSWORD.');
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
