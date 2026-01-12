<?php

use App\Http\Controllers\VisitaTecnicaController;

//VisitasTecnicas
Route::prefix('visitas_tecnicas')->group(function () {
    Route::get('', [VisitaTecnicaController::class, 'index'])->name('visitas_tecnicas.index');
    Route::get('/create', [VisitaTecnicaController::class, 'create'])->name('visitas_tecnicas.create');
    Route::post('/{cliente_id}/{visita_tecnica_tipo_id}/{vt_cs}', [VisitaTecnicaController::class, 'store'])->name('visitas_tecnicas.store');
    Route::get('/{id}', [VisitaTecnicaController::class, 'show'])->name('visitas_tecnicas.show');
    Route::get('/{id}/edit', [VisitaTecnicaController::class, 'edit'])->name('visitas_tecnicas.edit');
    Route::post('/{id}', [VisitaTecnicaController::class, 'update'])->name('visitas_tecnicas.update');
    Route::delete('/{id}', [VisitaTecnicaController::class, 'destroy'])->name('visitas_tecnicas.destroy');
    Route::get('/filter/{array_dados}', [VisitaTecnicaController::class, 'filter'])->name('visitas_tecnicas.filter');

    // Rotas VTT1'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Rotas Perguntas individuais (VTT1)
    Route::post('/vtt1/pergunta/updatePergunta/{visita_tecnica_dado_id}', [VisitaTecnicaController::class, 'vtt1_updatePergunta'])->name('visitas_tecnicas.vtt1_update_pergunta');
    Route::post('/vtt1/pergunta/uploadFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt1_uploadFotografia'])->name('visitas_tecnicas.vtt1_uploadFotografia');
    Route::post('/vtt1/pergunta/removerFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt1_removerFotografia'])->name('visitas_tecnicas.vtt1_removerFotografia');
    Route::post('/vtt1/pergunta/uploadPdf/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt1_uploadPdf'])->name('visitas_tecnicas.vtt1_uploadPdf');
    Route::post('/vtt1/pergunta/removerPdf/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt1_removerPdf'])->name('visitas_tecnicas.vtt1_removerPdf');

    // Visitas Técnicas Perguntas (VTT1)
    Route::post('/vtt1/visitas_tecnicas_perguntas/atualizar_pergunta/{id}', [VisitaTecnicaController::class, 'vtt1_atualizar_pergunta'])->name('visitas_tecnicas.vtt1_atualizar_pergunta');

    // Visitas Técnicas Perguntas Completa / Sintética) (VTT1)
    Route::get('/vtt1/visitas_tecnicas_perguntas/perguntas_completa_sintetica/{cs}', [VisitaTecnicaController::class, 'vtt1_perguntas_completa_sintetica'])->name('visitas_tecnicas.vtt1_perguntas_completa_sintetica');
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Rotas VTT2'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    // Rotas Perguntas individuais (VTT2)
    Route::post('/vtt2/pergunta/updatePergunta/{visita_tecnica_dado_id}', [VisitaTecnicaController::class, 'vtt2_updatePergunta'])->name('visitas_tecnicas.vtt2_update_pergunta');
    Route::post('/vtt2/pergunta/uploadFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt2_uploadFotografia'])->name('visitas_tecnicas.vtt2_uploadFotografia');
    Route::post('/vtt2/pergunta/removerFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt2_removerFotografia'])->name('visitas_tecnicas.vtt2_removerFotografia');
    Route::post('/vtt2/pergunta/uploadPdf/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt2_uploadPdf'])->name('visitas_tecnicas.vtt2_uploadPdf');
    Route::post('/vtt2/pergunta/removerPdf/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'vtt2_removerPdf'])->name('visitas_tecnicas.vtt2_removerPdf');

    // Visitas Técnicas Perguntas (VTT2)
    Route::post('/vtt2/visitas_tecnicas_perguntas/atualizar_pergunta/{id}', [VisitaTecnicaController::class, 'vtt2_atualizar_pergunta'])->name('visitas_tecnicas.vtt2_atualizar_pergunta');

    // Visitas Técnicas Perguntas Completa / Sintética) (VTT2)
    Route::get('/vtt2/visitas_tecnicas_perguntas/perguntas_completa_sintetica/{cs}', [VisitaTecnicaController::class, 'vtt2_perguntas_completa_sintetica'])->name('visitas_tecnicas.vtt2_perguntas_completa_sintetica');
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
