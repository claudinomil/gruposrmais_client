<?php

use App\Http\Controllers\ProdutoListagemGeralController;

// Produtos Listagem Geral
Route::prefix('produtos_listagem_geral')->group(function () {
    Route::get('', [ProdutoListagemGeralController::class, 'index'])->name('produtos_listagem_geral.index');
    Route::get('/filter/{array_dados}', [ProdutoListagemGeralController::class, 'filter'])->name('produtos_listagem_geral.filter');
});
