<?php

use App\Http\Controllers\ServicoController;

//Servicos
Route::prefix('servicos')->group(function () {
    Route::get('', [ServicoController::class, 'index'])->name('servicos.index');
    Route::get('/create', [ServicoController::class, 'create'])->name('servicos.create');
    Route::post('', [ServicoController::class, 'store'])->name('servicos.store');
    Route::get('/{id}', [ServicoController::class, 'show'])->name('servicos.show');
    Route::get('/{id}/edit', [ServicoController::class, 'edit'])->name('servicos.edit');
    Route::post('/{id}', [ServicoController::class, 'update'])->name('servicos.update');
    Route::delete('/{id}', [ServicoController::class, 'destroy'])->name('servicos.destroy');
    Route::get('/filter/{array_dados}', [ServicoController::class, 'filter'])->name('servicos.filter');
});
