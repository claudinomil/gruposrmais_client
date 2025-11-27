<?php

use App\Http\Controllers\Dashboard3Controller;

//Dashboards 3
Route::prefix('dashboards3')->group(function () {
    Route::get('', [Dashboard3Controller::class, 'index'])->name('dashboards3.index');

    Route::get('/graficos', [Dashboard3Controller::class, 'graficos'])->name('dashboards3.graficos');
    Route::get('/grafico/dados/{grafico_id}', [Dashboard3Controller::class, 'grafico_dados'])->name('dashboards3.grafico_dados');
});