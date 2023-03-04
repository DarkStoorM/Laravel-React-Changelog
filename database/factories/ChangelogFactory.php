<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Changelog>
 */
class ChangelogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'type' => collect(['add', 'delete', 'fix', 'update'])->random(),
            'body' => $this->faker->realText(100),
            'created_at' => Carbon::now()->addHours(mt_rand(-300, 10)),
        ];
    }
}
