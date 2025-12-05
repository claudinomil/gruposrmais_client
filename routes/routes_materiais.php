<?php

use App\Http\Controllers\MaterialController;

//Materiais
Route::prefix('materiais')->group(function () {
    Route::get('', [MaterialController::class, 'index'])->name('materiais.index');
    Route::get('/create', [MaterialController::class, 'create'])->name('materiais.create');
    Route::post('', [MaterialController::class, 'store'])->name('materiais.store');
    Route::get('/{id}', [MaterialController::class, 'show'])->name('materiais.show');
    Route::get('/{id}/edit', [MaterialController::class, 'edit'])->name('materiais.edit');
    Route::post('/{id}', [MaterialController::class, 'update'])->name('materiais.update');
    Route::delete('/{id}', [MaterialController::class, 'destroy'])->name('materiais.destroy');
    Route::get('/filter/{array_dados}', [MaterialController::class, 'filter'])->name('materiais.filter');

    // Modal materiais_modal_info
    Route::get('/modalInfo/modal_info/{id}', [MaterialController::class, 'modal_info'])->name('materiais.modal_info');
    Route::post('/uploadFotografia/upload_fotografia', [MaterialController::class, 'upload_fotografia'])->name('materiais.upload_fotografia');
});
