<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'contact',
        'source',
        'source_page',
        'message',
        'status',
    ];
}
