<?php

namespace App\Transformers;

use App\Models\Change;
use League\Fractal\TransformerAbstract;

class ChangelogTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Change $changelog)
    {
        return [
            'id' => $changelog->id,
            'type' => $changelog->type,
            'body' => $changelog->body,
            'created_at' => $changelog->created_at->diffForHumans(),
        ];
    }
}
