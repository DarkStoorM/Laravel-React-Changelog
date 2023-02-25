<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangelogFormRequest;
use App\Models\Change;
use Illuminate\View\View;

class IndexController extends Controller
{
    /**
     * Index might change in the future, in case there is a main view before logging in
     */
    public function index(): View
    {
        return view('main');
    }

    public function store(ChangelogFormRequest $request)
    {
        $payload = $request->validated();

        $newChange = Change::create($payload)->transformed();

        return response()->json($newChange);
    }
}
