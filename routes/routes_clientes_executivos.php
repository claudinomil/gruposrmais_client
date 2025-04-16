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
});
