<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'author',
        'publisher',
        'language',
        'category',
        'cover',


    ];

    public function users()
    {
        return $this->belongsToMany(User::class,"book_user",'book_id','user_id')->withPivot('status','applied_date')->withTimestamps();
    }



}
