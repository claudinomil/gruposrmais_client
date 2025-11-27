<?php

use App\Http\Controllers\RelatorioController;

//Relatorios
Route::prefix('relatorios')->group(function () {
    Route::get('', [RelatorioController::class, 'index'])->name('relatorios.index');

    Route::get('relatorios', [RelatorioController::class, 'relatorios'])->name('relatorios.relatorios');

    Route::get('relatorio1/{grupo_id}/{idioma}', [RelatorioController::class, 'relatorio1'])->name('relatorios.relatorio1');
    Route::get('relatorio2/{grupo_id}/{situacao_id}/{idioma}', [RelatorioController::class, 'relatorio2'])->name('relatorios.relatorio2');
    Route::get('relatorio3/{data}/{user_id}/{submodulo_id}/{operacao_id}/{dado}/{idioma}', [RelatorioController::class, 'relatorio3'])->name('relatorios.relatorio3');
    Route::get('relatorio6/{data_inicio}/{data_fim}/{cidade_id}/{cidade}/{idioma}', [RelatorioController::class, 'relatorio6'])->name('relatorios.relatorio6');
    Route::get('relatorio8/{ponto_tipo_id}/{ponto_natureza_id}/{modelo}/{idioma}', [RelatorioController::class, 'relatorio8'])->name('relatorios.relatorio8');
    Route::get('relatorio9/{idioma}', [RelatorioController::class, 'relatorio9'])->name('relatorios.relatorio9');
});
