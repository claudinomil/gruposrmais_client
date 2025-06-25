<?php

use App\Http\Controllers\ClienteExecutivoController;

//Clientes Executivos
Route::prefix('clientes_executivos')->group(function () {
    Route::get('', [ClienteExecutivoController::class, 'index'])->name('clientes_executivos.index');
    Route::get('/create', [ClienteExecutivoController::class, 'create'])->name('clientes_executivos.create');
    Route::post('', [ClienteExecutivoController::class, 'store'])->name('clientes_executivos.store');
    Route::get('/{id}', [ClienteExecutivoController::class, 'show'])->name('clientes_executivos.show');
    Route::get('/{id}/edit', [ClienteExecutivoController::class, 'edit'])->name('clientes_executivos.edit');
    Route::post('/{id}', [ClienteExecutivoController::class, 'update'])->name('clientes_executivos.update');
    Route::delete('/{id}', [ClienteExecutivoController::class, 'destroy'])->name('clientes_executivos.destroy');
    Route::get('/filter/{array_dados}', [ClienteExecutivoController::class, 'filter'])->name('clientes_executivos.filter');

    //Modal clientes_executivos_modal_info
    Route::get('/modalInfo/modal_info/{id}', [ClienteExecutivoController::class, 'modal_info'])->name('clientes_executivos.modal_info');
    Route::post('/uploadFoto/upload_foto', [ClienteExecutivoController::class, 'upload_foto'])->name('clientes_executivos.upload_foto');
    Route::post('/uploadDocumentoPdf/upload_documento_pdf', [ClienteExecutivoController::class, 'upload_documento_pdf'])->name('clientes_executivos.upload_documento_pdf');
    Route::get('/modalInfo/documentos_pdf/{cliente_executivo_id}', [ClienteExecutivoController::class, 'documentos_pdf'])->name('clientes_executivos.documentos_pdf');
    Route::delete('/modalInfo/deletar_documento_pdf/{cliente_executivo_documento_id}', [ClienteExecutivoController::class, 'deletar_documento_pdf'])->name('clientes_executivos.deletar_documento_pdf');

    //Dados para Cartões Emergenciais
    Route::get('/cartoes_emergenciais/dados/{ids}', [ClienteExecutivoController::class, 'cartoes_emergenciais_dados'])->name('clientes_executivos.cartoes_emergenciais_dados');
});
