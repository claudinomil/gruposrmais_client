<?php

use App\Http\Controllers\ClientesFuncionarioController;

// Clientes Funcionarios
Route::prefix('clientes_funcionarios')->group(function () {
    Route::get('', [ClientesFuncionarioController::class, 'index'])->name('clientes_funcionarios.index');
    Route::get('/{id}', [ClientesFuncionarioController::class, 'show'])->name('clientes_funcionarios.show');
    Route::get('/filter/{array_dados}', [ClientesFuncionarioController::class, 'filter'])->name('clientes_funcionarios.filter');

    //Modal clientes_funcionarios_modal_info
    Route::get('/modalInfo/modal_info/{id}', [ClientesFuncionarioController::class, 'modal_info'])->name('clientes_funcionarios.modal_info');
    Route::get('/modalInfo/estatisticas/{id}', [ClientesFuncionarioController::class, 'estatisticas'])->name('clientes_funcionarios.estatisticas');
    Route::get('/modalInfo/documentos/{funcionario_id}', [ClientesFuncionarioController::class, 'documentos'])->name('clientes_funcionarios.documentos');
    Route::get('/modalInfo/tomadores_servicos/{funcionario_id}', [ClientesFuncionarioController::class, 'tomadores_servicos'])->name('clientes_funcionarios.tomadores_servicos');
    Route::get('/modalInfo/verificar_documentos_mensais/{funcionario_id}/{mes}/{ano}', [ClientesFuncionarioController::class, 'verificar_documentos_mensais'])->name('clientes_funcionarios.verificar_documentos_mensais');
    Route::get('/modalInfo/documentos_mensais/{funcionario_id}', [ClientesFuncionarioController::class, 'documentos_mensais'])->name('clientes_funcionarios.documentos_mensais');

    //Dados para Cartões Emergenciais
    Route::get('/cartoes_emergenciais/dados/{ids}', [ClientesFuncionarioController::class, 'cartoes_emergenciais_dados'])->name('clientes_funcionarios.cartoes_emergenciais_dados');
});
