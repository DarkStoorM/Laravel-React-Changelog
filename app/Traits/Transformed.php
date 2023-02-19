<?php

namespace App\Traits;

trait Transformed
{
    public function transformed()
    {
        return transformedJson($this);
    }
}
