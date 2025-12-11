<?php

use App\Http\Controllers\MaterialMovimentacaoController;

// Materiais Movimentacoes
Route::prefix('materiais_movimentacoes')->group(function () {
    Route::get('', [MaterialMovimentacaoController::class, 'index'])->name('materiais_movimentacoes.index');
    Route::get('/create', [MaterialMovimentacaoController::class, 'create'])->name('materiais_movimentacoes.create');
    Route::post('', [MaterialMovimentacaoController::class, 'store'])->name('materiais_movimentacoes.store');
    Route::get('/{id}', [MaterialMovimentacaoController::class, 'show'])->name('materiais_movimentacoes.show');
    Route::get('/{id}/edit', [MaterialMovimentacaoController::class, 'edit'])->name('materiais_movimentacoes.edit');
    Route::post('/{id}', [MaterialMovimentacaoController::class, 'update'])->name('materiais_movimentacoes.update');
    Route::delete('/{id}', [MaterialMovimentacaoController::class, 'destroy'])->name('materiais_movimentacoes.destroy');
    Route::get('/filter/{array_dados}', [MaterialMovimentacaoController::class, 'filter'])->name('materiais_movimentacoes.filter');
});
