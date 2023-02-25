<?php

namespace App\Traits;

use App\Transformers\ChangelogTransformer;
use League\Fractal\Serializer\ArraySerializer;

trait Transformed
{
    public function transformed()
    {
        return fractal(serializer: new ArraySerializer())
            ->item($this)
            ->transformWith((new ChangelogTransformer()))
            ->toJson();
    }
}
