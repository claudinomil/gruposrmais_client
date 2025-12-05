<?php

use App\Http\Controllers\FuncionarioController;

//Funcionarios
Route::prefix('funcionarios')->group(function () {
    Route::get('', [FuncionarioController::class, 'index'])->name('funcionarios.index');
    Route::get('/create', [FuncionarioController::class, 'create'])->name('funcionarios.create');
    Route::post('', [FuncionarioController::class, 'store'])->name('funcionarios.store');
    Route::get('/{id}', [FuncionarioController::class, 'show'])->name('funcionarios.show');
    Route::get('/{id}/edit', [FuncionarioController::class, 'edit'])->name('funcionarios.edit');
    Route::post('/{id}', [FuncionarioController::class, 'update'])->name('funcionarios.update');
    Route::delete('/{id}', [FuncionarioController::class, 'destroy'])->name('funcionarios.destroy');
    Route::get('/filter/{array_dados}', [FuncionarioController::class, 'filter'])->name('funcionarios.filter');

    //Modal funcionarios_modal_info
    Route::get('/modalInfo/modal_info/{id}', [FuncionarioController::class, 'modal_info'])->name('funcionarios.modal_info');
    Route::get('/modalInfo/estatisticas/{id}', [FuncionarioController::class, 'estatisticas'])->name('funcionarios.estatisticas');
    Route::post('/uploadFotografia/upload_fotografia_documento', [FuncionarioController::class, 'upload_fotografia_documento'])->name('funcionarios.upload_fotografia_documento');
    Route::post('/uploadFotografia/upload_fotografia_cartao_emergencial', [FuncionarioController::class, 'upload_fotografia_cartao_emergencial'])->name('funcionarios.upload_fotografia_cartao_emergencial');
    Route::post('/uploadDocumento/upload_documento', [FuncionarioController::class, 'upload_documento'])->name('funcionarios.upload_documento');
    Route::get('/modalInfo/documentos/{funcionario_id}', [FuncionarioController::class, 'documentos'])->name('funcionarios.documentos');
    Route::delete('/modalInfo/deletar_documento/{funcionario_documento_id}', [FuncionarioController::class, 'deletar_documento'])->name('funcionarios.deletar_documento');
    Route::get('/modalInfo/tomadores_servicos/{funcionario_id}', [FuncionarioController::class, 'tomadores_servicos'])->name('funcionarios.tomadores_servicos');
    Route::get('/modalInfo/verificar_documentos_mensais/{funcionario_id}/{mes}/{ano}', [FuncionarioController::class, 'verificar_documentos_mensais'])->name('funcionarios.verificar_documentos_mensais');
    Route::post('/uploadDocumentoMensal/upload_documento_mensal', [FuncionarioController::class, 'upload_documento_mensal'])->name('funcionarios.upload_documento_mensal');
    Route::get('/modalInfo/documentos_mensais/{funcionario_id}', [FuncionarioController::class, 'documentos_mensais'])->name('funcionarios.documentos_mensais');
    Route::delete('/modalInfo/deletar_documento_mensal/{funcionario_documento_mensal_id}', [FuncionarioController::class, 'deletar_documento_mensal'])->name('funcionarios.deletar_documento_mensal');

    //Dados para Cartões Emergenciais
    Route::get('/cartoes_emergenciais/dados/{ids}', [FuncionarioController::class, 'cartoes_emergenciais_dados'])->name('funcionarios.cartoes_emergenciais_dados');

    //Ação: funcionario_acao_1
    Route::get('/funcionarioAcao1/funcionario_acao_1_grade_funcionarios', [FuncionarioController::class, 'funcionario_acao_1_grade_funcionarios'])->name('funcionarios.funcionario_acao_1_grade_funcionarios');
    Route::get('/funcionarioAcao1/funcionario_acao_1_gerar_pdf_dados/{funcionarios_ids}', [FuncionarioController::class, 'funcionario_acao_1_gerar_pdf_dados'])->name('funcionarios.funcionario_acao_1_gerar_pdf_dados');
});
