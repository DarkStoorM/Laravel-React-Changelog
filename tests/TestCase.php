<?php

namespace Tests;

use App\Models\Changelog;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\WithFaker;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use DatabaseMigrations;
    use WithFaker;

    protected Changelog $changelog;

    public function setUp(): void
    {
        parent::setUp();

        $this->changelog = Changelog::factory()->create();
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }
}
