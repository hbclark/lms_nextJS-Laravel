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
        Schema::create('book_user', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBiginteger('book_id');
            $table->unsignedBiginteger('user_id');
            $table->enum('status', ['available', 'onloan', 'deleted'])->default('available');
            $table->date('applied_date')->useCurrent();
            $table->foreign('book_id')->references('id')
                 ->on('books')->onDelete('cascade');
            $table->foreign('user_id')->references('id')
                ->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_user');
    }
};
