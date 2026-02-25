<?php

use App\Http\Controllers\MedidaSegurancaController;

// Medidas Segurança
Route::prefix('medidas_seguranca')->group(function () {
    Route::get('', [MedidaSegurancaController::class, 'index'])->name('medidas_seguranca.index');
    Route::get('/create', [MedidaSegurancaController::class, 'create'])->name('medidas_seguranca.create');
    Route::post('', [MedidaSegurancaController::class, 'store'])->name('medidas_seguranca.store');
    Route::get('/{id}', [MedidaSegurancaController::class, 'show'])->name('medidas_seguranca.show');
    Route::get('/{id}/edit', [MedidaSegurancaController::class, 'edit'])->name('medidas_seguranca.edit');
    Route::post('/{id}', [MedidaSegurancaController::class, 'update'])->name('medidas_seguranca.update');
    Route::delete('/{id}', [MedidaSegurancaController::class, 'destroy'])->name('medidas_seguranca.destroy');
    Route::get('/filter/{array_dados}', [MedidaSegurancaController::class, 'filter'])->name('medidas_seguranca.filter');
});
