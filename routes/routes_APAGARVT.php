<?php

use App\Http\Controllers\APAGARVTController;

//VisitasTecnicas
Route::prefix('visitas_tecnicas')->group(function () {
    Route::get('', [APAGARVTController::class, 'index'])->name('visitas_tecnicas.index');
    Route::get('/{id}', [APAGARVTController::class, 'show'])->name('visitas_tecnicas.show');
    Route::get('/{id}/edit', [APAGARVTController::class, 'edit'])->name('visitas_tecnicas.edit');
    Route::post('/{id}', [APAGARVTController::class, 'update'])->name('visitas_tecnicas.update');
    Route::get('/filter/{array_dados}', [APAGARVTController::class, 'filter'])->name('visitas_tecnicas.filter');

    Route::get('/medidas_seguranca/{np}/{atc}/{grupo}/{divisao}', [APAGARVTController::class, 'medidas_seguranca'])->name('visitas_tecnicas.medidas_seguranca');

    Route::post('/documentos_upload/{file}', [APAGARVTController::class, 'documentos_upload'])->name('visitas_tecnicas.documentos_upload');
});
