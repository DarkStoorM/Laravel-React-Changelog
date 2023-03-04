<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use League\Fractal\Serializer\ArraySerializer;

/**
 * Applies a Data Transformer Trait to change the Creation Date to a human-readable form
 * and returns a json-encoded data
 */
trait Transformed
{
    /**
     * Returns a transformed version of this model for Json responses
     */
    public function transformed()
    {
        return fractal(serializer: new ArraySerializer())
            ->item($this)
            ->transformWith($this->getTransformer())
            ->toJson();
    }

    /**
     * Returns a transformed version of this model's collection for Json responses
     */
    public static function collectTransformed(Collection $modelsCollection)
    {
        return fractal()
            ->collection($modelsCollection)
            ->transformWith(self::class::$transformer)
            ->toJson();
    }
}
