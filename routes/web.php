<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\App;

//Rota inicial
Route::get('/', function () {
    //return view('welcome');
    return redirect()->route('login');
});

//Locale
Route::get('/locale', function () {
    return response()->json(['locale' => app()->getLocale()]);
});

//Traduzir frase/palavra conforme locale do sistema
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

//Buscar dados de um CNPJ na receitaws.com.br
Route::get('/receitaws/consulta-cnpj/{cnpj}', [\App\Services\SuporteService::class, 'consultarCNPJ']);

//Administrador
require __DIR__.'/routes_administrador.php';

//Rotas de auth
require __DIR__.'/routes_auth.php';

//Rotas Language Translation
require __DIR__ . '/routes_translation.php';

//Empresas
require __DIR__ . '/routes_empresas.php';

//Emails
require __DIR__ . '/routes_emails.php';

//Transacoes
require __DIR__ . '/routes_transacoes.php';

//Groups
require __DIR__ . '/routes_grupos.php';

//Users
require __DIR__ . '/routes_users.php';

//Bancos
require __DIR__ . '/routes_bancos.php';

//Departamentos
require __DIR__ . '/routes_departamentos.php';

//Funcionarios
require __DIR__ . '/routes_funcionarios.php';

//Generos
require __DIR__ . '/routes_generos.php';

//EstadosCivis
require __DIR__ . '/routes_estados_civis.php';

//Nacionalidades
require __DIR__ . '/routes_nacionalidades.php';

//Naturalidades
require __DIR__ . '/routes_naturalidades.php';

//Funcoes
require __DIR__ . '/routes_funcoes.php';

//Escolaridades
require __DIR__ . '/routes_escolaridades.php';

//Identityorgans
require __DIR__ . '/routes_identidade_orgaos.php';

//Clientes
require __DIR__ . '/routes_clientes.php';

//Dashboards
require __DIR__ . '/routes_dashboards.php';

//Dashboards2
require __DIR__ . '/routes_dashboards2.php';

//Dashboards3
require __DIR__ . '/routes_dashboards3.php';

//Fornecedores
require __DIR__ . '/routes_fornecedores.php';

//Serviços Tipos
require __DIR__ . '/routes_servico_tipos.php';

//Serviços
require __DIR__ . '/routes_servicos.php';

//Ordens Servicos
require __DIR__ . '/routes_ordens_servicos.php';

//Propostas
require __DIR__ . '/routes_propostas.php';

//Veículos
require __DIR__ . '/routes_veiculos.php';

//Clientes Executivos
require __DIR__ . '/routes_clientes_executivos.php';

//Relatórios
require __DIR__ . '/routes_relatorios.php';

//Mapas
require __DIR__ . '/routes_mapas.php';

//Mapas Pontos Interesse
require __DIR__ . '/routes_pontos_interesse.php';

//Visitas Técnicas
require __DIR__ . '/routes_visitas_tecnicas.php';

//Materiais
require __DIR__ . '/routes_materiais.php';

// Materiais Entradas
require __DIR__ . '/routes_materiais_entradas.php';

// Materiais Movimentacoes
require __DIR__ . '/routes_materiais_movimentacoes.php';

//Brigadas Incendios
require __DIR__ . '/routes_brigadas_incendios.php';

// Clientes Locais
require __DIR__ . '/routes_clientes_locais.php';

//Diversos
require __DIR__ . '/routes_guests.php';

//Testes
require __DIR__ . '/routes_z_testes.php';

// Patrimonio
require __DIR__.'/routes_patrimonio.php';

//Verificar se arquivo existe'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Limpar Caches via Navegador - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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
//Limpar Caches via Navegador - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
