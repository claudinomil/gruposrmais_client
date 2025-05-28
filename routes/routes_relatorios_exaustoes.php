<?php

use App\Http\Controllers\RelatorioExaustaoController;

Route::prefix('relatorios_exaustoes')->group(function () {
    Route::get('', [RelatorioExaustaoController::class, 'index'])->name('relatorios_exaustoes.index');
    Route::get('/create', [RelatorioExaustaoController::class, 'create'])->name('relatorios_exaustoes.create');
    Route::post('', [RelatorioExaustaoController::class, 'store'])->name('relatorios_exaustoes.store');
    Route::get('/{id}', [RelatorioExaustaoController::class, 'show'])->name('relatorios_exaustoes.show');
    Route::get('/{id}/edit', [RelatorioExaustaoController::class, 'edit'])->name('relatorios_exaustoes.edit');
    Route::post('/{id}', [RelatorioExaustaoController::class, 'update'])->name('relatorios_exaustoes.update');
    Route::delete('/{id}', [RelatorioExaustaoController::class, 'destroy'])->name('relatorios_exaustoes.destroy');
    Route::get('/filter/{array_dados}', [RelatorioExaustaoController::class, 'filter'])->name('relatorios_exaustoes.filter');
});
