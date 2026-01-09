<?php

use App\Http\Controllers\ProdutoControleSituacaoController;

// Produtos Controle Situacoes
Route::prefix('produtos_controle_situacoes')->group(function () {
    Route::get('', [ProdutoControleSituacaoController::class, 'index'])->name('produtos_controle_situacoes.index');
    Route::get('/{id}', [ProdutoControleSituacaoController::class, 'show'])->name('produtos_controle_situacoes.show');
    Route::get('/{id}/edit', [ProdutoControleSituacaoController::class, 'edit'])->name('produtos_controle_situacoes.edit');
    Route::post('/{id}', [ProdutoControleSituacaoController::class, 'update'])->name('produtos_controle_situacoes.update');
    Route::get('/filter/{array_dados}', [ProdutoControleSituacaoController::class, 'filter'])->name('produtos_controle_situacoes.filter');
});
