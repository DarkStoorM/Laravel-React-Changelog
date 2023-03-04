<?php

namespace App\Transformers;

use App\Models\Changelog;
use League\Fractal\TransformerAbstract;

class ChangelogTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Changelog $changelog)
    {
        return [
            'id' => $changelog->id,
            'type' => $changelog->type,
            'body' => $changelog->body,
            'created_at' => $changelog->created_at->diffForHumans(),
        ];
    }
}
