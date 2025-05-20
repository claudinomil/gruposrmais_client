<?php

use App\Http\Controllers\MapaPontoInteresseController;

//Mapas
Route::prefix('mapas_pontos_interesse')->group(function () {
    Route::get('', [MapaPontoInteresseController::class, 'index'])->name('mapas_pontos_interesse.index');
    Route::get('/create', [MapaPontoInteresseController::class, 'create'])->name('mapas_pontos_interesse.create');
    Route::post('', [MapaPontoInteresseController::class, 'store'])->name('mapas_pontos_interesse.store');
    Route::get('/{id}', [MapaPontoInteresseController::class, 'show'])->name('mapas_pontos_interesse.show');
    Route::get('/{id}/edit', [MapaPontoInteresseController::class, 'edit'])->name('mapas_pontos_interesse.edit');
    Route::post('/{id}', [MapaPontoInteresseController::class, 'update'])->name('mapas_pontos_interesse.update');
    Route::delete('/{id}', [MapaPontoInteresseController::class, 'destroy'])->name('mapas_pontos_interesse.destroy');
    Route::get('/filter/{array_dados}', [MapaPontoInteresseController::class, 'filter'])->name('mapas_pontos_interesse.filter');

    Route::get('/mapa_pontos_tipo/{mapa_ponto_tipo_id}', [MapaPontoInteresseController::class, 'mapa_pontos_tipo'])->name('mapas_pontos_interesse.mapa_pontos_tipo');
});
