<?php

use App\Http\Controllers\VistoriaSistemaController;

// Vistorias Sistemas
Route::prefix('vistorias_sistemas')->group(function () {
    Route::get('', [VistoriaSistemaController::class, 'index'])->name('vistorias_sistemas.index');
    Route::get('/create', [VistoriaSistemaController::class, 'create'])->name('vistorias_sistemas.create');
    Route::post('', [VistoriaSistemaController::class, 'store'])->name('vistorias_sistemas.store');
    Route::get('/{id}', [VistoriaSistemaController::class, 'show'])->name('vistorias_sistemas.show');
    Route::get('/{id}/edit', [VistoriaSistemaController::class, 'edit'])->name('vistorias_sistemas.edit');
    Route::post('/{id}', [VistoriaSistemaController::class, 'update'])->name('vistorias_sistemas.update');
    Route::delete('/{id}', [VistoriaSistemaController::class, 'destroy'])->name('vistorias_sistemas.destroy');
    Route::get('/filter/{array_dados}', [VistoriaSistemaController::class, 'filter'])->name('vistorias_sistemas.filter');

    // Rotas Perguntas individuais
    Route::post('/pergunta/updatePergunta/{vistoria_sistema_dado_id}', [VistoriaSistemaController::class, 'updatePergunta'])->name('vistorias_sistemas.update_pergunta');
    Route::post('/pergunta/uploadFotografia/{vistoria_sistema_dado_id}/{slot}', [VistoriaSistemaController::class, 'uploadFotografia'])->name('vistorias_sistemas.uploadFotografia');
    Route::post('/pergunta/removerFotografia/{vistoria_sistema_dado_id}/{slot}', [VistoriaSistemaController::class, 'removerFotografia'])->name('vistorias_sistemas.removerFotografia');
    Route::post('/pergunta/uploadPdf/{vistoria_sistema_dado_id}/{slot}', [VistoriaSistemaController::class, 'uploadPdf'])->name('vistorias_sistemas.uploadPdf');
    Route::post('/pergunta/removerPdf/{vistoria_sistema_dado_id}/{slot}', [VistoriaSistemaController::class, 'removerPdf'])->name('vistorias_sistemas.removerPdf');
});
