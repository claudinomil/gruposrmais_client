<?php

if (!function_exists('primeiraMaiuscula')) {
    function primeiraMaiuscula(?string $texto): string
    {
        if (empty($texto)) {return '';}

        $preposicoes = ['de','da','do','das','des','dos','a','e','o'];

        $palavras = explode(' ', mb_strtolower($texto));

        foreach ($palavras as $i => $palavra) {

            if (!in_array($palavra, $preposicoes)) {
                $palavras[$i] = mb_convert_case($palavra, MB_CASE_TITLE, "UTF-8");
            }

        }

        return implode(' ', $palavras);
    }
}

if (!function_exists('getDataFormatada')) {
    /*
    * Retornar data formatada
    * A) Recebe formatos de datas: 99/99/9999 ou 99-99-9999 ou 9999/99/99 ou 9999-99-99
    * B) Depois retorna essa data no formato pedido pelo usuário
    * @PARAM op=1 = recebe qualquer data e retorna 99/99/9999
    * @PARAM op=2 = recebe qualquer data e retorna 99-99-9999
    * @PARAM op=3 = recebe qualquer data e retorna 9999/99/99
    * @PARAM op=4 = recebe qualquer data e retorna 9999-99-99
    */
    function getDataFormatada(int $op, ?string $data='')
    {
        //Variáveis para formatar o retorno
        $dia = '';
        $mes = '';
        $ano = '';

        //Verificando recebimento da data
        if ($data == '') {
            $data = null;
        } else {
            //Retirando espaços
            $data = trim($data);
            $data = str_replace(" ", "", $data);

            //Formato: 9999-99-99
            if (is_numeric(substr($data, 0, 4)) and substr($data, 4, 1) == '-' and is_numeric(substr($data, 5, 2)) and substr($data, 7, 1) == '-' and is_numeric(substr($data, 8, 2))) {
                $dia = substr($data, 8, 2);
                $mes = substr($data, 5, 2);
                $ano = substr($data, 0, 4);
            }

            //Formato: 9999/99/99
            if (is_numeric(substr($data, 0, 4)) and substr($data, 4, 1) == '/' and is_numeric(substr($data, 5, 2)) and substr($data, 7, 1) == '/' and is_numeric(substr($data, 8, 2))) {
                $dia = substr($data, 8, 2);
                $mes = substr($data, 5, 2);
                $ano = substr($data, 0, 4);
            }

            //Formato: 99-99-9999
            if (is_numeric(substr($data, 0, 2)) and substr($data, 2, 1) == '-' and is_numeric(substr($data, 3, 2)) and substr($data, 5, 1) == '-' and is_numeric(substr($data, 6, 4))) {
                $dia = substr($data, 0, 2);
                $mes = substr($data, 3, 2);
                $ano = substr($data, 6, 4);
            }

            //Formato: 99/99/9999
            if (is_numeric(substr($data, 0, 2)) and substr($data, 2, 1) == '/' and is_numeric(substr($data, 3, 2)) and substr($data, 5, 1) == '/' and is_numeric(substr($data, 6, 4))) {
                $dia = substr($data, 0, 2);
                $mes = substr($data, 3, 2);
                $ano = substr($data, 6, 4);
            }
        }

        //Retorno
        if ($dia == '' or $mes == '' or $ano == '' or $dia == '00' or $mes == '00' or $ano == '0000') {
            $data = null;
        } else {
            //Retorna no formato (99/99/9999)
            if ($op == 1) {$data = $dia.'/'.$mes.'/'.$ano;}

            //Retorna no formato (99-99-9999)
            if ($op == 2) {$data = $dia.'-'.$mes.'-'.$ano;}

            //Retorna no formato (9999/99/99)
            if ($op == 3) {$data = $ano.'/'.$mes.'/'.$dia;}

            //Retorna no formato (9999-99-99)
            if ($op == 4) {$data = $ano.'-'.$mes.'-'.$dia;}
        }

        return $data;
    }
}

if (!function_exists('getCepFormatado')) {
    /*
    * Retorna CEP formatado
    * @PARAM op=1 = 99999-999
    * @PARAM op=2 = 99999999
    */
    function getCepFormatado(int $op, ?string $cep = '')
    {
        if (empty($cep)) {
            return null;
        }

        $cep = preg_replace('/\D/', '', trim($cep));

        if (strlen($cep) != 8) {
            return null;
        }

        if ($op == 1) {
            return substr($cep, 0, 5) . '-' . substr($cep, 5, 3);
        }

        if ($op == 2) {
            return $cep;
        }

        return null;
    }
}

if (!function_exists('getCpfFormatado')) {
    /*
    * Retorna CPF formatado
    * @PARAM op=1 = 999.999.999-99
    * @PARAM op=2 = 99999999999
    */
    function getCpfFormatado(int $op, ?string $cpf = '')
    {
        if (empty($cpf)) {
            return null;
        }

        $cpf = preg_replace('/\D/', '', trim($cpf));

        if (strlen($cpf) != 11) {
            return null;
        }

        if ($op == 1) {
            return substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
        }

        if ($op == 2) {
            return $cpf;
        }

        return null;
    }
}

