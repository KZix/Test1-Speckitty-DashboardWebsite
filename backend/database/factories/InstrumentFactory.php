<?php

namespace Database\Factories;

use App\Models\Instrument;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Instrument>
 */
class InstrumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'type' => fake()->randomElement(['Violin', 'Cello', 'Flute', 'Trumpet', 'Clarinet']),
            'brand' => fake()->company(),
            'serial_number' => fake()->unique()->bothify('SN-#####-????'),
            'status' => 'available',
            'borrower_id' => null,
            'image_path' => null,
        ];
    }
}
