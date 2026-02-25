<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class SessionTimeout
{
    private $timeout = 1800; // em segundos
    private $except = ['/', 'rota_entrada_1', 'rota_entrada_2', 'login', 'loginApi', 'logout']; // rotas ignoradas

    public function handle($request, Closure $next)
    {
        // Ignorar rotas específicas
        foreach ($this->except as $route) {
            if ($request->is($route) || $request->is($route . '/*')) {
                return $next($request);
            }
        }

        // Pegar última atividade
        $lastActivity = session()->get('se_userLastActivityTime');

        // Verificar se tempo esta esgotado
        if ($lastActivity && (time() - $lastActivity > $this->timeout)) {
            //Verificando Origem enviada pelo Fetch (Não verifica caso a rota tenha sido chamada pelo javascript)
            if ($request->header('REQUEST-ORIGIN') !== 'fetch') {
                return redirect()->route('logout', ['motivo' => 'timeout']);
            }
        }

        // Atualiza última atividade
        session(['se_userLastActivityTime' => time()]);

        return $next($request);
    }
}
