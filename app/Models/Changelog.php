<?php

namespace App\Models;

use App\Traits\Transformed;
use App\Transformers\ChangelogTransformer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Changelog
 *
 * @property int $id
 * @property string $type
 * @property string $body
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ChangelogFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog recent()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Changelog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
