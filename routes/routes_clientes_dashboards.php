<?php

use App\Http\Controllers\ClientesDashboardController;

// Clientes Dashboards
Route::prefix('clientes_dashboards')->group(function () {
    Route::get('', [ClientesDashboardController::class, 'index'])->name('clientes_dashboards.index');

    Route::get('/graficos', [ClientesDashboardController::class, 'graficos'])->name('clientes_dashboards.graficos');
    Route::get('/grafico/dados/{grafico_id}', [ClientesDashboardController::class, 'grafico_dados'])->name('clientes_dashboards.grafico_dados');
});
