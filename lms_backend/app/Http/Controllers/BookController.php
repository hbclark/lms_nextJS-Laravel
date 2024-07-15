<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the books.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::with('users')->get();
        $books = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'publisher' => $book->publisher,
                'language' => $book->language,
                'category' => $book->category,
                'image' => $book->image,
                "applied_date" => $book->users->pluck('pivot.applied_date'),

                // return name is not an object,need be a string,combine with "firstname" and "lastName"
                "borrower" => $book->users->pluck('firstName')->map(function ($name, $index) use ($book) {
                    return $name . ' ' . $book->users[$index]->lastName;
                }),
                "returned_date" => $book->users->pluck('pivot.applied_date')->map(function ($date) {
                    return date('Y-m-d', strtotime($date . ' + 21 days'));
                }),
                "status" => $book->users->pluck('pivot.status'),

                'user_ids' => $book->users->pluck('id'),
            ];
        });


        return response()->json($books);
    }



    /**
     * Store a newly created book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'language' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|url'

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $validated = $validator->validated();


        $book = Book::create($validated);

        return response()->json($book, 201);
    }

     /**
     * Display the specified book.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByTitle($title)
    {
        $books = Book::where('title','like',"%$title%")->get();
        $books = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'publisher' => $book->publisher,
                'language' => $book->language,
                'category' => $book->category,
                'image' => $book->image,
                "applied_date" => $book->users->pluck('pivot.applied_date'),

                // return name is not an object,need be a string,combine with "firstname" and "lastName"
                "borrower" => $book->users->pluck('firstName')->map(function ($name, $index) use ($book) {
                    return $name . ' ' . $book->users[$index]->lastName;
                }),
                "returned_date" => $book->users->pluck('pivot.applied_date')->map(function ($date) {
                    return date('Y-m-d', strtotime($date . ' + 21 days'));
                }),
                "status" => $book->users->pluck('pivot.status'),

                'user_ids' => $book->users->pluck('id'),
            ];
        });
        if (!$books) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json($books);
    }


public function show($id){
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json($book);
}

    /**
     * Update the specified book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'language' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|url'
        ]);

        $book->update($request->all());
        return response()->json($book);
    }


   /**
     * Remove the specified book from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully'], 200);
    }


    public function borrowBook(Request $request){
        // $validated =$request->validate([
        //     'user_id' => 'required|exists:users,id',
        //     'book_id' => 'required|exists:books,id',
        //     'status' => 'required|in:Available,Onloan,Deleted',

        // ]);



        $book = Book::find($request->book_id);
        if(!$book){
            return response()->json(['message' => 'Book not found'], 404);
        }
        $user = User::find($request->user_id);
        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        $book->users()->attach($user->id, ['status' => 'Onloan', 'applied_date' => now()]);
        return response()->json(['message' => 'Book borrowed successfully'], 200);


    }


    public function returnBook(Request $request){
        $book = Book::find($request->book_id);
        if(!$book){
            return response()->json(['message' => 'Book not found'], 404);
        }
        $user = User::find($request->user_id);
        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }
        // detach the user from the book
        $book->users()->detach($user->id);


        $book->users()->updateExistingPivot($user->id, ['status' => 'Available']);
        return response()->json(['message' => 'Book returned successfully'], 200);
    }




}


