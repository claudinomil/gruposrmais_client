<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\App;

// Locale
Route::get('/locale', function () {
    return response()->json(['locale' => app()->getLocale()]);
});

// Traduzir frase/palavra conforme locale do sistema
Route::get('/translate', function () {
    $chave = Request::get('key');

    if (!$chave) {return response()->json(['translation' => '']);}

    $locale = App::getLocale();
    $arquivo = resource_path("lang/{$locale}.json");

    if (!File::exists($arquivo)) {return response()->json(['translation' => '']);}

    $conteudo = json_decode(File::get($arquivo), true);

    if (array_key_exists($chave, $conteudo)) {
        return response()->json(['translation' => $conteudo[$chave]]);
    } else {
        return response()->json(['translation' => $chave]);
    }
});

// Buscar dados de um CNPJ na receitaws.com.br
Route::get('/receitaws/consulta-cnpj/{cnpj}', [\App\Services\SuporteService::class, 'consultarCNPJ']);

// Verificar se arquivo existe
Route::get('/arquivo_existe', function (Illuminate\Http\Request $request) {
    $arquivo = $request->query('arquivo');

    // Verificar variavel
    if (!isset($arquivo) || $arquivo === null || $arquivo === '') {
        return 'error';
    }

    // Ver se existe
    $path = public_path($arquivo);
    return file_exists($path) ? 'success' : 'error';
});

//Limpar Caches via Navegador - Início
Route::get('/clear-all-cache', function() {
    $retorno = '';

    //Limpar cache do aplicativo:
    Artisan::call('cache:clear');
    $retorno .= 'cache:clear'.'<br>';

    //Limpar cache de rota:
    Artisan::call('route:cache');
    $retorno .= 'route:cache'.'<br>';

    //Limpar cache de configuração:
    Artisan::call('config:cache');
    $retorno .= 'config:cache'.'<br>';

    //Clear view cache:
    Artisan::call('view:clear');
    $retorno .= 'view:clear'.'<br>';

    //Limpe todo o aplicativo de todos os tipos de cache:
    Artisan::call('optimize:clear');
    $retorno .= 'optimize:clear'.'<br>';

    echo $retorno;

    return redirect('/');
});
