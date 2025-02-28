<?php

use App\Http\Controllers\FuncaoController;

//Funcoes
Route::prefix('funcoes')->group(function () {
    Route::get('', [FuncaoController::class, 'index'])->name('funcoes.index');
    Route::get('/create', [FuncaoController::class, 'create'])->name('funcoes.create');
    Route::post('', [FuncaoController::class, 'store'])->name('funcoes.store');
    Route::get('/{id}', [FuncaoController::class, 'show'])->name('funcoes.show');
    Route::get('/{id}/edit', [FuncaoController::class, 'edit'])->name('funcoes.edit');
    Route::post('/{id}', [FuncaoController::class, 'update'])->name('funcoes.update');
    Route::delete('/{id}', [FuncaoController::class, 'destroy'])->name('funcoes.destroy');
    Route::get('/filter/{array_dados}', [FuncaoController::class, 'filter'])->name('funcoes.filter');
});
