<?php

use App\Http\Controllers\Dashboard2Controller;

//Dashboards 2
Route::prefix('dashboards2')->group(function () {
    Route::get('', [Dashboard2Controller::class, 'index'])->name('dashboards2.index');

    Route::get('/graficos', [Dashboard2Controller::class, 'graficos'])->name('dashboards2.graficos');
    Route::get('/grafico/dados/{grafico_id}', [Dashboard2Controller::class, 'grafico_dados'])->name('dashboards2.grafico_dados');
});