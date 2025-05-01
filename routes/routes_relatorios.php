<?php

use App\Http\Controllers\RelatorioController;

//Relatorios
Route::prefix('relatorios')->group(function () {
    Route::get('', [RelatorioController::class, 'index'])->name('relatorios.index');

    Route::get('relatorios', [RelatorioController::class, 'relatorios'])->name('relatorios.relatorios');

    Route::get('relatorio1/{grupo_id}/{idioma}', [RelatorioController::class, 'relatorio1'])->name('relatorios.relatorio1');
    Route::get('relatorio2/{grupo_id}/{situacao_id}/{idioma}', [RelatorioController::class, 'relatorio2'])->name('relatorios.relatorio2');
    Route::get('relatorio3/{data}/{user_id}/{submodulo_id}/{operacao_id}/{dado}/{idioma}', [RelatorioController::class, 'relatorio3'])->name('relatorios.relatorio3');
    Route::get('relatorio4/{date}/{title}/{notificacao}/{user_id}/{idioma}', [RelatorioController::class, 'relatorio4'])->name('relatorios.relatorio4');
    Route::get('relatorio5/{name}/{descricao}/{url}/{user_id}/{idioma}', [RelatorioController::class, 'relatorio5'])->name('relatorios.relatorio5');
    Route::get('relatorio6/{data_inicio}/{data_fim}/{cidade_id}/{cidade}/{idioma}', [RelatorioController::class, 'relatorio6'])->name('relatorios.relatorio6');
});
