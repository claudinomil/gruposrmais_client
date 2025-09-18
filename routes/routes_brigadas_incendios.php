<?php

use App\Http\Controllers\BrigadaIncendioController;

//Brigadas Incendios
Route::prefix('brigadas_incendios')->group(function () {
    Route::get('', [BrigadaIncendioController::class, 'index'])->name('brigadas_incendios.index');
    Route::get('/create', [BrigadaIncendioController::class, 'create'])->name('brigadas_incendios.create');
    Route::post('', [BrigadaIncendioController::class, 'store'])->name('brigadas_incendios.store');
    Route::get('/{id}', [BrigadaIncendioController::class, 'show'])->name('brigadas_incendios.show');
    Route::get('/{id}/edit', [BrigadaIncendioController::class, 'edit'])->name('brigadas_incendios.edit');
    Route::post('/{id}', [BrigadaIncendioController::class, 'update'])->name('brigadas_incendios.update');
    Route::delete('/{id}', [BrigadaIncendioController::class, 'destroy'])->name('brigadas_incendios.destroy');
    Route::get('/filter/{array_dados}', [BrigadaIncendioController::class, 'filter'])->name('brigadas_incendios.filter');

    Route::get('/dados/tables/{op}', [BrigadaIncendioController::class, 'dados'])->name('brigadas_incendios.dados');
});
