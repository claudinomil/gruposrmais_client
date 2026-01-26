<?php

use App\Http\Controllers\ClientesRelatorioController;

//Clientes Relatorios
Route::prefix('clientes_relatorios')->group(function () {
    Route::get('', [ClientesRelatorioController::class, 'index'])->name('clientes_relatorios.index');

    Route::get('relatorios', [ClientesRelatorioController::class, 'relatorios'])->name('clientes_relatorios.relatorios');

    Route::get('relatorio11/{data_inicio}/{data_fim}/{cidade_id}/{cidade}/{idioma}', [ClientesRelatorioController::class, 'relatorio11'])->name('clientes_relatorios.relatorio11');
    Route::get('relatorio12/{ponto_tipo_id}/{ponto_natureza_id}/{modelo}/{idioma}', [ClientesRelatorioController::class, 'relatorio12'])->name('clientes_relatorios.relatorio12');
});
