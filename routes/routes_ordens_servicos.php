<?php

use App\Http\Controllers\OrdemServicoController;

//OrdensServicos
Route::prefix('ordens_servicos')->group(function () {
    Route::get('', [OrdemServicoController::class, 'index'])->name('ordens_servicos.index');
    Route::get('/create', [OrdemServicoController::class, 'create'])->name('ordens_servicos.create');
    Route::post('', [OrdemServicoController::class, 'store'])->name('ordens_servicos.store');
    Route::get('/{id}', [OrdemServicoController::class, 'show'])->name('ordens_servicos.show');
    Route::get('/{id}/edit', [OrdemServicoController::class, 'edit'])->name('ordens_servicos.edit');
    Route::post('/{id}', [OrdemServicoController::class, 'update'])->name('ordens_servicos.update');
    Route::delete('/{id}', [OrdemServicoController::class, 'destroy'])->name('ordens_servicos.destroy');
    Route::get('/filter/{array_dados}', [OrdemServicoController::class, 'filter'])->name('ordens_servicos.filter');
});
