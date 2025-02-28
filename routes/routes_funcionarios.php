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
    Route::post('/uploadFoto/upload_foto', [FuncionarioController::class, 'upload_foto'])->name('funcionarios.upload_foto');
    Route::post('/uploadDocumentoPdf/upload_documento_pdf', [FuncionarioController::class, 'upload_documento_pdf'])->name('funcionarios.upload_documento_pdf');
    Route::get('/modalInfo/documentos_pdf/{funcionario_id}', [FuncionarioController::class, 'documentos_pdf'])->name('funcionarios.documentos_pdf');
    Route::delete('/modalInfo/deletar_documento_pdf/{funcionario_documento_id}', [FuncionarioController::class, 'deletar_documento_pdf'])->name('funcionarios.deletar_documento_pdf');

    //Ação: funcionario_acao_1
    Route::get('/funcionarioAcao1/funcionario_acao_1_grade_funcionarios', [FuncionarioController::class, 'funcionario_acao_1_grade_funcionarios'])->name('funcionarios.funcionario_acao_1_grade_funcionarios');
    Route::get('/funcionarioAcao1/funcionario_acao_1_gerar_pdf_dados/{funcionarios_ids}', [FuncionarioController::class, 'funcionario_acao_1_gerar_pdf_dados'])->name('funcionarios.funcionario_acao_1_gerar_pdf_dados');
});
