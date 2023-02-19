<?php

namespace App\Models;

use App\Traits\Transformed;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Change extends Model
{
    use HasFactory;
    use Transformed;

    protected $fillable = ['type', 'body'];
}
