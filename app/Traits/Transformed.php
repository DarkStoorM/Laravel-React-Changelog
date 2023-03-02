<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use League\Fractal\Serializer\ArraySerializer;

trait Transformed
{
    public function transformed()
    {
        return fractal(serializer: new ArraySerializer())
            ->item($this)
            ->transformWith($this->getTransformer())
            ->toJson();
    }

    public static function collectTransformed(Collection $modelsCollection)
    {
        return fractal()
            ->collection($modelsCollection)
            ->transformWith(self::class::$transformer)
            ->toJson();
    }
}
