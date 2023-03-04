<?php

use App\Http\Controllers\ChangelogsController;
use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'app');

Route::post('/create', [ChangelogsController::class, 'store']);
