<?php

namespace App\Services;

use App\Facades\ApiData;
use App\Facades\QRCodeFacade;

class SuporteService
{
    /*
     * Gravar Sessão de onde o Usuário está acessando 'access_device' (mobile, tablet, desktop)
     */
    public function setUserAcessDevice()
    {
        try {
            $acess_device = $this->getDevice();
            session(['access_device' => $acess_device]);
        } catch (\Exception $e) {
            session(['access_device' => 'desktop']);
        }
    }

    /*
     * Retornar de onde está vindo o acesso (mobile, tablet, desktop)
     */
    public function getDevice()
    {
        $isMob = is_numeric(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]), "mobile"));
        $isTab = is_numeric(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]), "tablet"));
        $isDesk = !$isMob && !$isTab;

        if ($isMob) {return 'mobile';}
        if ($isTab) {return 'tablet';}
        if ($isDesk) {return 'desktop';}
    }

    /*
     * Buscar dados de Configuração do Usuário logado (Conforme Empresa escolhida)
     */
    public function setUserConfiguracao($empresa_id)
    {
        try {
            //Buscando dados Api_Data() - UsuárioLogado
            $response = ApiData::getData(10, 'users/user/logged/data/'.$empresa_id, '', '', '', '');
            //dd($response);
            //Gravar Session com dados de Configuração
            session(['userLogged_empresa_id' => $response['content']['userData']['empresa_id']]);
            session(['userLogged_empresa' => $response['content']['userData']['empresa']]);
            session(['userLogged_grupo_id' => $response['content']['userData']['grupo_id']]);
            session(['userLogged_situacao_id' => $response['content']['userData']['situacao_id']]);
            session(['userLogged_sistema_acesso_id' => $response['content']['userData']['sistema_acesso_id']]);
            session(['userLogged_layout_mode' => $response['content']['userData']['layout_mode']]);
            session(['userLogged_layout_style' => $response['content']['userData']['layout_style']]);

            //Verificar Dado de Configuração do Usuário - empresa_id=0: Usuário sem Configurações de Empresa
            if (session('userLogged_empresa_id') == 0) {abort(500, 'Permissão Negada.<br>Usuário sem acesso para essa Empresa.');}

            //Verificar Dado de Configuração do Usuário - grupo_id=0: Usuário sem Grupo
            if (session('userLogged_grupo_id') == 0) {abort(500, 'Permissão Negada.<br>Usuário sem Grupo de Acesso.');}

            //Verificar Dado de Configuração do Usuário - situacao_id=0: Usuário sem Situação
            if (session('userLogged_situacao_id') == 0) {abort(500, 'Permissão Negada.<br>Usuário sem Situação.');}

            //Verificar Dado de Configuração do Usuário - situacao_id=2: Usuário Bloqueado
            if (session('userLogged_situacao_id') == 2) {abort(500, 'Permissão Negada.<br>Usuário Bloqueado.');}

            //Verificar Dado de Configuração do Usuário - sistema_acesso_id=0: Usuário sem Sistema de Acesso
            if (session('userLogged_sistema_acesso_id') == 0) {abort(500, 'Permissão Negada.<br>Usuário sem Sistema de Acesso.');}

            //Verificar Dado de Configuração do Usuário - layout_mode=0: Usuário sem Layout Mode
            if (session('userLogged_layout_mode') == 0) {abort(500, 'Permissão Negada.<br>Usuário sem Layout Mode.');}

            //Verificar Dado de Configuração do Usuário - layout_style=0: Usuário sem Layout Style
            if (session('userLogged_layout_style') == 0) {abort(500, 'Permissão Negada.<br>Usuário sem Layout Style.');}

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /*
     * Gerar QRCode para Cartão Emergencial que mostra dados de Saúde para Atendimento Emergencial
     */
    public function setGerarQRCodesCartoesEmergenciais()
    {
        //$url = 'http://192.168.0.207/gruposrmais-client/public/';
        $url = env('APP_URL');

        //Clientes Executivos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $clientes_executivos = ApiData::getData(10, 'clientes_executivos/cartoes_emergenciais/registros', '', '', '', '');
        $clientes_executivos = $clientes_executivos->json();

        foreach ($clientes_executivos as $clientes_executivo) {
            if (!file_exists('build/assets/qrcodes/clientes_executivos/qrcode_cartao_emergencial_pt_'.$clientes_executivo['id'].'.png')) {
                //Gerar QRCode PNG (Português)
                $label_text = '';
                $code_content = $url . '/guests/validar_cartao_emergencial/clientes_executivos/pt/' . $clientes_executivo['id'];
                $save_destino = 'build/assets/qrcodes/clientes_executivos/';
                $save_name = 'qrcode_cartao_emergencial_pt_' . $clientes_executivo['id'] . '.png';

                QRCodeFacade::label($label_text)->code($code_content, 300, 0, 0, 0, 0, 255, 255, 255)->save($save_destino, $save_name);

                //Gerar QRCode PNG (Inglês)
                $label_text = '';
                $code_content = $url . '/guests/validar_cartao_emergencial/clientes_executivos/en/' . $clientes_executivo['id'];
                $save_destino = 'build/assets/qrcodes/clientes_executivos/';
                $save_name = 'qrcode_cartao_emergencial_en_' . $clientes_executivo['id'] . '.png';

                QRCodeFacade::label($label_text)->code($code_content, 300, 0, 0, 0, 0, 255, 255, 255)->save($save_destino, $save_name);
            }
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Funcionários''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $funcionarios = ApiData::getData(10, 'funcionarios/cartoes_emergenciais/registros', '', '', '', '');
        $funcionarios = $funcionarios->json();

        foreach ($funcionarios as $funcionario) {
            if (!file_exists('build/assets/qrcodes/funcionarios/qrcode_cartao_emergencial_pt_'.$funcionario['id'].'.png')) {
                //Gerar QRCode PNG (Português)
                $label_text = '';
                $code_content = $url . '/guests/validar_cartao_emergencial/funcionarios/pt/' . $funcionario['id'];
                $save_destino = 'build/assets/qrcodes/funcionarios/';
                $save_name = 'qrcode_cartao_emergencial_pt_' . $funcionario['id'] . '.png';

                QRCodeFacade::label($label_text)->code($code_content, 300, 0, 0, 0, 0, 255, 255, 255)->save($save_destino, $save_name);

                //Gerar QRCode PNG (Inglês)
                $label_text = '';
                $code_content = $url . '/guests/validar_cartao_emergencial/funcionarios/en/' . $funcionario['id'];
                $save_destino = 'build/assets/qrcodes/funcionarios/';
                $save_name = 'qrcode_cartao_emergencial_en_' . $funcionario['id'] . '.png';

                QRCodeFacade::label($label_text)->code($code_content, 300, 0, 0, 0, 0, 255, 255, 255)->save($save_destino, $save_name);
            }
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }

    /*
     * Gerar QRCode para Cliente Serviço
     * Mostra dados do Cliente Serviço, Escala e Rondas
     */
    public function getClienteServicoQRCodeBrigadaInformacoes($cliente_servico_id)
    {
        $label_text = 'Brigada Informações';
        $code_content = env('APP_URL') . '/qrcodes/clientes_servicos/qrcode_brigada_informacoes/' . $cliente_servico_id;
        $save_destino = 'build/assets/qrcodes/clientes_servicos/';
        $save_name = 'qrcode_brigada_informacoes_' . $cliente_servico_id . '.png';

        QRCodeFacade::label($label_text)->logo()->code($code_content)->save($save_destino, $save_name);
    }

    /*
     * Gerar QRCode para Cliente Serviço
     * Registra Chegada e Saída do Brigadista no local
     * Realizar Rondas
     */
    public function getClienteServicoQRCodeBrigadaEscalas($cliente_servico_id)
    {
        $label_text = 'Brigada Serviço';
        $code_content = env('APP_URL') . '/qrcodes/clientes_servicos/qrcode_brigada_escalas/' . $cliente_servico_id;
        $save_destino = 'build/assets/qrcodes/clientes_servicos/';
        $save_name = 'qrcode_brigada_escalas_' . $cliente_servico_id . '.png';

        QRCodeFacade::label($label_text)->logo()->code($code_content)->save($save_destino, $save_name);
    }

    function traduzirTextoGoogle($texto, $idiomaOrigem = 'pt', $idiomaDestino = 'en') {
        if (empty($texto)) {
            return '';
        }

        $apiKey = 'AIzaSyAvEtoAQmil8RS2Gcl9csltgrVjdbnTHqQ'; // Substitua pela sua chave da API
        $url = 'https://translation.googleapis.com/language/translate/v2?key=' . $apiKey;

        $postData = array(
            'q' => $texto,
            'source' => $idiomaOrigem,
            'target' => $idiomaDestino,
            'format' => 'text'
        );

        $headers = array(
            'Content-Type: application/json'
        );

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            curl_close($ch);
            return null;
        }

        curl_close($ch);

        $data = json_decode($response, true);

        if (isset($data['data']['translations'][0]['translatedText'])) {
            return $data['data']['translations'][0]['translatedText'];
        } else {
            return null;
        }
    }
}
