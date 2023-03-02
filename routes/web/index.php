<?php

use App\Http\Controllers\ChangeController;
use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'app');

Route::post('/create', [ChangeController::class, 'store']);
