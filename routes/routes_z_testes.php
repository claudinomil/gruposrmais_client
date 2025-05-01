<?php

use App\Http\Controllers\Z_TestesController;

//Testes
Route::prefix('testes')->group(function () {
    Route::get('teste1', [Z_TestesController::class, 'index'])->name('z_testes.teste1');
});
