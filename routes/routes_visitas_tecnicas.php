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

    //Rotas Perguntas individuais
    Route::post('/pergunta/updatePergunta/{visita_tecnica_dado_id}', [VisitaTecnicaController::class, 'updatePergunta'])->name('visitas_tecnicas.update_pergunta');
    Route::post('/pergunta/uploadFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'uploadFotografia'])->name('visitas_tecnicas.uploadFotografia');
    Route::post('/pergunta/removerFotografia/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'removerFotografia'])->name('visitas_tecnicas.removerFotografia');
    Route::post('/pergunta/uploadPdf/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'uploadPdf'])->name('visitas_tecnicas.uploadPdf');
    Route::post('/pergunta/removerPdf/{visita_tecnica_dado_id}/{slot}', [VisitaTecnicaController::class, 'removerPdf'])->name('visitas_tecnicas.removerPdf');

    //Visitas Técnicas Perguntas
    Route::post('/visitas_tecnicas_perguntas/atualizar_pergunta/{id}', [VisitaTecnicaController::class, 'atualizar_pergunta'])->name('visitas_tecnicas.atualizar_pergunta');

    //Visitas Técnicas Perguntas Completa / Sintética)
    Route::get('/visitas_tecnicas_perguntas/perguntas_completa_sintetica/{cs}', [VisitaTecnicaController::class, 'perguntas_completa_sintetica'])->name('visitas_tecnicas.perguntas_completa_sintetica');

    //Verificar se arquivo existe (Topo e Rodape Cliente)
    Route::get('/verificar-arquivo/{arquivo}', function ($arquivo) {
        if (file_exists('build/assets/images/'.$arquivo)) {
            return response()->json(['success' => true, 'error' => false]);
        } else {
            return response()->json(['success' => false, 'error' => true]);
        }
    });
});
