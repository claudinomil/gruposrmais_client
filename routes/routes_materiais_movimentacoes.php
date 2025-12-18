<?php

use App\Http\Controllers\MaterialMovimentacaoController;

// Materiais Movimentacoes
Route::prefix('materiais_movimentacoes')->group(function () {
    Route::get('', [MaterialMovimentacaoController::class, 'index'])->name('materiais_movimentacoes.index');
    Route::get('/create', [MaterialMovimentacaoController::class, 'create'])->name('materiais_movimentacoes.create');
    Route::post('', [MaterialMovimentacaoController::class, 'store'])->name('materiais_movimentacoes.store');
    Route::get('/{id}', [MaterialMovimentacaoController::class, 'show'])->name('materiais_movimentacoes.show');
    Route::get('/filter/{array_dados}', [MaterialMovimentacaoController::class, 'filter'])->name('materiais_movimentacoes.filter');

    // Buscar Materiais Entradas Itens
    Route::get('/materiais_entradas_itens/{operacao}/{estoque_local_id}/{material_movimentacao_id}', [MaterialMovimentacaoController::class, 'materiais_entradas_itens'])->name('materiais_movimentacoes.materiais_entradas_itens');
});
