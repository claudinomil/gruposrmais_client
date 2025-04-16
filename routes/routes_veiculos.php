<?php

use App\Http\Controllers\VeiculoController;

//Veiculos
Route::prefix('veiculos')->group(function () {
    Route::get('', [VeiculoController::class, 'index'])->name('veiculos.index');
    Route::get('/create', [VeiculoController::class, 'create'])->name('veiculos.create');
    Route::post('', [VeiculoController::class, 'store'])->name('veiculos.store');
    Route::get('/{id}', [VeiculoController::class, 'show'])->name('veiculos.show');
    Route::get('/{id}/edit', [VeiculoController::class, 'edit'])->name('veiculos.edit');
    Route::post('/{id}', [VeiculoController::class, 'update'])->name('veiculos.update');
    Route::delete('/{id}', [VeiculoController::class, 'destroy'])->name('veiculos.destroy');
    Route::get('/filter/{array_dados}', [VeiculoController::class, 'filter'])->name('veiculos.filter');
});
