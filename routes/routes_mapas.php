<?php

use App\Http\Controllers\MapaController;

//Mapas
Route::prefix('mapas')->group(function () {
    Route::get('', [MapaController::class, 'index'])->name('mapas.index');
    Route::get('/create', [MapaController::class, 'create'])->name('mapas.create');
    Route::post('', [MapaController::class, 'store'])->name('mapas.store');
    Route::get('/{id}', [MapaController::class, 'show'])->name('mapas.show');
    Route::get('/{id}/edit', [MapaController::class, 'edit'])->name('mapas.edit');
    Route::post('/{id}', [MapaController::class, 'update'])->name('mapas.update');
    Route::delete('/{id}', [MapaController::class, 'destroy'])->name('mapas.destroy');
    Route::get('/filter/{array_dados}', [MapaController::class, 'filter'])->name('mapas.filter');
});
