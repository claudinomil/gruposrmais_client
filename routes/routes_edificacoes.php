<?php

use App\Http\Controllers\EdificacaoController;

// Edificações
Route::prefix('edificacoes')->group(function () {
    Route::get('', [EdificacaoController::class, 'index'])->name('edificacoes.index');
    Route::get('/create', [EdificacaoController::class, 'create'])->name('edificacoes.create');
    Route::post('', [EdificacaoController::class, 'store'])->name('edificacoes.store');
    Route::get('/{id}', [EdificacaoController::class, 'show'])->name('edificacoes.show');
    Route::get('/{id}/edit', [EdificacaoController::class, 'edit'])->name('edificacoes.edit');
    Route::post('/{id}', [EdificacaoController::class, 'update'])->name('edificacoes.update');
    Route::delete('/{id}', [EdificacaoController::class, 'destroy'])->name('edificacoes.destroy');
    Route::get('/filter/{array_dados}', [EdificacaoController::class, 'filter'])->name('edificacoes.filter');

    // Outras Rotas de dados
    Route::get('/dados/edificacao_niveis/{edificacao_id}', [EdificacaoController::class, 'edificacao_niveis'])->name('edificacoes.edificacao_niveis');
});
