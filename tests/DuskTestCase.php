<?php

namespace Tests;

use App\Models\Changelog;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Dusk\Browser;
use Laravel\Dusk\TestCase as BaseTestCase;

abstract class DuskTestCase extends BaseTestCase
{
    use CreatesApplication;
    use DatabaseMigrations;
    use WithFaker;

    protected Changelog $changelog;

    /**
     * Prepare for Dusk test execution.
     *
     * @beforeClass
     */
    public static function prepare(): void
    {
        if (!static::runningInSail()) {
            static::startChromeDriver();
        }
    }

    public function setUp(): void
    {
        parent::setUp();

        $this->changelog = Changelog::factory()->create();
    }

    public function tearDown(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->logout();
        });

        parent::tearDown();
    }

    /** Create the RemoteWebDriver instance. */
    protected function driver(): RemoteWebDriver
    {
        $options = (new ChromeOptions())->addArguments(collect([
            '--window-size=1920,1080',
        ])->unless($this->hasHeadlessDisabled(), function ($items) {
            return $items->merge([
                '--disable-gpu',
                '--headless',
            ]);
        })->all());

        return RemoteWebDriver::create(
            $_ENV['DUSK_DRIVER_URL'] ?? 'http://localhost:9515',
            DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY,
                $options
            )
        );
    }

    /** Determine whether the Dusk command has disabled headless mode. */
    protected function hasHeadlessDisabled(): bool
    {
        return isset($_SERVER['DUSK_HEADLESS_DISABLED']) ||
            isset($_ENV['DUSK_HEADLESS_DISABLED']);
    }
}
