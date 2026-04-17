<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\InstrumentController;

use App\Http\Controllers\CalendarController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Calendar Routes
    Route::get('/calendar/events', [CalendarController::class, 'index']);

    // Instrument Routes
    Route::get('/instruments', [InstrumentController::class, 'index']);
    Route::get('/instruments/{instrument}', [InstrumentController::class, 'show']);

    Route::middleware('admin')->group(function () {
        Route::post('/instruments', [InstrumentController::class, 'store']);
        Route::match(['put', 'patch'], '/instruments/{instrument}', [InstrumentController::class, 'update']);
        Route::delete('/instruments/{instrument}', [InstrumentController::class, 'destroy']);
    });
});
