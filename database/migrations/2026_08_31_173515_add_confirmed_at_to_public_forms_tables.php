<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach (['rfqs', 'assets', 'partners', 'contacts'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->timestamp('confirmed_at')->nullable()->after('status');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (['rfqs', 'assets', 'partners', 'contacts'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn('confirmed_at');
            });
        }
    }
};
