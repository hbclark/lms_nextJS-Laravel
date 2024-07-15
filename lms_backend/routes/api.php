<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserBookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::apiResource('users', UserController::class);
Route::get("/users/email/{email}", [UserController::class, "showByEmail"]);
Route::get("/books/search/{title}", [BookController::class, "showByTitle"]);

Route::apiResource('books', BookController::class);
Route::post('/books/borrowBook', [BookController::class, 'borrowBook']);
Route::post('/books/returnBook', [BookController::class, 'returnBook']);


