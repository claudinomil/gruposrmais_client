<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ApiData
{
    public function getData($type, $submodulo, $id, $array_dados_filtro, $request)
    {
        try {
            $httpHeaders = Http::withHeaders(
                [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer '.session('access_token'),
                    'X-Empresa-Id' => session('gsrm_empresa_id')
                ])->withOptions(
                [
                    'verify' => false,
                    'base_uri' => env('API_URL').'api/'
                ]
            );

            //Dados Usuario/Permissões/Configurações
            if ($type == 0) {$response = $httpHeaders->get('users/user/permissoes/settings/'.$submodulo);}

            //Lista de Registros
            if ($type == 1) {$response = $httpHeaders->get($submodulo.'/index');}

            //Registro pelo id
            if ($type == 2) {$response = $httpHeaders->get($submodulo.'/show/'.$id);}

            //Lista por Filtro
            if ($type == 3) {$response = $httpHeaders->get($submodulo.'/filter/'.$array_dados_filtro);}

            //Incluir Registro
            if ($type == 4) {$response = $httpHeaders->post($submodulo.'/store', $request);}

            //Alterar Registro
            if ($type == 5) {$response = $httpHeaders->put($submodulo.'/update/'.$id, $request);}

            //Deletar Registro
            if ($type == 6) {$response = $httpHeaders->delete($submodulo.'/destroy/'.$id);}

            //Logout
            if ($type == 7) {$response = $httpHeaders->post('auth/logout');}

            //Dashboard
            if ($type == 8) {$response = $httpHeaders->get($submodulo.'/index/'.$id);}

            //Direto para uma url enviada pela variavel $submodulo : GET
            if ($type == 10) {$response = $httpHeaders->get($submodulo); }

            //Direto para uma url enviada pela variavel $submodulo + Request : PUT
            if ($type == 11) {$response = $httpHeaders->put($submodulo, $request);}

            //Direto para uma url enviada pela variavel $submodulo + Request : POST
            if ($type == 12) {$response = $httpHeaders->post($submodulo, $request);}

            //Direto para uma url enviada pela variavel $submodulo : DELETE
            if ($type == 13) {$response = $httpHeaders->delete($submodulo);}

            //dd($response->json());   //TRAZER ERRO NA DEPURAÇÃO

            return $response;
        } catch (\Exception $e) {
            abort(500, 'ApiData');
        }
    }
}
