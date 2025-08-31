<?php

use App\Http\Controllers\EscalaController;

//Escalas
Route::prefix('escalas')->group(function () {
    Route::get('', [EscalaController::class, 'index'])->name('escalas.index');
    Route::get('/create', [EscalaController::class, 'create'])->name('escalas.create');
    Route::post('', [EscalaController::class, 'store'])->name('escalas.store');
    Route::get('/{id}', [EscalaController::class, 'show'])->name('escalas.show');
    Route::get('/{id}/edit', [EscalaController::class, 'edit'])->name('escalas.edit');
    Route::post('/{id}', [EscalaController::class, 'update'])->name('escalas.update');
    Route::delete('/{id}', [EscalaController::class, 'destroy'])->name('escalas.destroy');
    Route::get('/filter/{array_dados}', [EscalaController::class, 'filter'])->name('escalas.filter');
});
