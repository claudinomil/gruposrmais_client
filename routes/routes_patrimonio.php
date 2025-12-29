<?php

use App\Http\Controllers\PatrimonioController;

// Patrimonio
Route::prefix('patrimonio')->group(function () {
    Route::get('/informacao/{material_numero_patrimonio}', [PatrimonioController::class, 'informacao'])->name('patrimonio.informacao');
    Route::get('/listagem_geral', [PatrimonioController::class, 'listagem_geral'])->name('patrimonio.listagem_geral');

    // Retornar todas as Situações de um Patrimônio
    Route::get('/patrimonio_situacoes/{material_entrada_item_id}', [PatrimonioController::class, 'patrimonio_situacoes'])->name('patrimonio.patrimonio_situacoes');
});
