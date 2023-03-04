<?php

namespace Tests\Feature;

use App\Models\Changelog;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class DatabaseFeatureTest extends TestCase
{
    use DatabaseMigrations;

    public function testCanCreateChangelogOnStart(): void
    {
        $this->assertDatabaseHas('changelogs', ['body' => $this->changelog->body]);
    }

    public function testCanCreateChangelogAtRuntime(): void
    {
        $changelog = Changelog::factory()->create();
        $this->assertDatabaseHas('changelogs', ['body' => $changelog->body]);
    }
}
