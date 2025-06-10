<?php

namespace App\Http\Controllers;

use App\Facades\ApiData;
use App\Facades\Permissoes;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Route;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /*
     * Função para ir na API e retornar informações
     */
    public function responseApi($op, $type, $uri, $id, $array_dados_filtro, $request)
    {
        //Buscando dados Api_Data()
        $response = ApiData::getData($type, $uri, $id, $array_dados_filtro, $request);
        //dd($response->json());   //TRAZER ERRO NA DEPURAÇÃO

        //Verificar error
        if (!isset($response['code']) or $response['code'] == 5000) {
            abort(500, 'Erro Interno => '.Route::currentRouteName().'##'.$response['message']);
        }

        //Dados de Retorno
        if ($op == 1) {
            $this->message = $response['message'];
            $this->code = $response['code'];
            $this->validation = $response['validation'];
            $this->content = $response['content'];
        }

        //Dados de Retorno (Auxiliares/Combobox)
        if ($op == 2) {
            if (isset($response['content']['empresas'])) {$this->empresas = $response['content']['empresas'];}
            if (isset($response['content']['generos'])) {$this->generos = $response['content']['generos'];}
            if (isset($response['content']['estados_civis'])) {$this->estados_civis = $response['content']['estados_civis'];}
            if (isset($response['content']['escolaridades'])) {$this->escolaridades = $response['content']['escolaridades'];}
            if (isset($response['content']['nacionalidades'])) {$this->nacionalidades = $response['content']['nacionalidades'];}
            if (isset($response['content']['naturalidades'])) {$this->naturalidades = $response['content']['naturalidades'];}
            if (isset($response['content']['identidade_orgaos'])) {$this->identidade_orgaos = $response['content']['identidade_orgaos'];}
            if (isset($response['content']['identidade_estados'])) {$this->identidade_estados = $response['content']['identidade_estados'];}
            if (isset($response['content']['departamentos'])) {$this->departamentos = $response['content']['departamentos'];}
            if (isset($response['content']['funcoes'])) {$this->funcoes = $response['content']['funcoes'];}
            if (isset($response['content']['bancos'])) {$this->bancos = $response['content']['bancos'];}
            if (isset($response['content']['departamentos'])) {$this->departamentos = $response['content']['departamentos'];}
            if (isset($response['content']['funcionarios'])) {$this->funcionarios = $response['content']['funcionarios'];}
            if (isset($response['content']['grupos'])) {$this->grupos = $response['content']['grupos'];}
            if (isset($response['content']['groupo_permissoes'])) {$this->groupo_permissoes = $response['content']['groupo_permissoes'];}
            if (isset($response['content']['modulos'])) {$this->modulos = $response['content']['modulos'];}
            if (isset($response['content']['submodulos'])) {$this->submodulos = $response['content']['submodulos'];}
            if (isset($response['content']['notificacoes'])) {$this->notificacoes = $response['content']['notificacoes'];}
            if (isset($response['content']['notificacoes_lidas'])) {$this->notificacoes_lidas = $response['content']['notificacoes_lidas'];}
            if (isset($response['content']['operacoes'])) {$this->operacoes = $response['content']['operacoes'];}
            if (isset($response['content']['permissoes'])) {$this->permissoes = $response['content']['permissoes'];}
            if (isset($response['content']['situacoes'])) {$this->situacoes = $response['content']['situacoes'];}
            if (isset($response['content']['ferramentas'])) {$this->ferramentas = $response['content']['ferramentas'];}
            if (isset($response['content']['estados'])) {$this->estados = $response['content']['estados'];}
            if (isset($response['content']['transacoes'])) {$this->transacoes = $response['content']['transacoes'];}
            if (isset($response['content']['users'])) {$this->users = $response['content']['users'];}
            if (isset($response['content']['principal_clientes'])) {$this->principal_clientes = $response['content']['principal_clientes'];}
            if (isset($response['content']['clientes'])) {$this->clientes = $response['content']['clientes'];}
            if (isset($response['content']['responsavel_funcionarios'])) {$this->responsavel_funcionarios = $response['content']['responsavel_funcionarios'];}
            if (isset($response['content']['contratacao_tipos'])) {$this->contratacao_tipos = $response['content']['contratacao_tipos'];}
            if (isset($response['content']['servico_tipos'])) {$this->servico_tipos = $response['content']['servico_tipos'];}
            if (isset($response['content']['servico_status'])) {$this->servico_status = $response['content']['servico_status'];}
            if (isset($response['content']['servicos'])) {$this->servicos = $response['content']['servicos'];}
            if (isset($response['content']['edificacao_classificacoes'])) {$this->edificacao_classificacoes = $response['content']['edificacao_classificacoes'];}
            if (isset($response['content']['incendio_riscos'])) {$this->incendio_riscos = $response['content']['incendio_riscos'];}
            if (isset($response['content']['seguranca_medidas'])) {$this->seguranca_medidas = $response['content']['seguranca_medidas'];}
            if (isset($response['content']['visita_tecnica_status'])) {$this->visita_tecnica_status = $response['content']['visita_tecnica_status'];}
            if (isset($response['content']['visita_tecnica_tipos'])) {$this->visita_tecnica_tipos = $response['content']['visita_tecnica_tipos'];}
            if (isset($response['content']['visitas_tecnicas_dados'])) {$this->visitas_tecnicas_dados = $response['content']['visitas_tecnicas_dados'];}
            if (isset($response['content']['sistema_acessos'])) {$this->sistema_acessos = $response['content']['sistema_acessos'];}
            if (isset($response['content']['escala_tipos'])) {$this->escala_tipos = $response['content']['escala_tipos'];}
            if (isset($response['content']['funcionario_acao_1_funcionarios'])) {$this->funcionario_acao_1_funcionarios = $response['content']['funcionario_acao_1_funcionarios'];}
            if (isset($response['content']['ordem_servico_prioridades'])) {$this->ordem_servico_prioridades = $response['content']['ordem_servico_prioridades'];}
            if (isset($response['content']['ordem_servico_tipos'])) {$this->ordem_servico_tipos = $response['content']['ordem_servico_tipos'];}
            if (isset($response['content']['ordem_servico_status'])) {$this->ordem_servico_status = $response['content']['ordem_servico_status'];}
            if (isset($response['content']['formas_pagamentos'])) {$this->formas_pagamentos = $response['content']['formas_pagamentos'];}
            if (isset($response['content']['formas_pagamentos_status'])) {$this->formas_pagamentos_status = $response['content']['formas_pagamentos_status'];}
            if (isset($response['content']['veiculo_categorias'])) {$this->veiculo_categorias = $response['content']['veiculo_categorias'];}
            if (isset($response['content']['veiculo_combustiveis'])) {$this->veiculo_combustiveis = $response['content']['veiculo_combustiveis'];}
            if (isset($response['content']['veiculo_marcas'])) {$this->veiculo_marcas = $response['content']['veiculo_marcas'];}
            if (isset($response['content']['veiculo_modelos'])) {$this->veiculo_modelos = $response['content']['veiculo_modelos'];}
            if (isset($response['content']['veiculos'])) {$this->veiculos = $response['content']['veiculos'];}
            if (isset($response['content']['clientes_executivos'])) {$this->clientes_executivos = $response['content']['clientes_executivos'];}
            if (isset($response['content']['relatorios'])) {$this->relatorios = $response['content']['relatorios'];}
            if (isset($response['content']['mapas_pontos_tipos'])) {$this->mapas_pontos_tipos = $response['content']['mapas_pontos_tipos'];}
            if (isset($response['content']['ordens_servicos'])) {$this->ordens_servicos = $response['content']['ordens_servicos'];}
        }
    }

    /*
     * Função para retornar Botões para a coluna Ações da tabela de registros do CRUD
     */
    public function columnAction(string $id, $botoes=7)
    {
        //PARAN: $botoes
        //0: Nenhum Botão
        //1: Somente Visualização
        //2: Somente Alteração
        //3: Somente Exclusão
        //4: Visualização e Alteração
        //5: Visualização e Exclusão
        //6: Alteração e Exclusão
        //7: Visualização, Alteração e Exclusão
        //8: Visualização e Escalas

        //Montando Coluna Ação
        $btn = '<td class="text-center" style="vertical-align:top;"><div class="row">';

        if ($botoes == 1 or $botoes == 4 or $botoes == 5 or $botoes == 7 or $botoes == 8) {
            if (Permissoes::permissao(['show'])) {
                $btn .= '<div class="col-12 col-md-4"><button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Registro" onclick="crudView(' . $id . ');"><i class="fa fa-eye font-size-18"></i></button></div>';
            }
        }

        if ($botoes == 2 or $botoes == 4 or $botoes == 6 or $botoes == 7) {
            if (Permissoes::permissao(['edit'])) {
                $btn .= '<div class="col-12 col-md-4"><button type="button" class="btn btn-outline-primary text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar Registro" onclick="crudEdit(' . $id . ');"><i class="fas fa-pencil-alt font-size-18"></i></button></div>';
            }
        }

        if ($botoes == 3 or $botoes == 5 or $botoes == 6 or $botoes == 7) {
            if (Permissoes::permissao(['destroy'])) {
                $btn .= '<div class="col-12 col-md-4"><button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Registro" onclick="crudDelete(' . $id . ');"><i class="fa fa-trash-alt font-size-18"></i></button></div>';
            }
        }

        if ($botoes == 8) {
            if (Permissoes::permissao(['edit'])) {
                $btn .= '<div class="col-12 col-md-4"><button type="button" class="btn btn-outline-primary text-center btn-sm escalasBrigada" data-bs-toggle="tooltip" data-bs-placement="top" title="Escalas" data-id="'.$id.'"><i class="far fa-calendar-alt font-size-18"></i></button></div>';
            }
        }

        $btn .= '</div></td>';

        return $btn;
    }
}
