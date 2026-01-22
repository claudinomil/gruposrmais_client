<?php
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ConfirmEmailController;
use Illuminate\Support\Facades\Http;

//Sem estar Logado''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// Rota de Entrada no Sistema Padrão
Route::get('/', function () {
    // Grava na sessão para domínio de Clientes (RESETAR)
    session(['gsrm_cliente_id' => 0, 'gsrm_cliente_name' => '', 'gsrm_cliente_logotipo_principal' => '', 'gsrm_cliente_logotipo_menu' => '']);

    // Ir para tela de Login
    return redirect()->route('login');
})->name('rota_entrada_1');

// Rota de Entrada no Sistema por Domínio (Cliente)
Route::get('login/{dominio}', function ($dominio) {
    // Grava na sessão para domínio de Clientes (RESETAR)
    session(['gsrm_cliente_id' => 0, 'gsrm_cliente_name' => '', 'gsrm_cliente_logotipo_principal' => '', 'gsrm_cliente_logotipo_menu' => '']);

    // Buscar Cliente pelo dominio
    $response = Http::get(env('API_URL') . 'cliente_grupo_srmais/' . $dominio);

    if ($response->failed()) {
        abort(500, 'Erro ao acessar a API.');
    }

    $cliente = $response->json();

    // Verifica se retornou array com pelo menos um cliente válido
    if (!is_array($cliente) || empty($cliente) || !isset($cliente[0]['id'])) {
        return view('errors.000', ['code' => 404, 'message' => 'Cliente não encontrado para o domínio informado.##'.$dominio, 'backpage' => false]);
    }

    // Grava na sessão para domínio de Clientes (CLIENTE)
    $logotipo_principal = !empty($cliente[0]['logotipo_principal']) ? $cliente[0]['logotipo_principal'] : 'build/assets/images/clientes/logotipo_principal-0.png';
    $logotipo_menu = !empty($cliente[0]['logotipo_menu']) ? $cliente[0]['logotipo_menu'] : 'build/assets/images/clientes/logotipo_menu-0.png';
    session(['gsrm_cliente_id' => $cliente[0]['id'], 'gsrm_cliente_name' => $cliente[0]['name'], 'gsrm_cliente_logotipo_principal' => $logotipo_principal, 'gsrm_cliente_logotipo_menu' => $logotipo_menu]);

    // Ir para tela de Login
    return redirect()->route('login');
})->name('rota_entrada_2');

// Login
Route::get('login', [LoginController::class, 'login'])->name('login');
Route::post('login', [LoginController::class, 'loginApi']);

// Outras rotas sobre passwords
Route::get('forget-password', [ForgotPasswordController::class, 'showForgetPasswordForm'])->name('forget.password.get');
Route::post('forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post');
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get');
Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post');

// Outras rotas sobre E-mail
Route::get('confirm-email', [ConfirmEmailController::class, 'showConfirmEmailForm'])->name('confirm.email.get');
Route::post('confirm-email', [ConfirmEmailController::class, 'submitConfirmEmailForm'])->name('confirm.email.post');
Route::get('code-confirm-email/{email}', [ConfirmEmailController::class, 'showCodeConfirmEmaildForm'])->name('code.confirm.email.get');
Route::post('code-confirm-email', [ConfirmEmailController::class, 'submitCodeConfirmEmailForm'])->name('code.confirm.email.post');
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Logado''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Logout
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
