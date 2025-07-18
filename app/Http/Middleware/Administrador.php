<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class Administrador
{
    public function handle(Request $request, Closure $next)
    {
        // Permissão
        $permissao = true;

        // Recupera o valor da URL (ex: /administrador?token=XXXX)
        $valor = $request->query('token');

        // Soma: ano atual + minutos da hora atual
        $ano = now()->year;
        $minuto = now()->minute;
        $soma = $ano + $minuto;

        if ((int)$valor !== $soma) {
            $permissao = false;
        }

        View::share(['permissao' => $permissao]);

        return $next($request);
    }
}
