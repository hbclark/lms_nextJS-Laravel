<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Book;
use App\Models\UserBook;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserBook>
 */
class UserBookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),  // Assuming User model has a factory
            'book_id' => Book::factory(), // Assuming Book model has a factory
            'status' => $this->faker->randomElement(['Available', 'Onloan', 'Deleted']),
            'applied_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
