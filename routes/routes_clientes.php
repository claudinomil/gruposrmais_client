<?php

use App\Http\Controllers\ClienteController;

//Clientes
Route::prefix('clientes')->group(function () {
    Route::get('', [ClienteController::class, 'index'])->name('clientes.index');
    Route::get('/create', [ClienteController::class, 'create'])->name('clientes.create');
    Route::post('', [ClienteController::class, 'store'])->name('clientes.store');
    Route::get('/{id}', [ClienteController::class, 'show'])->name('clientes.show');
    Route::get('/{id}/edit', [ClienteController::class, 'edit'])->name('clientes.edit');
    Route::post('/{id}', [ClienteController::class, 'update'])->name('clientes.update');
    Route::delete('/{id}', [ClienteController::class, 'destroy'])->name('clientes.destroy');
    Route::get('/filter/{array_dados}', [ClienteController::class, 'filter'])->name('clientes.filter');

    //Modal clientes_modal_info
    Route::get('/modalInfo/modal_info/{id}', [ClienteController::class, 'modal_info'])->name('clientes.modal_info');
    Route::get('/modalInfo/estatisticas/{id}', [ClienteController::class, 'estatisticas'])->name('clientes.estatisticas');
    Route::post('/uploadLogotipo/upload_logotipo_principal', [ClienteController::class, 'upload_logotipo_principal'])->name('clientes.upload_logotipo_principal');
    Route::post('/uploadLogotipo/upload_logotipo_relatorios', [ClienteController::class, 'upload_logotipo_relatorios'])->name('clientes.upload_logotipo_relatorios');
    Route::post('/uploadLogotipo/upload_logotipo_cartao_emergencial', [ClienteController::class, 'upload_logotipo_cartao_emergencial'])->name('clientes.upload_logotipo_cartao_emergencial');
    Route::post('/uploadDocumento/upload_documento', [ClienteController::class, 'upload_documento'])->name('clientes.upload_documento');
    Route::get('/modalInfo/documentos/{cliente_id}', [ClienteController::class, 'documentos'])->name('clientes.documentos');
    Route::delete('/modalInfo/deletar_documento/{cliente_documento_id}', [ClienteController::class, 'deletar_documento'])->name('clientes.deletar_documento');
    Route::get('/modalInfo/servicos/{cliente_id}', [ClienteController::class, 'servicos'])->name('clientes.servicos');
    Route::get('/modalInfo/clientes/{cliente_id}', [ClienteController::class, 'clientes'])->name('clientes.clientes');

    Route::get('/visita_tecnica/{id}', [ClienteController::class, 'visita_tecnica'])->name('clientes.visita_tecnica');
});
