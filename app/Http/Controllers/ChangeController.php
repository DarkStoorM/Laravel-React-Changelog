<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangelogFormRequest;
use App\Models\Change;
use Illuminate\Http\JsonResponse;

class ChangeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(Change::recent());
    }

    /**
     * Creates a new Changelog entry and returns it back to the user
     *
     * @param   \App\Http\Requests\ChangelogFormRequest  $request
     */
    public function store(ChangelogFormRequest $request): JsonResponse
    {
        $payload = $request->validated();

        $newChange = Change::create($payload)->transformed();

        return response()->json($newChange);
    }

    /**
     * Attempts to delete the given Changelog entry from the database
     *
     * @param   string        $id  Changelog Entry id
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function destroy(string $id): JsonResponse
    {
        Change::findOrFail($id)->delete();

        return json_response('Entry deleted successfully.');
    }
}
