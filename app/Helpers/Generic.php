<?php

use App\Transformers\ChangelogTransformer;
use League\Fractal\Serializer\ArraySerializer;

function transformedJson($model)
{
    return fractal(serializer: new ArraySerializer())
        ->item($model)
        ->transformWith((new ChangelogTransformer()))
        ->toJson();
}
