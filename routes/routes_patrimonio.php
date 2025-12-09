<?php

use App\Http\Controllers\PatrimonioController;

// Patrimonio
Route::prefix('patrimonio')->group(function () {
    Route::get('/informacao/{numero_patrimonio}', [PatrimonioController::class, 'informacao'])->name('patrimonio.informacao');
});
