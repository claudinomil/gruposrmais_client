<?php

use App\Http\Controllers\ClientesFuncionarioController;

// Clientes Funcionarios
Route::prefix('clientes_funcionarios')->group(function () {
    Route::get('', [ClientesFuncionarioController::class, 'index'])->name('clientes_funcionarios.index');
    Route::get('/{id}', [ClientesFuncionarioController::class, 'show'])->name('clientes_funcionarios.show');
    Route::get('/filter/{array_dados}', [ClientesFuncionarioController::class, 'filter'])->name('clientes_funcionarios.filter');

    // Modal clientes_funcionarios_modal_info
    Route::get('/modalInfo/modal_info/{id}', [ClientesFuncionarioController::class, 'modal_info'])->name('clientes_funcionarios.modal_info');
    Route::get('/modalInfo/documentos/{funcionario_id}', [ClientesFuncionarioController::class, 'documentos'])->name('clientes_funcionarios.documentos');
    Route::get('/modalInfo/documentos_mensais/{funcionario_id}', [ClientesFuncionarioController::class, 'documentos_mensais'])->name('clientes_funcionarios.documentos_mensais');
});
