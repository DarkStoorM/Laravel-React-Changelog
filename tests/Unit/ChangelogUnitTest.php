<?php

namespace Tests\Unit;

use App\Models\Changelog;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Str;
use Tests\TestCase;

class ChangelogUnitTest extends TestCase
{
    use DatabaseMigrations;

    public function testCanTransformModelForJson(): void
    {
        $transformed = $this->changelog->transformed();
        $data = json_decode($transformed);

        // Only date is transformed, so we can check if the Data Transformer has changed the Date
        // Added 'now' needle in case a shorter date was used, which renders "[x] minutes from now"
        $this->assertTrue(Str::contains($data->created_at, ['now', 'ago'], true));
    }

    public function testCanTransformModelCollectionsForJson(): void
    {
        Changelog::factory(10)->create();

        // Also tests static transformer
        $transformed = json_decode(Changelog::recent())->data;

        foreach ($transformed as $model) {
            $this->assertTrue(Str::contains($model->created_at, ['now', 'ago'], true));
        }

        // Force no-assertions performed outside the Foreach
        $this->assertFalse($this->doesNotPerformAssertions());
    }
}
