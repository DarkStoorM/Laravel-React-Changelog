<?php

use App\Http\Controllers\ChangeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api'])->resource('changes', ChangeController::class);
