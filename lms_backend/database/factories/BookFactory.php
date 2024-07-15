<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text(30),
            'author' => $this->faker->name,
            'publisher' => $this->faker->text(30),
            'language' => $this->faker->randomElement(['English', 'French', 'German', 'Mandarin', 'Japanese', 'Russian', 'Other']),
            'category' => $this->faker->randomElement(['Fiction', 'Nonfiction', 'Reference']),
            'cover' => 'https://picsum.photos/200/300',
        ];
    }
}
