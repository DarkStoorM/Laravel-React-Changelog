<?php

use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'app');

Route::post('/create', [IndexController::class, 'store']);
