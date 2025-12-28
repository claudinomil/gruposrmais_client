<?php

use App\Http\Controllers\MaterialListagemGeralController;

// Materiais Listagem Geral
Route::prefix('materiais_listagem_geral')->group(function () {
    Route::get('', [MaterialListagemGeralController::class, 'index'])->name('materiais_listagem_geral.index');
    Route::get('/filter/{array_dados}', [MaterialListagemGeralController::class, 'filter'])->name('materiais_listagem_geral.filter');
});
