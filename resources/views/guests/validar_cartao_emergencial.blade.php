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

        <script>
            function xxyy(dado) {
            	return dado+'_###';
            }
        </script>
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

        <h1>{{ $traducao === 'en' ? 'Medical Emergency Information Form' : __('Medical Emergency Information Form') }}</h1>

        <div class="section">
            <h2>{{ $traducao === 'en' ? 'Personal Information' : __('Personal Information') }}</h2>
            <label>{{ $traducao === 'en' ? 'Full Name:' : __('Full Name:') }} <input type="text" value="{{ $nome_completo }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Date of Birth:' : __('Date of Birth:') }} <input type="text" value="{{ $data_nascimento }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Nationality:' : __('Nationality:') }} <input type="text" value="{{ $nacionalidade }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'CPF:' : __('CPF:') }} <input type="text" value="{{ $cpf }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'ID:' : __('ID:') }} <input type="text" value="{{ $rg }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Full Address:' : __('Full Address:') }} <input type="text" value="{{ $endereco }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Phone / Mobile:' : __('Phone / Mobile:') }} <input type="text" value="{{ $telefone_celular }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Email Address:' : __('Email Address:') }} <input type="text" value="{{ $email }}" disabled></label>
        </div>

        <div class="section">
            <h2>{{ $traducao === 'en' ? 'Anthropometric Data' : __('Anthropometric Data') }}</h2>
            <label>{{ $traducao === 'en' ? 'Blood Type / Rh Factor:' : __('Blood Type / Rh Factor:') }} <input type="text" value="{{ $tipo_sanguineo_fator_rh }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Height (m):' : __('Height (m):') }} <input type="text" value="{{ $altura }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Weight (kg):' : __('Weight (kg):') }} <input type="text" value="{{ $peso }}" disabled></label>
        </div>
        <div class="section">
            <h2>{{ $traducao === 'en' ? 'Medical History' : __('Medical History') }}</h2>

            <label>{{ $traducao === 'en' ? '1. Diagnosed Chronic Disease:' : __('1. Diagnosed Chronic Disease:') }}</label>
            @if($doenca_cronica_nao != '')
                <label>{!! $doenca_cronica_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <div class="checkbox-group">
                    <label {!! $doenca_diabetes_hide !!}>{!! $doenca_diabetes_checked !!} {{ $traducao === 'en' ? 'Diabetes' : __('Diabetes') }}</label>
                    <label {!! $doenca_hipertensao_hide !!}>{!! $doenca_hipertensao_checked !!} {{ $traducao === 'en' ? 'Hypertension' : __('Hypertension') }}</label>
                    <label {!! $doenca_asma_hide !!}>{!! $doenca_asma_checked !!} {{ $traducao === 'en' ? 'Asthma' : __('Asthma') }}</label>
                    <label {!! $doenca_renal_hide !!}>{!! $doenca_renal_checked !!} {{ $traducao === 'en' ? 'Kidney Disease' : __('Kidney Disease') }}</label>
                    <label {!! $doenca_cardiaca_hide !!}>{!! $doenca_cardiaca_checked !!} {{ $traducao === 'en' ? 'Heart Disease' : __('Heart Disease') }}</label>
                    <label {!! $doenca_outras_hide !!}>{!! $doenca_outras_checked !!} {{ $traducao === 'en' ? 'Other(s):' : __('Other(s):') }} <input type="text" value="{{ $doenca_outras }}" disabled></label>
                </div>
            @endif

            <label>{{ $traducao === 'en' ? '2. Do you have a disability or special condition?' : __('2. Do you have a disability or special condition?') }}</label>
            @if($deficiencia_qual == '')
                <label>{!! $deficiencia_qual_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $deficiencia_qual_sim !!} {{ $traducao === 'en' ? 'Yes. Which one?' : __('Yes. Which one?') }} <input type="text" value="{{ $deficiencia_qual }}" disabled></label>
            @endif

            <label>{{ $traducao === 'en' ? '3. Have you ever had surgery?' : __('3. Have you ever had surgery?') }}</label>
            @if($cirurgia_quais_quando == '')
                <label>{!! $cirurgia_quais_quando_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $cirurgia_quais_quando_sim !!} {{ $traducao === 'en' ? 'Yes. Which one(s) and when?' : __('Yes. Which one(s) and when?') }} <input type="text" value="{{ $cirurgia_quais_quando }}" disabled></label>
            @endif

            <label>{{ $traducao === 'en' ? '4. Have you ever been hospitalized?' : __('4. Have you ever been hospitalized?') }}</label>
            @if($hospitalizado_quando_porque == '')
                <label>{!! $hospitalizado_quando_porque_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $hospitalizado_quando_porque_sim !!} {{ $traducao === 'en' ? 'Yes. When and why?' : __('Yes. When and why?') }} <input type="text" value="{{ $hospitalizado_quando_porque }}" disabled></label>
            @endif

            <label>{{ $traducao === 'en' ? '5. Seizures or epilepsy?' : __('5. Seizures or epilepsy?') }}</label>
            @if($convulsoes_epilepsia_ultimo_episodio == '')
                <label>{!! $convulsoes_epilepsia_ultimo_episodio_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $convulsoes_epilepsia_ultimo_episodio_sim !!} {{ $traducao === 'en' ? 'Yes. Last episode:' : __('Yes. Last episode:') }} <input type="text" value="{{ $convulsoes_epilepsia_ultimo_episodio }}" disabled></label>
            @endif

            <label>{{ $traducao === 'en' ? '6. Allergies?' : __('6. Allergies?') }}</label>
            @if($alergia_medicamentos_alimentos_substancias == '')
                <label>{!! $alergia_medicamentos_alimentos_substancias_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $alergia_medicamentos_alimentos_substancias_sim !!} {{ $traducao === 'en' ? 'Yes. To which medications, foods or substances?' : __('Yes. To which medications, foods or substances?') }} <input type="text" value="{{ $alergia_medicamentos_alimentos_substancias }}" disabled></label>
            @endif

            <label>{{ $traducao === 'en' ? '7. Continuous medication?' : __('7. Continuous medication?') }}</label>
            @if($medicacao_continua_quais_dosagem_horarios == '')
                <label>{!! $medicacao_continua_quais_dosagem_horarios_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $medicacao_continua_quais_dosagem_horarios_sim !!} {{ $traducao === 'en' ? 'Yes. Which one(s), dosage and schedule:' : __('Yes. Which one(s), dosage and schedule:') }} <input type="text" value="{{ $medicacao_continua_quais_dosagem_horarios }}" disabled></label>
            @endif

            <label>{{ $traducao === 'en' ? '8. Do you have health insurance?' : __('8. Do you have health insurance?') }}</label>
            @if($plano_saude_qual == '')
                <label>{!! $plano_saude_qual_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <label>{!! $plano_saude_qual_sim !!} {{ $traducao === 'en' ? 'Yes. Insurance name:' : __('Yes. Insurance name:') }} <input type="text" value="{{ $plano_saude_qual }}" disabled></label>
            @endif
        </div>

        <div class="section">
            <h2>{{ $traducao === 'en' ? 'Habits and Lifestyle' : __('Habits and Lifestyle') }}</h2>
            <label>{{ $traducao === 'en' ? '9. Do you smoke?' : __('9. Do you smoke?') }}</label>
            @if($fumante == '1')
                <label>{!! $fumante_sim !!} {{ $traducao === 'en' ? 'Yes' : __('Yes') }}</label>
            @else
                <label>{!! $fumante_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @endif

            <label>{{ $traducao === 'en' ? '10. Do you consume alcoholic beverages?' : __('10. Do you consume alcoholic beverages?') }}</label>
            @if($bebida_alcoolica == '1')
                <label>{!! $bebida_alcoolica_sim !!} {{ $traducao === 'en' ? 'Yes' : __('Yes') }}</label>
            @else
                <label>{!! $bebida_alcoolica_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @endif

            <label>{{ $traducao === 'en' ? '11. Do you regularly engage in physical activity?' : __('11. Do you regularly engage in physical activity?') }}</label>
            @if($atividade_fisica == '1')
                <label>{!! $atividade_fisica_sim !!} {{ $traducao === 'en' ? 'Yes' : __('Yes') }}</label>
            @else
                <label>{!! $atividade_fisica_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @endif
        </div>

        <div class="section">
            <h2>{{ $traducao === 'en' ? 'Family History' : __('Family History') }}</h2>
            <label>{{ $traducao === 'en' ? '12. Family illnesses:' : __('12. Family illnesses:') }}</label>
            @if($doenca_familiar_nao != '')
                <label>{!! $doenca_familiar_nao !!} {{ $traducao === 'en' ? 'No' : __('No') }}</label>
            @else
                <div class="checkbox-group">
                    <label {!! $doenca_familia_cardiaca_hide !!}>{!! $doenca_familia_cardiaca_checked !!} {{ $traducao === 'en' ? 'Heart Disease' : __('Heart Disease') }}</label>
                    <label {!! $doenca_familia_diabetes_hide !!}>{!! $doenca_familia_diabetes_checked !!} {{ $traducao === 'en' ? 'Diabetes' : __('Diabetes') }}</label>
                    <label {!! $doenca_familia_hipertensao_hide !!}>{!! $doenca_familia_hipertensao_checked !!} {{ $traducao === 'en' ? 'Hypertension' : __('Hypertension') }}</label>
                    <label {!! $doenca_familia_epilepsia_hide !!}>{!! $doenca_familia_epilepsia_checked !!} {{ $traducao === 'en' ? 'Epilepsy' : __('Epilepsy') }}</label>
                    <label {!! $doenca_familia_cancer_hide !!}>{!! $doenca_familia_cancer_checked !!} {{ $traducao === 'en' ? 'Cancer' : __('Cancer') }}</label>
                    <label {!! $doenca_familia_outras_hide !!}>{!! $doenca_familia_outras_checked !!} {{ $traducao === 'en' ? 'Others:' : __('Others:') }} <input type="text" value="{{ $doenca_familia_outras }}" disabled></label>
                </div>
            @endif
        </div>

        <div class="section">
            <h2>{{ $traducao === 'en' ? 'Emergency Contact' : __('Emergency Contact') }}</h2>
            <label>{{ $traducao === 'en' ? '13. Full name of emergency contact:' : __('13. Full name of emergency contact:') }} <input type="text" value="{{ $contato_nome_principal }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Phone:' : __('Phone:') }} <input type="text" value="{{ $contato_telefone_principal }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Relationship:' : __('Relationship:') }} <input type="text" value="{{ $contato_parentesco_principal }}" disabled></label>
            <label>{{ $traducao === 'en' ? 'Alternative contact (optional):' : __('Alternative contact (optional):') }} <input type="text" value="{{ $contato_alternativo }}" disabled></label>
        </div>

    </body>
</html>
