<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReleaseHeaderTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_release_header_exposes_the_deployed_commit(): void
    {
        config(['app.release' => '38ccc66']);

        $this->get('/')->assertHeader('X-Release', '38ccc66');
    }

    public function test_the_release_header_is_absent_when_no_commit_is_configured(): void
    {
        config(['app.release' => null]);

        $this->get('/')->assertHeaderMissing('X-Release');
    }
}
