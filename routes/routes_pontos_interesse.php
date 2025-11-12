<?php

use App\Http\Controllers\PontoInteresseController;

//Mapas
Route::prefix('pontos_interesse')->group(function () {
    Route::get('', [PontoInteresseController::class, 'index'])->name('pontos_interesse.index');
    Route::get('/create', [PontoInteresseController::class, 'create'])->name('pontos_interesse.create');
    Route::post('', [PontoInteresseController::class, 'store'])->name('pontos_interesse.store');
    Route::get('/{id}', [PontoInteresseController::class, 'show'])->name('pontos_interesse.show');
    Route::get('/{id}/edit', [PontoInteresseController::class, 'edit'])->name('pontos_interesse.edit');
    Route::post('/{id}', [PontoInteresseController::class, 'update'])->name('pontos_interesse.update');
    Route::delete('/{id}', [PontoInteresseController::class, 'destroy'])->name('pontos_interesse.destroy');
    Route::get('/filter/{array_dados}', [PontoInteresseController::class, 'filter'])->name('pontos_interesse.filter');

    Route::get('/pontos_tipo/{ponto_tipo_id}', [PontoInteresseController::class, 'pontos_tipo'])->name('pontos_interesse.pontos_tipo');
});
