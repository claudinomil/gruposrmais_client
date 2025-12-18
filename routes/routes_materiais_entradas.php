<?php

use App\Http\Controllers\MaterialEntradaController;

// Materiais Entradas
Route::prefix('materiais_entradas')->group(function () {
    Route::get('', [MaterialEntradaController::class, 'index'])->name('materiais_entradas.index');
    Route::get('/create', [MaterialEntradaController::class, 'create'])->name('materiais_entradas.create');
    Route::post('', [MaterialEntradaController::class, 'store'])->name('materiais_entradas.store');
    Route::get('/{id}', [MaterialEntradaController::class, 'show'])->name('materiais_entradas.show');
    Route::get('/{id}/edit', [MaterialEntradaController::class, 'edit'])->name('materiais_entradas.edit');
    Route::post('/{id}', [MaterialEntradaController::class, 'update'])->name('materiais_entradas.update');
    Route::delete('/{id}', [MaterialEntradaController::class, 'destroy'])->name('materiais_entradas.destroy');
    Route::get('/filter/{array_dados}', [MaterialEntradaController::class, 'filter'])->name('materiais_entradas.filter');

    // Modal
    Route::get('/modalInfo/modal_info/{id}', [MaterialEntradaController::class, 'modal_info'])->name('materiais_entradas.modal_info');
    Route::post('/uploadNotaFiscal/upload_nota_fiscal', [MaterialEntradaController::class, 'upload_nota_fiscal'])->name('materiais_entradas.upload_nota_fiscal');

    // Executar Entrada
    Route::get('/executar_entrada/{id}', [MaterialEntradaController::class, 'executar_entrada'])->name('materiais_entradas.executar_entrada');
});
