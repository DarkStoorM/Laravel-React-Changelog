<?php

use App\Http\Controllers\ChangelogsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api'])->resource('changes', ChangelogsController::class);
