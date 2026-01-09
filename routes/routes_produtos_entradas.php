<?php

use App\Http\Controllers\ProdutoEntradaController;

// Produtos Entradas
Route::prefix('produtos_entradas')->group(function () {
    Route::get('', [ProdutoEntradaController::class, 'index'])->name('produtos_entradas.index');
    Route::get('/create', [ProdutoEntradaController::class, 'create'])->name('produtos_entradas.create');
    Route::post('', [ProdutoEntradaController::class, 'store'])->name('produtos_entradas.store');
    Route::get('/{id}', [ProdutoEntradaController::class, 'show'])->name('produtos_entradas.show');
    Route::get('/{id}/edit', [ProdutoEntradaController::class, 'edit'])->name('produtos_entradas.edit');
    Route::post('/{id}', [ProdutoEntradaController::class, 'update'])->name('produtos_entradas.update');
    Route::delete('/{id}', [ProdutoEntradaController::class, 'destroy'])->name('produtos_entradas.destroy');
    Route::get('/filter/{array_dados}', [ProdutoEntradaController::class, 'filter'])->name('produtos_entradas.filter');

    // Modal
    Route::get('/modalInfo/modal_info/{id}', [ProdutoEntradaController::class, 'modal_info'])->name('produtos_entradas.modal_info');
    Route::post('/uploadNotaFiscal/upload_nota_fiscal', [ProdutoEntradaController::class, 'upload_nota_fiscal'])->name('produtos_entradas.upload_nota_fiscal');

    // Executar Entrada
    Route::get('/executar_entrada/{id}', [ProdutoEntradaController::class, 'executar_entrada'])->name('produtos_entradas.executar_entrada');
});
