<?php

use App\Http\Controllers\AdministradorController;

Route::prefix('administrador')->group(function () {
    Route::get('', [AdministradorController::class, 'index'])->middleware('administrador')->name('administrador.index');

    //Backup Banco de Dados
    Route::get('/backup/banco/carregar', [AdministradorController::class, 'backup_banco_carregar']);
    Route::get('/backup/banco/criar', [AdministradorController::class, 'backup_banco_criar']);

    //Backup Arquivos
    Route::get('/backup/arquivos/carregar', [AdministradorController::class, 'backup_arquivos_carregar']);
    Route::get('/backup/arquivos/criar', [AdministradorController::class, 'backup_arquivos_criar']);
});
