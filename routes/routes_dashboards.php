<?php

use App\Http\Controllers\DashboardController;

//Dashboards
Route::prefix('dashboards')->group(function () {
    Route::get('', [DashboardController::class, 'index'])->name('dashboards.index');

    Route::get('/graficos', [DashboardController::class, 'graficos'])->name('dashboards.graficos');
    Route::get('/grafico/dados/{grafico_id}', [DashboardController::class, 'grafico_dados'])->name('dashboards.grafico_dados');
});
