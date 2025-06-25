<?php

use App\Http\Controllers\GuestController;

//Guests
Route::prefix('guests')->group(function () {
    Route::get('/validar_cartao_emergencial/{submodulo}/{id}', [GuestController::class, 'validar_cartao_emergencial'])->name('guests.validar_cartao_emergencial');
});
