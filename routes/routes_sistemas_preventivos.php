<?php

use App\Http\Controllers\SistemaPreventivoController;

// Sistemas Preventivo
Route::prefix('sistemas_preventivos')->group(function () {
    Route::get('', [SistemaPreventivoController::class, 'index'])->name('sistemas_preventivos.index');
    Route::get('/create', [SistemaPreventivoController::class, 'create'])->name('sistemas_preventivos.create');
    Route::post('', [SistemaPreventivoController::class, 'store'])->name('sistemas_preventivos.store');
    Route::get('/{id}', [SistemaPreventivoController::class, 'show'])->name('sistemas_preventivos.show');
    Route::get('/{id}/edit', [SistemaPreventivoController::class, 'edit'])->name('sistemas_preventivos.edit');
    Route::post('/{id}', [SistemaPreventivoController::class, 'update'])->name('sistemas_preventivos.update');
    Route::delete('/{id}', [SistemaPreventivoController::class, 'destroy'])->name('sistemas_preventivos.destroy');
    Route::get('/filter/{array_dados}', [SistemaPreventivoController::class, 'filter'])->name('sistemas_preventivos.filter');

    // Equipamentos
    Route::get('/equipamentos/{sistema_preventivo_id}', [SistemaPreventivoController::class, 'equipamentos'])->name('sistemas_preventivos.equipamentos');
});
