<?php

namespace App\Models;

use App\Traits\Transformed;
use App\Transformers\ChangelogTransformer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Changelog extends Model
{
    use HasFactory;
    use Transformed;

    protected static $transformer;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        self::$transformer = new ChangelogTransformer();
    }

    protected $fillable = ['type', 'body'];

    public static function scopeRecent()
    {
        return self::collectTransformed(self::latest()->get(), self::$transformer);
    }

    protected function getTransformer()
    {
        return self::$transformer;
    }
}
