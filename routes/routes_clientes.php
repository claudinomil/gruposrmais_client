<?php

use App\Http\Controllers\ClienteController;

// Clientes
Route::prefix('clientes')->group(function () {
    Route::get('', [ClienteController::class, 'index'])->name('clientes.index');
    Route::get('/create', [ClienteController::class, 'create'])->name('clientes.create');
    Route::post('', [ClienteController::class, 'store'])->name('clientes.store');
    Route::get('/{id}', [ClienteController::class, 'show'])->name('clientes.show');
    Route::get('/{id}/edit', [ClienteController::class, 'edit'])->name('clientes.edit');
    Route::post('/{id}', [ClienteController::class, 'update'])->name('clientes.update');
    Route::delete('/{id}', [ClienteController::class, 'destroy'])->name('clientes.destroy');
    Route::get('/filter/{array_dados}', [ClienteController::class, 'filter'])->name('clientes.filter');

    // Modal clientes_modal_info
    Route::get('/modalInfo/modal_info/{id}', [ClienteController::class, 'modal_info'])->name('clientes.modal_info');
    Route::get('/modalInfo/estatisticas/{id}', [ClienteController::class, 'estatisticas'])->name('clientes.estatisticas');
    Route::post('/uploadLogotipo/upload_logotipo_principal', [ClienteController::class, 'upload_logotipo_principal'])->name('clientes.upload_logotipo_principal');
    Route::post('/uploadLogotipo/upload_logotipo_relatorios', [ClienteController::class, 'upload_logotipo_relatorios'])->name('clientes.upload_logotipo_relatorios');
    Route::post('/uploadLogotipo/upload_logotipo_cartao_emergencial', [ClienteController::class, 'upload_logotipo_cartao_emergencial'])->name('clientes.upload_logotipo_cartao_emergencial');
    Route::post('/uploadLogotipo/upload_logotipo_menu', [ClienteController::class, 'upload_logotipo_menu'])->name('clientes.upload_logotipo_menu');
    Route::post('/editarDocumento/editar_documento', [ClienteController::class, 'editar_documento'])->name('clientes.editar_documento');
    Route::get('/modalInfo/documentos/{cliente_id}', [ClienteController::class, 'documentos'])->name('clientes.documentos');
    Route::delete('/modalInfo/deletar_documento/{cliente_documento_id}', [ClienteController::class, 'deletar_documento'])->name('clientes.deletar_documento');
    Route::post('/editarLoja/editar_loja', [ClienteController::class, 'editar_loja'])->name('clientes.editar_loja');
    Route::get('/modalInfo/lojas/{cliente_id}', [ClienteController::class, 'lojas'])->name('clientes.lojas');
    Route::delete('/modalInfo/deletar_loja/{cliente_loja_id}', [ClienteController::class, 'deletar_loja'])->name('clientes.deletar_loja');
    Route::post('/editarSistemaPreventivo/editar_sistema_preventivo', [ClienteController::class, 'editar_sistema_preventivo'])->name('clientes.editar_sistema_preventivo');
    Route::get('/modalInfo/sistemas_preventivos/{cliente_id}', [ClienteController::class, 'sistemas_preventivos'])->name('clientes.sistemas_preventivos');
    Route::delete('/modalInfo/deletar_sistema_preventivo/{cliente_sistema_preventivo_id}', [ClienteController::class, 'deletar_sistema_preventivo'])->name('clientes.deletar_sistema_preventivo');
    Route::get('/modalInfo/documentos_exigidos/{cliente_id}', [ClienteController::class, 'documentos_exigidos'])->name('clientes.documentos_exigidos');
    Route::post('/modalInfo/documentos_exigidos_save', [ClienteController::class, 'documentos_exigidos_save'])->name('clientes.documentos_exigidos_save');

    Route::get('/modalInfo/propostas/{cliente_id}', [ClienteController::class, 'propostas'])->name('clientes.propostas');
    Route::get('/modalInfo/ordens_servicos/{cliente_id}', [ClienteController::class, 'ordens_servicos'])->name('clientes.ordens_servicos');
    Route::get('/modalInfo/visitas_tecnicas/{cliente_id}', [ClienteController::class, 'visitas_tecnicas'])->name('clientes.visitas_tecnicas');
    Route::get('/modalInfo/brigadas_incendios/{cliente_id}', [ClienteController::class, 'brigadas_incendios'])->name('clientes.brigadas_incendios');
    Route::get('/modalInfo/clientes_rede/{cliente_id}', [ClienteController::class, 'clientes_rede'])->name('clientes.clientes_rede');
    Route::get('/modalInfo/clientes_principal/{cliente_id}', [ClienteController::class, 'clientes_principal'])->name('clientes.clientes_principal');

    Route::get('/sistema_preventivo/informacao/{sistema_preventivo_numero}', [ClienteController::class, 'sistema_preventivo_informacao'])->name('clientes.sistema_preventivo_informacao');
});
