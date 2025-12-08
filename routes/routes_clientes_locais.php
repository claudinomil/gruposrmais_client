<?php

use App\Http\Controllers\ClienteLocalController;

// Clientes Locais
Route::prefix('clientes_locais')->group(function () {
    Route::get('', [ClienteLocalController::class, 'index'])->name('clientes_locais.index');
    Route::get('/create', [ClienteLocalController::class, 'create'])->name('clientes_locais.create');
    Route::post('', [ClienteLocalController::class, 'store'])->name('clientes_locais.store');
    Route::get('/{id}', [ClienteLocalController::class, 'show'])->name('clientes_locais.show');
    Route::get('/{id}/edit', [ClienteLocalController::class, 'edit'])->name('clientes_locais.edit');
    Route::post('/{id}', [ClienteLocalController::class, 'update'])->name('clientes_locais.update');
    Route::delete('/{id}', [ClienteLocalController::class, 'destroy'])->name('clientes_locais.destroy');
    Route::get('/filter/{array_dados}', [ClienteLocalController::class, 'filter'])->name('clientes_locais.filter');
});
