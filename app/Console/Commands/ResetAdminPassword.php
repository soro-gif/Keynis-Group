<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResetAdminPassword extends Command
{
    protected $signature = 'admin:reset-password
        {--email=admin@keynisgroup.ci : Email of the account to create/reset}
        {--password= : New password (a random one is generated and printed if omitted)}';

    protected $description = 'Create or reset an admin account password (run on demand via the Render shell)';

    public function handle(): int
    {
        $email = $this->option('email');
        $password = $this->option('password') ?: Str::random(16);

        $user = User::firstOrNew(['email' => $email]);
        $wasRecentlyCreated = ! $user->exists;

        $user->forceFill([
            'name' => $user->name ?? 'Admin Keynis',
            'role' => 'super_admin',
            'password' => Hash::make($password),
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        $this->info(($wasRecentlyCreated ? 'Created' : 'Reset password for').": {$email}");

        if (! $this->option('password')) {
            $this->warn("Generated password: {$password}");
            $this->warn('Log in and change it immediately, this will not be shown again.');
        }

        return self::SUCCESS;
    }
}
