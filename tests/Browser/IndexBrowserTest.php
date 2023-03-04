<?php

namespace Tests\Browser;

use App\Models\Changelog;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class IndexBrowserTest extends DuskTestCase
{
    public function testCanFetchRecentChanges(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->waitUntilMissingText('Fetching changes...')
                ->assertPresent('#changelog');
        });
    }

    public function testCanDisplayEmptyChangelogInfo(): void
    {
        Changelog::truncate();

        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->waitUntilMissingText('Fetching changes...')
                ->assertSeeIn('#uninitialized', 'No changes yet.');
        });
    }

    public function testCanCreateNewChangelog(): void
    {
        $this->browse(function (Browser $browser) {
            $changelogBody = 'Changelog body content';

            $browser->visit('/')
                ->click('#new-entry')
                ->select('#changelog-type', 'update')
                ->type('#body', $changelogBody)
                ->click('#submit-changelog-entry')
                ->waitFor('#message-bag')
                ->waitUntilMissingText('Submitting...')
                ->assertSee('New entry added')
                // Also check if the same entry appears on the home page without writing a new duplicate test
                ->click('#home')
                ->waitUntilMissingText('Fetching changes...')
                ->assertSee($changelogBody);
        });
    }

    public function testGetsStoppedByValidationError(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->click('#new-entry')
                ->click('#submit-changelog-entry')
                ->waitFor('#message-bag')
                ->waitUntilMissingText('Submitting...')
                ->assertSee('The body field is required.');
        });
    }
}
