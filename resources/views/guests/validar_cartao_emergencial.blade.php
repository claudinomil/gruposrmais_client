<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <title> {{env('APP_NAME')}} | Cartão Emergencial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- App favicon -->
        <link rel="shortcut icon" href="{{ asset('build/assets/images/image_favicon.png') }}" id="appFavicon">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
            }
            h2 {
                background-color: #f2f2f2;
                padding: 10px;
                border-left: 5px solid #007BFF;
            }
            label {
                display: block;
                margin-top: 10px;
            }
            input[type="text"],
            input[type="email"],
            input[type="date"],
            input[type="number"],
            textarea {
                width: 100%;
                padding: 6px;
                margin-top: 4px;
                box-sizing: border-box;
            }
            .checkbox-group {
                margin: 10px 0;
            }
            .section {
                border-top: 1px solid #ccc;
                margin-top: 30px;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <?php
        //Informações Pessoais''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $nome_completo = $content['name'];
        $data_nascimento = $content['data_nascimento'];
        $nacionalidade = $content['nacionalidadeName'];
        $cpf = $content['cpf'];
		$rg = $content['personal_identidade_numero'].' - '.$content['identidadeOrgaoName'].' - '.$content['identidadeEstadoName'];

		$endereco = $content['logradouro'];
		if ($content['numero'] != '') {$endereco .= ', '.$content['numero'];}
		if ($content['complemento'] != '') {$endereco .= ', '.$content['complemento'];}
		$endereco .= ' - '.$content['bairro'].' - '.$content['localidade'].' - '.$content['uf'].' - '.$content['cep'];

		$telefone_celular = '';
		if ($content['telefone_1'] != '') {
			if ($telefone_celular != '') {$telefone_celular .= ' / ';}
			$telefone_celular .= $content['telefone_1'];
		}
		if ($content['telefone_2'] != '') {
			if ($telefone_celular != '') {$telefone_celular .= ' / ';}
			$telefone_celular .= $content['telefone_2'];
		}
		if ($content['celular_1'] != '') {
			if ($telefone_celular != '') {$telefone_celular .= ' / ';}
			$telefone_celular .= $content['celular_1'];
		}
		if ($content['celular_2'] != '') {
			if ($telefone_celular != '') {$telefone_celular .= ' / ';}
			$telefone_celular .= $content['celular_2'];
		}

		$email = $content['email'];
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Dados Antropométricos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$tipo_sanguineo_fator_rh = $content['tipo_sanguineo'].' '.$content['fator_rh'];
		$altura = $content['altura'];
		$peso = $content['peso'];
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Histórico Médico - Doença crônica diagnosticada'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $doenca_cronica_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';

        if ($content['doenca_diabetes'] == 1) {
			$doenca_diabetes_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_diabetes_hide = '';
			$doenca_cronica_nao = '';
		} else {
			$doenca_diabetes_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_diabetes_hide = 'style="display:none;"';
		}
		if ($content['doenca_hipertensao'] == 1) {
			$doenca_hipertensao_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_hipertensao_hide = '';
			$doenca_cronica_nao = '';
		} else {
			$doenca_hipertensao_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_hipertensao_hide = 'style="display:none;"';
		}
		if ($content['doenca_asma'] == 1) {
			$doenca_asma_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_asma_hide = '';
			$doenca_cronica_nao = '';
		} else {
			$doenca_asma_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_asma_hide = 'style="display:none;"';
		}
		if ($content['doenca_renal'] == 1) {
			$doenca_renal_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_renal_hide = '';
			$doenca_cronica_nao = '';
		} else {
			$doenca_renal_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_renal_hide = 'style="display:none;"';
		}
		if ($content['doenca_cardiaca'] == 1) {
			$doenca_cardiaca_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_cardiaca_hide = '';
			$doenca_cronica_nao = '';
		} else {
			$doenca_cardiaca_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_cardiaca_hide = 'style="display:none;"';
		}
		if ($content['doenca_outras'] != '') {
			$doenca_outras_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_outras_hide = '';
			$doenca_cronica_nao = '';
		} else {
			$doenca_outras_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_outras_hide = 'style="display:none;"';
		}
		$doenca_outras = $content['doenca_outras'];
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Histórico Médico - Possui deficiência ou condição especial?'''''''''''''''''''''''''''''''''''''''''''''''''''
		$deficiencia_qual = $content['deficiencia_qual'];
		if ($deficiencia_qual != '') {
			$deficiencia_qual_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$deficiencia_qual_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$deficiencia_qual_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$deficiencia_qual_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Histórico Médico - Já teve alguma cirurgia?'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$cirurgia_quais_quando = $content['cirurgia_quais_quando'];
		if ($cirurgia_quais_quando != '') {
			$cirurgia_quais_quando_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$cirurgia_quais_quando_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$cirurgia_quais_quando_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$cirurgia_quais_quando_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Histórico Médico - Já foi hospitalizado(a)?'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $hospitalizado_quando_porque = $content['hospitalizado_quando_porque'];
		if ($hospitalizado_quando_porque != '') {
			$hospitalizado_quando_porque_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$hospitalizado_quando_porque_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$hospitalizado_quando_porque_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$hospitalizado_quando_porque_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Histórico Médico - Convulsões ou epilepsia?'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$convulsoes_epilepsia_ultimo_episodio = $content['convulsoes_epilepsia_ultimo_episodio'];
		if ($convulsoes_epilepsia_ultimo_episodio != '') {
			$convulsoes_epilepsia_ultimo_episodio_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$convulsoes_epilepsia_ultimo_episodio_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$convulsoes_epilepsia_ultimo_episodio_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$convulsoes_epilepsia_ultimo_episodio_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Histórico Médico - Alergia?'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$alergia_medicamentos_alimentos_substancias = $content['alergia_medicamentos_alimentos_substancias'];
		if ($alergia_medicamentos_alimentos_substancias != '') {
			$alergia_medicamentos_alimentos_substancias_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$alergia_medicamentos_alimentos_substancias_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$alergia_medicamentos_alimentos_substancias_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$alergia_medicamentos_alimentos_substancias_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Histórico Médico - Medicação contínua?''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$medicacao_continua_quais_dosagem_horarios = $content['medicacao_continua_quais_dosagem_horarios'];
		if ($medicacao_continua_quais_dosagem_horarios != '') {
			$medicacao_continua_quais_dosagem_horarios_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$medicacao_continua_quais_dosagem_horarios_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$medicacao_continua_quais_dosagem_horarios_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$medicacao_continua_quais_dosagem_horarios_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Histórico Médico - Possui plano de saúde?'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$plano_saude_qual = $content['plano_saude_qual'];
		if ($plano_saude_qual != '') {
			$plano_saude_qual_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$plano_saude_qual_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$plano_saude_qual_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$plano_saude_qual_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Hábitos e Estilo de Vida - Você fuma?'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$fumante = $content['fumante'];
		if ($fumante == '1') {
			$fumante_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$fumante_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$fumante_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$fumante_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Hábitos e Estilo de Vida - Você consome bebidas alcoólicas?'''''''''''''''''''''''''''''''''''''''''''''''''''
		$bebida_alcoolica = $content['bebida_alcoolica'];
		if ($bebida_alcoolica == '1') {
			$bebida_alcoolica_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$bebida_alcoolica_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$bebida_alcoolica_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$bebida_alcoolica_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Hábitos e Estilo de Vida - Pratica atividades físicas regularmente?'''''''''''''''''''''''''''''''''''''''''''
		$atividade_fisica = $content['atividade_fisica'];
		if ($atividade_fisica == '1') {
			$atividade_fisica_nao = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$atividade_fisica_sim = '<i class="fa fa-check" style="color: #28a745;"></i>';
		} else {
			$atividade_fisica_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$atividade_fisica_sim = '<i class="fa fa-times" style="color: #a92222;"></i>';
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Histórico Familiar - Doenças na família:''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$doenca_familiar_nao = '<i class="fa fa-check" style="color: #28a745;"></i>';

		if ($content['doenca_familia_diabetes'] == 1) {
			$doenca_familia_diabetes_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_familia_diabetes_hide = '';
			$doenca_familiar_nao = '';
		} else {
			$doenca_familia_diabetes_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_familia_diabetes_hide = 'style="display:none;"';
		}
		if ($content['doenca_familia_hipertensao'] == 1) {
			$doenca_familia_hipertensao_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_familia_hipertensao_hide = '';
			$doenca_familiar_nao = '';
		} else {
			$doenca_familia_hipertensao_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_familia_hipertensao_hide = 'style="display:none;"';
		}
		if ($content['doenca_familia_epilepsia'] == 1) {
			$doenca_familia_epilepsia_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_familia_epilepsia_hide = '';
			$doenca_familiar_nao = '';
		} else {
			$doenca_familia_epilepsia_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_familia_epilepsia_hide = 'style="display:none;"';
		}
		if ($content['doenca_familia_cardiaca'] == 1) {
			$doenca_familia_cardiaca_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_familia_cardiaca_hide = '';
			$doenca_familiar_nao = '';
		} else {
			$doenca_familia_cardiaca_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_familia_cardiaca_hide = 'style="display:none;"';
		}
		if ($content['doenca_familia_cancer'] == 1) {
			$doenca_familia_cancer_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_familia_cancer_hide = '';
			$doenca_familiar_nao = '';
		} else {
			$doenca_familia_cancer_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_familia_cancer_hide = 'style="display:none;"';
		}
		if ($content['doenca_familia_outras'] == 1) {
			$doenca_familia_outras_checked = '<i class="fa fa-check" style="color: #28a745;"></i>';
			$doenca_familia_outras_hide = '';
			$doenca_familiar_nao = '';
		} else {
			$doenca_familia_outras_checked = '<i class="fa fa-times" style="color: #a92222;"></i>';
			$doenca_familia_outras_hide = 'style="display:none;"';
		}
		$doenca_familia_outras = $content['doenca_familia_outras'];
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Contato de Emergência'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		if ($content['contato_1_telefone'] != '' or $content['contato_1_celular'] != '') {
			$contato_nome_principal = $content['contato_1_nome'];
			$contato_parentesco_principal = $content['contato_1_parentesco'];
			$contato_telefone_principal = $content['contato_1_telefone'];
			$contato_celular_principal = $content['contato_1_celular'];

			$contato_nome_alternativo = $content['contato_2_nome'];
			$contato_parentesco_alternativo = $content['contato_2_parentesco'];
			$contato_telefone_alternativo = $content['contato_2_telefone'];
			$contato_celular_alternativo = $content['contato_2_celular'];
		} else {
			$contato_nome_principal = $content['contato_2_nome'];
			$contato_parentesco_principal = $content['contato_2_parentesco'];
			$contato_telefone_principal = $content['contato_2_telefone'];
			$contato_celular_principal = $content['contato_2_celular'];

			$contato_nome_alternativo = '';
			$contato_parentesco_alternativo = '';
			$contato_telefone_alternativo = '';
			$contato_celular_alternativo = '';
		}

		if ($contato_telefone_principal != '') {
			if ($contato_celular_principal != '') {$contato_telefone_principal .= ' / '.$contato_celular_principal;}
		} else {
			$contato_telefone_principal = $contato_celular_principal;
		}

		$contato_alternativo = '';

		if ($contato_telefone_alternativo != '' or $contato_celular_alternativo != '') {
			if ($contato_nome_alternativo != '') {$contato_alternativo = $contato_nome_alternativo;}
			if ($contato_parentesco_alternativo != '') {
				if ($contato_alternativo != '') {$contato_alternativo .= ' / ';}
				$contato_alternativo .= $contato_parentesco_alternativo;
			}
			if ($contato_telefone_alternativo != '') {
				if ($contato_alternativo != '') {$contato_alternativo .= ' / ';}
				$contato_alternativo .= $contato_telefone_alternativo;
			}
			if ($contato_celular_alternativo != '') {
				if ($contato_alternativo != '') {$contato_alternativo .= ' / ';}
				$contato_alternativo .= $contato_celular_alternativo;
			}
		}
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		?>

        <h1>Formulário de Informações de Emergência Médica</h1>

        <div class="section">
            <h2>Informações Pessoais</h2>
            <label>Nome completo: <input type="text" value="{{ $nome_completo }}" disabled></label>
            <label>Data de nascimento: <input type="text" value="{{ $data_nascimento }}" disabled></label>
            <label>Nacionalidade: <input type="text" value="{{ $nacionalidade }}" disabled></label>
            <label>CPF: <input type="text" value="{{ $cpf }}" disabled></label>
            <label>RG: <input type="text" value="{{ $rg }}" disabled></label>
            <label>Endereço completo: <input type="text" value="{{ $endereco }}" disabled></label>
            <label>Telefone / Celular: <input type="text" value="{{ $telefone_celular }}" disabled></label>
            <label>Endereço de e-mail: <input type="text" value="{{ $email }}" disabled></label>
        </div>

        <div class="section">
            <h2>Dados Antropométricos</h2>
            <label>Tipo sanguíneo / Fator RH: <input type="text" value="{{ $tipo_sanguineo_fator_rh }}" disabled></label>
            <label>Altura (m): <input type="text" value="{{ $altura }}" disabled></label>
            <label>Peso (kg): <input type="text" value="{{ $peso }}" disabled></label>
        </div>

        <div class="section">
            <h2>Histórico Médico</h2>

            <label>1. Doença crônica diagnosticada:</label>
            @if($doenca_cronica_nao != '')
                <label>{!! $doenca_cronica_nao !!} Não</label>
            @else
                <div class="checkbox-group">
                    <label {!! $doenca_diabetes_hide !!}>{!! $doenca_diabetes_checked !!} Diabetes</label>
                    <label {!! $doenca_hipertensao_hide !!}>{!! $doenca_hipertensao_checked !!} Hipertensão</label>
                    <label {!! $doenca_asma_hide !!}>{!! $doenca_asma_checked !!} Asma</label>
                    <label {!! $doenca_renal_hide !!}>{!! $doenca_renal_checked !!} Doença renal</label>
                    <label {!! $doenca_cardiaca_hide !!}>{!! $doenca_cardiaca_checked !!} Doença cardíaca</label>
                    <label {!! $doenca_outras_hide !!}>{!! $doenca_outras_checked !!} Outra(s): <input type="text" value="{{ $doenca_outras }}" disabled></label>
                </div>
            @endif

            <label>2. Possui deficiência ou condição especial?</label>
            @if($deficiencia_qual == '')
                <label>{!! $deficiencia_qual_nao !!} Não</label>
            @else
                <label>{!! $deficiencia_qual_sim !!} Sim. Qual? <input type="text" value="{{ $deficiencia_qual }}" disabled></label>
            @endif

            <label>3. Já teve alguma cirurgia?</label>
            @if($cirurgia_quais_quando == '')
                <label>{!! $cirurgia_quais_quando_nao !!} Não</label>
            @else
                <label>{!! $cirurgia_quais_quando_sim !!} Sim. Qual(is) e quando? <input type="text" value="{{ $cirurgia_quais_quando }}" disabled></label>
            @endif

            <label>4. Já foi hospitalizado(a)?</label>
            @if($hospitalizado_quando_porque == '')
                <label>{!! $hospitalizado_quando_porque_nao !!} Não</label>
            @else
                <label>{!! $hospitalizado_quando_porque_sim !!} Sim. Quando e por quê? <input type="text" value="{{ $hospitalizado_quando_porque }}" disabled></label>
            @endif

            <label>5. Convulsões ou epilepsia?</label>
            @if($convulsoes_epilepsia_ultimo_episodio == '')
                <label>{!! $convulsoes_epilepsia_ultimo_episodio_nao !!} Não</label>
            @else
                <label>{!! $convulsoes_epilepsia_ultimo_episodio_sim !!} Sim. Último episódio: <input type="text" value="{{ $convulsoes_epilepsia_ultimo_episodio }}" disabled></label>
            @endif

            <label>6. Alergia?</label>
            @if($alergia_medicamentos_alimentos_substancias == '')
                <label>{!! $alergia_medicamentos_alimentos_substancias_nao !!} Não</label>
            @else
                <label>{!! $alergia_medicamentos_alimentos_substancias_sim !!} Sim. A quais medicamentos, alimentos ou substâncias? <input type="text" value="{{ $alergia_medicamentos_alimentos_substancias }}" disabled></label>
            @endif

            <label>7. Medicação contínua?</label>
            @if($medicacao_continua_quais_dosagem_horarios == '')
                <label>{!! $medicacao_continua_quais_dosagem_horarios_nao !!} Não</label>
            @else
                <label>{!! $medicacao_continua_quais_dosagem_horarios_sim !!} Sim. Qual(is), dosagem e horários: <input type="text" value="{{ $medicacao_continua_quais_dosagem_horarios }}" disabled></label>
            @endif

            <label>8. Possui plano de saúde?</label>
            @if($plano_saude_qual == '')
                <label>{!! $plano_saude_qual_nao !!} Não</label>
            @else
                <label>{!! $plano_saude_qual_sim !!} Sim. Nome do plano: <input type="text" value="{{ $plano_saude_qual }}" disabled></label>
            @endif
        </div>

        <div class="section">
            <h2>Hábitos e Estilo de Vida</h2>
            <label>9. Você fuma?</label>
            @if($fumante == '1')
                <label>{!! $fumante_sim !!} Sim</label>
            @else
                <label>{!! $fumante_nao !!} Não</label>
            @endif

            <label>10. Você consome bebidas alcoólicas?</label>
            @if($bebida_alcoolica == '1')
                <label>{!! $bebida_alcoolica_sim !!} Sim</label>
            @else
                <label>{!! $bebida_alcoolica_nao !!} Não</label>
            @endif

            <label>11. Pratica atividades físicas regularmente?</label>
            @if($atividade_fisica == '1')
                <label>{!! $atividade_fisica_sim !!} Sim</label>
            @else
                <label>{!! $atividade_fisica_nao !!} Não</label>
            @endif
        </div>

        <div class="section">
            <h2>Histórico Familiar</h2>
            <label>12. Doenças na família:</label>
            @if($doenca_familiar_nao != '')
                <label>{!! $doenca_familiar_nao !!} Não</label>
            @else
                <div class="checkbox-group">
                    <label {!! $doenca_familia_cardiaca_hide !!}>{!! $doenca_familia_cardiaca_checked !!} Doença cardíaca</label>
                    <label {!! $doenca_familia_diabetes_hide !!}>{!! $doenca_familia_diabetes_checked !!} Diabetes</label>
                    <label {!! $doenca_familia_hipertensao_hide !!}>{!! $doenca_familia_hipertensao_checked !!} Hipertensão</label>
                    <label {!! $doenca_familia_epilepsia_hide !!}>{!! $doenca_familia_epilepsia_checked !!} Epilepsia</label>
                    <label {!! $doenca_familia_cancer_hide !!}>{!! $doenca_familia_cancer_checked !!} Câncer</label>
                    <label {!! $doenca_familia_outras_hide !!}>{!! $doenca_familia_outras_checked !!} Outras: <input type="text" value="{{ $doenca_familia_outras }}" disabled></label>
                </div>
            @endif
        </div>

        <div class="section">
            <h2>Contato de Emergência</h2>
            <label>13. Nome completo do contato de emergência: <input type="text" value="{{ $contato_nome_principal }}" disabled></label>
            <label>Telefone: <input type="text" value="{{ $contato_telefone_principal }}" disabled></label>
            <label>Grau de parentesco: <input type="text" value="{{ $contato_parentesco_principal }}" disabled></label>
            <label>Outro contato alternativo (opcional): <input type="text" value="{{ $contato_alternativo }}" disabled></label>
        </div>

    </body>
</html>
