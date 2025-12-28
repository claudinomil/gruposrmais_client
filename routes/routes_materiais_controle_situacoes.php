<?php

use App\Http\Controllers\MaterialControleSituacaoController;

// Materiais Controle Situacoes
Route::prefix('materiais_controle_situacoes')->group(function () {
    Route::get('', [MaterialControleSituacaoController::class, 'index'])->name('materiais_controle_situacoes.index');
    Route::get('/{id}', [MaterialControleSituacaoController::class, 'show'])->name('materiais_controle_situacoes.show');
    Route::get('/{id}/edit', [MaterialControleSituacaoController::class, 'edit'])->name('materiais_controle_situacoes.edit');
    Route::post('/{id}', [MaterialControleSituacaoController::class, 'update'])->name('materiais_controle_situacoes.update');
    Route::get('/filter/{array_dados}', [MaterialControleSituacaoController::class, 'filter'])->name('materiais_controle_situacoes.filter');
});
