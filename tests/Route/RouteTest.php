<?php

namespace Tests\Route;

use App\Models\Changelog;
use Tests\TestCase;

class RouteTest extends TestCase
{
    public function testCanFetchRecentChanges(): void
    {
        Changelog::factory(10)->create();
        $this->get('/')->assertOk();
    }
}
