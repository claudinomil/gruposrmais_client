<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\App;

class GuestController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function validar_cartao_emergencial($submodulo, $traducao, $id)
    {
        //Buscando dados Api_Data() - Registro pelo id
        $this->responseApi(1, 10, 'guests/validar_cartao_emergencial/'.$submodulo.'/'.$id, '', '', '');

        //Registro recebido com sucesso
        if ($this->code == 2000) {
            //Preparando Dados para a View
            if ($this->content['data_nascimento'] != '') {
                $this->content['data_nascimento'] = Carbon::createFromFormat('Y-m-d', substr($this->content['data_nascimento'], 0, 10))->format('d/m/Y');
            }

            //Retorno
            return view('guests.validar_cartao_emergencial', [
                'traducao' => $traducao,
                'content' => $this->content
            ]);

        } else if ($this->code == 2040) {
            return response()->json(['error' => $this->message]);
        } else {
            abort(500, 'Erro Interno Guest');
        }
    }
}