if (!function_exists('getCnpjFormatado')) {
    /*
    * Retorna CNPJ formatado
    * @PARAM op=1 = 99.999.999/9999-99
    * @PARAM op=2 = 99999999999999
    */
    function getCnpjFormatado(int $op, ?string $cnpj = '')
    {
        if (empty($cnpj)) {
            return null;
        }

        $cnpj = preg_replace('/\D/', '', trim($cnpj));

        if (strlen($cnpj) != 14) {
            return null;
        }

        if ($op == 1) {
            return substr($cnpj, 0, 2) . '.' . substr($cnpj, 2, 3) . '.' . substr($cnpj, 5, 3) . '/' . substr($cnpj, 8, 4) . '-' . substr($cnpj, 12, 2);
        }

        if ($op == 2) {
            return $cnpj;
        }

        return null;
    }
}

if (!function_exists('getTelefoneFormatado')) {
    /*
    * Retorna telefone formatado
    * @PARAM op=1 = (99) 9999-9999
    * @PARAM op=2 = 99999999999
    */
    function getTelefoneFormatado(int $op, ?string $telefone = '')
    {
        if (empty($telefone)) {
            return null;
        }

        $telefone = preg_replace('/\D/', '', trim($telefone));

        if (strlen($telefone) != 10) {
            return null;
        }

        if ($op == 1) {
            return '(' . substr($telefone, 0, 2) . ') ' .
                substr($telefone, 2, 4) . '-' .
                substr($telefone, 6, 4);
        }

        if ($op == 2) {
            return $telefone;
        }

        return null;
    }
}

if (!function_exists('getCelularFormatado')) {
    /*
    * Retorna celular formatado
    * @PARAM op=1 = (99) 99999-9999
    * @PARAM op=2 = 99999999999
    */
    function getCelularFormatado(int $op, ?string $celular = '')
    {
        if (empty($celular)) {
            return null;
        }

        $celular = preg_replace('/\D/', '', trim($celular));

        if (strlen($celular) != 11) {
            return null;
        }

        if ($op == 1) {
            return '(' . substr($celular, 0, 2) . ') ' .
                substr($celular, 2, 5) . '-' .
                substr($celular, 7, 4);
        }

        if ($op == 2) {
            return $celular;
        }

        return null;
    }
}

if (!function_exists('getValorFormatado')) {
    /*
    * Retornar valor formatado
    * A) Recebe qualquer número e transforma ele para o formato 123456.78
    * B) Depois retorna esse número no formato pedido pelo usuário
    * @PARAM op=1 = recebe qualquer número e retorna 123456.78
    * @PARAM op=2 = recebe qualquer número e retorna 123.456,78
    * @PARAM op=3 = recebe qualquer número e retorna 123,456.78
    * @PARAM op=4 = recebe qualquer número e retorna 123456,78
    */
    function getValorFormatado(int $op, string $valor)
    {
        if ($valor == '') {
            $valor = 0;
        }

        //Retirando espaços
        $valor = trim($valor);
        $valor = str_replace(" ", "", $valor);

        //Montando um array com cada digito
        $dados = str_split($valor);

        //Guardar ultima posição de um ponto/virgula
        $ponto_virgula = 0;

        //Posição da casa decimal
        $posicao_casa_decimal = 0;

        //posição
        $posicao = 0;
        foreach ($dados as $dado) {
            //Verificando e guardando caso o dígito seja um ponto
            if ($dado == '.') {
                $ponto_virgula = 1;
                $posicao_casa_decimal = $posicao;
            }

            //Verificando e guardando caso o dígito seja uma vírgula
            if ($dado == ',') {
                $ponto_virgula = 2;
                $posicao_casa_decimal = $posicao;
            }

            $posicao++;
        }

        //Refazer valor retirando pontos/vírgulas nas separações de milhares
        $valor = '';

        //posição
        $posicao = 0;
        foreach ($dados as $dado) {
            //Se dígito for um ponto/vírgula
            if ($dado == '.' or $dado == ',') {
                //Se for o ponto/vírgula da casa decimal (concatenar ao valor)
                if ($posicao_casa_decimal == $posicao) {$valor .= $dado;}
            } else {
                //concatenar ao valor
                $valor .= $dado;
            }

            $posicao++;
        }

        //Se valor tem vírgula trocar por ponto
        if ($ponto_virgula == 2) {
            $valor = str_replace(',', '.', $valor);
        }

        //Retorna no formato (123456.78)
        if ($op == 1) {
            $valor = number_format($valor, '2', '.', '');
        }

        //Retorna no formato (123.456,78)
        if ($op == 2) {
            $valor = number_format($valor, '2', ',', '.');
        }

        //Retorna no formato (123,456.78)
        if ($op == 3) {
            $valor = number_format($valor, '2', '.', ',');
        }

        //Retorna no formato (123456,78)
        if ($op == 4) {
            $valor = number_format($valor, '2', ',', '');
        }

        return $valor;
    }
}
if (!function_exists('getDiferencaDiasHoje')) {
    // Retorna a diferença em dias para data de hoje
    // @PARAM data : yyyy-mm-dd
    function getDiferencaDiasHoje(?string $data): int
    {
        if (empty($data)) {
            return 0;
        }

        $dataInformada = new DateTime($data);
        $hoje = new DateTime();

        $dataInformada->setTime(0, 0, 0);
        $hoje->setTime(0, 0, 0);

        return (int) $hoje->diff($dataInformada)->format('%r%a');
    }
}
