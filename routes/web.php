<?php

use App\Facades\QRCodeFacade;
use Illuminate\Support\Facades\Route;

//Rota inicial
Route::get('/', function () {
    return view('welcome');
});

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

//Clientes Servicos
require __DIR__ . '/routes_clientes_servicos.php';

//Dashboards
require __DIR__ . '/routes_dashboards.php';

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

//Brigadas Incêndios
require __DIR__ . '/routes_brigadas.php';

//QRCodes
require __DIR__ . '/routes_qrcodes.php';

//Veículos
require __DIR__ . '/routes_veiculos.php';

//Clientes Executivos
require __DIR__ . '/routes_clientes_executivos.php';

//Relatórios
require __DIR__ . '/routes_relatorios.php';

//Mapas
require __DIR__ . '/routes_mapas.php';

//Mapas Pontos Interesse
require __DIR__ . '/routes_mapas_pontos_interesse.php';

//Visitas Técnicas
require __DIR__ . '/routes_visitas_tecnicas.php';

//Diversos
require __DIR__ . '/routes_guests.php';

//Testes
require __DIR__ . '/routes_z_testes.php';

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
