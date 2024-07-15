<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 30);
            $table->string('author', 30);
            $table->string('publisher', 30);
            $table->enum('language', ['English', 'French', 'German', 'Mandarin', 'Japanese', 'Russian', 'Other'])->default('English');
            $table->string('cover', 255)->nullable();
            $table->enum('category', ['Fiction', 'Nonfiction', 'Reference'])->default('Fiction');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
};
