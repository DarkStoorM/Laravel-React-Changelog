<?php

namespace App\Models;

use App\Traits\Transformed;
use App\Transformers\ChangelogTransformer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Change
 *
 * @property int $id
 * @property string $type
 * @property string $body
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change recent()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Change whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Change extends Model
{
    use HasFactory;
    use Transformed;

    protected static $transformer;

    public function __construct()
    {
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
