<?php

namespace Tests\Route;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class RouteTest extends TestCase
{
    use DatabaseMigrations;

    public function testIsRootOk(): void
    {
        $this->get('/')->assertOk();
    }

    public function testIsCreateChangelogOk(): void
    {
        $this->get('/create')->assertOk();
    }

    /*
     * --------------------------------------------------------------------------
     * REST ROUTES
     * --------------------------------------------------------------------------
     */

    public function testCanFetchRootChangelog(): void
    {
        // We only care about the server returning OK, so any error should cause a failure
        // when fetching
        $this->get('/api/changes')->assertOk();
    }

    public function testCanCreateChangelog(): void
    {
        $this->post('/create', $this->changelog->toArray())
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('changelogs', ['id' => $this->changelog->id]);
    }

    public function testCanDetectMalformedData(): void
    {
        $this->post('/create', [])
            ->assertSessionHasErrors(['type', 'body']);
    }

    public function testCanDeleteChangelogEntry(): void
    {
        $this->assertDatabaseHas('changelogs', ['id' => $this->changelog->id]);

        $this->delete('/api/changes/' . $this->changelog->id)
            ->assertOk();

        $this->assertDatabaseMissing('changelogs', ['id' => $this->changelog->id]);
    }

    /**
     * Throws once the exception is taken off the Controller
     *
     * Remove later (ツ)
     */
    public function testRememberToImplementTestsForThisEndpointSmileyFace(): void
    {
        $this->get('/api/changes/' . $this->changelog->id)
            ->assertServerError();
    }
}
