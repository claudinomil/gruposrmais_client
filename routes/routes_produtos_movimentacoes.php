<?php

use App\Http\Controllers\ProdutoMovimentacaoController;

// Produtos Movimentacoes
Route::prefix('produtos_movimentacoes')->group(function () {
    Route::get('', [ProdutoMovimentacaoController::class, 'index'])->name('produtos_movimentacoes.index');
    Route::get('/create', [ProdutoMovimentacaoController::class, 'create'])->name('produtos_movimentacoes.create');
    Route::post('', [ProdutoMovimentacaoController::class, 'store'])->name('produtos_movimentacoes.store');
    Route::get('/{id}', [ProdutoMovimentacaoController::class, 'show'])->name('produtos_movimentacoes.show');
    Route::get('/filter/{array_dados}', [ProdutoMovimentacaoController::class, 'filter'])->name('produtos_movimentacoes.filter');

    // Buscar Produtos Entradas Itens
    Route::get('/produtos_entradas_itens/{operacao}/{estoque_local_id}/{produto_movimentacao_id}', [ProdutoMovimentacaoController::class, 'produtos_entradas_itens'])->name('produtos_movimentacoes.produtos_entradas_itens');
});
