<?php

use App\Http\Controllers\MapaPreventivoController;

// Mapas Preventivos
Route::prefix('mapas_preventivos')->group(function () {
    Route::get('', [MapaPreventivoController::class, 'index'])->name('mapas_preventivos.index');
    Route::get('/create', [MapaPreventivoController::class, 'create'])->name('mapas_preventivos.create');
    Route::post('', [MapaPreventivoController::class, 'store'])->name('mapas_preventivos.store');
    Route::get('/{id}', [MapaPreventivoController::class, 'show'])->name('mapas_preventivos.show');
    Route::get('/{id}/edit', [MapaPreventivoController::class, 'edit'])->name('mapas_preventivos.edit');
    Route::post('/{id}', [MapaPreventivoController::class, 'update'])->name('mapas_preventivos.update');
    Route::delete('/{id}', [MapaPreventivoController::class, 'destroy'])->name('mapas_preventivos.destroy');
    Route::get('/filter/{array_dados}', [MapaPreventivoController::class, 'filter'])->name('mapas_preventivos.filter');
});
