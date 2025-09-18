<?php

namespace App\Services;

use App\Facades\ApiData;
use App\Facades\QRCodeFacade;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

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
     * Alterar Idioma da Sessao do Usuário Logado
     */
    public function setUserSessionIdioma()
    {
        // Salva o idioma na sessão
        App::setLocale(session('se_userLogged_idioma'));
        Session::put('locale', session('se_userLogged_idioma'));
    }

    /*
     * Gerar QRCode para Cartão Emergencial que mostra dados de Saúde para Atendimento Emergencial
     */
    public function setGerarQRCodesCartoesEmergenciais()
    {
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

    function traduzirTextoGoogle($texto, $idiomaOrigem = 'pt', $idiomaDestino = 'en') {
        if (empty($texto)) {
            return '';
        }

        $apiKey = 'AIzaSyBGeQFWQ6kFJ9hnXvogPLtmYXJHVuM6U78';
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

    public function formatarCNPJ($cnpj) {
        // Remove qualquer caractere que não seja número
        $cnpj = preg_replace('/\D/', '', $cnpj);

        // Verifica se tem 14 dígitos
        if (strlen($cnpj) !== 14) {
            return $cnpj; // ou retornar null, lançar exceção etc.
        }

        // Formata: 00.000.000/0000-00
        return preg_replace('/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/', '$1.$2.$3/$4-$5', $cnpj);
    }

    public function formatarCPF($cpf) {
        $cpf = preg_replace('/\D/', '', $cpf);
        if (strlen($cpf) !== 11) return $cpf;

        return preg_replace('/^(\d{3})(\d{3})(\d{3})(\d{2})$/', '$1.$2.$3-$4', $cpf);
    }

    public function consultarCNPJ($cnpj)
    {
        $url = "https://receitaws.com.br/v1/cnpj/{$cnpj}";

        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->get($url);

        return response()->json($response->json());
    }
}
