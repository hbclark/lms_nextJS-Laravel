<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::insert([
            [
                'title' => 'Great Expectations',
                'author' => 'Charles Dickens',
                'publisher' => 'Macmillan Collectors Library',
                'language' => 'English',
                'category' => 'Fiction',
                'cover'=>'/images/book_1.png'
            ],
            [
                'title' => 'An Inconvenient Truth',
                'author' => 'Al Gore',
                'publisher' => 'Penguin Books',
                'language' => 'English',
                'category' => 'Nonfiction',
                'cover'=>'/images/book_2.png'
            ],
            [
                'title' => 'Oxford Dictionary',
                'author' => 'Oxford Press',
                'publisher' => 'Oxford Press',
                'language' => 'English',
                'category' => 'Reference',
                'cover'=>'/images/book_3.png'
            ],
            [
                'title' => 'Anna Karenina',
                'author' => 'Leo Tolstoy',
                'publisher' => 'Star Publishing',
                'language' => 'Russian',
                'category' => 'Fiction',
                'cover'=>'/images/book_4.png'
            ],
            [
                'title' => 'The Tale of Genji',
                'author' => 'Murasaki Shikibu',
                'publisher' => 'Kinokuniya',
                'language' => 'Japanese',
                'category' => 'Fiction',
                'cover'=>'/images/book_5.png'
            ]
        ]);
        Book::factory()->count(10)->create();
    }
}
