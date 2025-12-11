<?php

use App\Http\Controllers\EstoqueLocalController;

// Estoques Locais
Route::prefix('estoques_locais')->group(function () {
    Route::get('', [EstoqueLocalController::class, 'index'])->name('estoques_locais.index');
    Route::get('/create', [EstoqueLocalController::class, 'create'])->name('estoques_locais.create');
    Route::post('', [EstoqueLocalController::class, 'store'])->name('estoques_locais.store');
    Route::get('/{id}', [EstoqueLocalController::class, 'show'])->name('estoques_locais.show');
    Route::get('/{id}/edit', [EstoqueLocalController::class, 'edit'])->name('estoques_locais.edit');
    Route::post('/{id}', [EstoqueLocalController::class, 'update'])->name('estoques_locais.update');
    Route::delete('/{id}', [EstoqueLocalController::class, 'destroy'])->name('estoques_locais.destroy');
    Route::get('/filter/{array_dados}', [EstoqueLocalController::class, 'filter'])->name('estoques_locais.filter');
});
