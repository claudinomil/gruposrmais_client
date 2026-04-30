<?php

use App\Http\Controllers\DashboardController;

//Dashboards
Route::prefix('dashboards')->group(function () {
    Route::get('', [DashboardController::class, 'index'])->name('dashboards.index');

    Route::get('/graficos/{grafico_grupo_id}', [DashboardController::class, 'graficos'])->name('dashboards.graficos');

    Route::get('/grupo/informacoes/{grafico_grupo_id}/{cliente_id}/{edificacao_id}/{edificacao_nivel_id}', [DashboardController::class, 'grupo_informacoes'])->name('dashboards.grupo_informacoes');

    Route::get('/grafico/dados/grafico_1', [DashboardController::class, 'grafico_1_dados'])->name('dashboards.grafico_1_dados');
    Route::get('/grafico/dados/grafico_2', [DashboardController::class, 'grafico_2_dados'])->name('dashboards.grafico_2_dados');
    Route::get('/grafico/dados/grafico_3', [DashboardController::class, 'grafico_3_dados'])->name('dashboards.grafico_3_dados');
    Route::get('/grafico/dados/grafico_4', [DashboardController::class, 'grafico_4_dados'])->name('dashboards.grafico_4_dados');
    Route::get('/grafico/dados/grafico_5', [DashboardController::class, 'grafico_5_dados'])->name('dashboards.grafico_5_dados');
    Route::get('/grafico/dados/grafico_6', [DashboardController::class, 'grafico_6_dados'])->name('dashboards.grafico_6_dados');
    Route::get('/grafico/dados/grafico_7', [DashboardController::class, 'grafico_7_dados'])->name('dashboards.grafico_7_dados');
    Route::get('/grafico/dados/grafico_8', [DashboardController::class, 'grafico_8_dados'])->name('dashboards.grafico_8_dados');
    Route::get('/grafico/dados/grafico_9', [DashboardController::class, 'grafico_9_dados'])->name('dashboards.grafico_9_dados');
    Route::get('/grafico/dados/grafico_10', [DashboardController::class, 'grafico_10_dados'])->name('dashboards.grafico_10_dados');
    Route::get('/grafico/dados/grafico_11/{cliente_id}/{edificacao_id}/{edificacao_nivel_id}', [DashboardController::class, 'grafico_11_dados'])->name('dashboards.grafico_11_dados');
    Route::get('/grafico/dados/grafico_12/{cliente_id}/{edificacao_id}/{edificacao_nivel_id}', [DashboardController::class, 'grafico_12_dados'])->name('dashboards.grafico_12_dados');
    Route::get('/grafico/dados/grafico_13/{cliente_id}/{edificacao_id}/{edificacao_nivel_id}', [DashboardController::class, 'grafico_13_dados'])->name('dashboards.grafico_13_dados');
    Route::get('/grafico/dados/grafico_14', [DashboardController::class, 'grafico_14_dados'])->name('dashboards.grafico_14_dados');
    Route::get('/grafico/dados/grafico_15', [DashboardController::class, 'grafico_15_dados'])->name('dashboards.grafico_15_dados');
});
