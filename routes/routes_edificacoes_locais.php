<?php

use App\Http\Controllers\EdificacaoLocalController;

// Edificações
Route::prefix('edificacoes_locais')->group(function () {
    Route::get('', [EdificacaoLocalController::class, 'index'])->name('edificacoes_locais.index');
    Route::get('/create', [EdificacaoLocalController::class, 'create'])->name('edificacoes_locais.create');
    Route::post('', [EdificacaoLocalController::class, 'store'])->name('edificacoes_locais.store');
    Route::get('/{id}', [EdificacaoLocalController::class, 'show'])->name('edificacoes_locais.show');
    Route::get('/{id}/edit', [EdificacaoLocalController::class, 'edit'])->name('edificacoes_locais.edit');
    Route::post('/{id}', [EdificacaoLocalController::class, 'update'])->name('edificacoes_locais.update');
    Route::delete('/{id}', [EdificacaoLocalController::class, 'destroy'])->name('edificacoes_locais.destroy');
    Route::get('/filter/{array_dados}', [EdificacaoLocalController::class, 'filter'])->name('edificacoes_locais.filter');
});
