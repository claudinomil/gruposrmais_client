<?php

use App\Http\Controllers\ProdutoController;

//Produtos
Route::prefix('produtos')->group(function () {
    Route::get('', [ProdutoController::class, 'index'])->name('produtos.index');
    Route::get('/create', [ProdutoController::class, 'create'])->name('produtos.create');
    Route::post('', [ProdutoController::class, 'store'])->name('produtos.store');
    Route::get('/{id}', [ProdutoController::class, 'show'])->name('produtos.show');
    Route::get('/{id}/edit', [ProdutoController::class, 'edit'])->name('produtos.edit');
    Route::post('/{id}', [ProdutoController::class, 'update'])->name('produtos.update');
    Route::delete('/{id}', [ProdutoController::class, 'destroy'])->name('produtos.destroy');
    Route::get('/filter/{array_dados}', [ProdutoController::class, 'filter'])->name('produtos.filter');

    // Modal produtos_modal_info
    Route::get('/modalInfo/modal_info/{id}', [ProdutoController::class, 'modal_info'])->name('produtos.modal_info');
    Route::post('/uploadFotografia/upload_fotografia', [ProdutoController::class, 'upload_fotografia'])->name('produtos.upload_fotografia');
});
