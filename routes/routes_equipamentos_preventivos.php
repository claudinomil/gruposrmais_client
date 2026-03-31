<?php

use App\Http\Controllers\EquipamentoPreventivoController;

// Equipamentos Preventivos
Route::prefix('equipamentos_preventivos')->group(function () {
    Route::get('', [EquipamentoPreventivoController::class, 'index'])->name('equipamentos_preventivos.index');
    Route::get('/create', [EquipamentoPreventivoController::class, 'create'])->name('equipamentos_preventivos.create');
    Route::post('', [EquipamentoPreventivoController::class, 'store'])->name('equipamentos_preventivos.store');
    Route::get('/{id}', [EquipamentoPreventivoController::class, 'show'])->name('equipamentos_preventivos.show');
    Route::get('/{id}/edit', [EquipamentoPreventivoController::class, 'edit'])->name('equipamentos_preventivos.edit');
    Route::post('/{id}', [EquipamentoPreventivoController::class, 'update'])->name('equipamentos_preventivos.update');
    Route::delete('/{id}', [EquipamentoPreventivoController::class, 'destroy'])->name('equipamentos_preventivos.destroy');
    Route::get('/filter/{array_dados}', [EquipamentoPreventivoController::class, 'filter'])->name('equipamentos_preventivos.filter');
});
