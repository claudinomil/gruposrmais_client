<?php

use App\Http\Controllers\NacionalidadeController;

//Nacionalidades
Route::prefix('nacionalidades')->group(function () {
    Route::get('', [NacionalidadeController::class, 'index'])->name('nacionalidades.index');
    Route::get('/create', [NacionalidadeController::class, 'create'])->name('nacionalidades.create');
    Route::post('', [NacionalidadeController::class, 'store'])->name('nacionalidades.store');
    Route::get('/{id}', [NacionalidadeController::class, 'show'])->name('nacionalidades.show');
    Route::get('/{id}/edit', [NacionalidadeController::class, 'edit'])->name('nacionalidades.edit');
    Route::post('/{id}', [NacionalidadeController::class, 'update'])->name('nacionalidades.update');
    Route::delete('/{id}', [NacionalidadeController::class, 'destroy'])->name('nacionalidades.destroy');
    Route::get('/filter/{array_dados}', [NacionalidadeController::class, 'filter'])->name('nacionalidades.filter');
});
