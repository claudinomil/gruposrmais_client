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

    Route::get('/extradata/{id}', [ClienteController::class, 'extradata']);

    Route::get('/visita_tecnica/{id}', [ClienteController::class, 'visita_tecnica'])->name('clientes.visita_tecnica');
});
