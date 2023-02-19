<?php

namespace App\Transformers;

use App\Models\Change;
use League\Fractal\TransformerAbstract;

class ChangelogTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected array $defaultIncludes = [];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected array $availableIncludes = [];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Change $changelog)
    {
        return [
            'type' => $changelog->type,
            'body' => $changelog->body,
            'created_at' => $changelog->created_at->diffForHumans(),
        ];
    }
}
