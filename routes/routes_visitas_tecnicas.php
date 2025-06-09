<?php

use App\Http\Controllers\VisitaTecnicaController;

//VisitasTecnicas
Route::prefix('visitas_tecnicas')->group(function () {
    Route::get('', [VisitaTecnicaController::class, 'index'])->name('visitas_tecnicas.index');
    Route::get('/create', [VisitaTecnicaController::class, 'create'])->name('visitas_tecnicas.create');
    Route::post('/{visita_tecnica_tipo_id}/{cliente_id}', [VisitaTecnicaController::class, 'store'])->name('visitas_tecnicas.store');
    Route::get('/{id}', [VisitaTecnicaController::class, 'show'])->name('visitas_tecnicas.show');
    Route::get('/{id}/edit', [VisitaTecnicaController::class, 'edit'])->name('visitas_tecnicas.edit');
    Route::post('/{id}', [VisitaTecnicaController::class, 'update'])->name('visitas_tecnicas.update');
    Route::delete('/{id}', [VisitaTecnicaController::class, 'destroy'])->name('visitas_tecnicas.destroy');
    Route::get('/filter/{array_dados}', [VisitaTecnicaController::class, 'filter'])->name('visitas_tecnicas.filter');

    //Rotas Perguntas individuais
    Route::post('/pergunta/updatePergunta/{visita_tecnica_dado_id}', [VisitaTecnicaController::class, 'updatePergunta'])->name('visitas_tecnicas.update_pergunta');
    Route::post('/pergunta/uploadFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'uploadFotografia'])->name('visitas_tecnicas.uploadFotografia');
    Route::post('/pergunta/removerFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'removerFotografia'])->name('visitas_tecnicas.removerFotografia');
});
