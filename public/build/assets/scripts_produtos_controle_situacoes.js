function validar_frm_produtos_controle_situacoes() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: atual_produto_situacao_id (requerido)
    if (validacao({op:1, value:document.getElementById('atual_produto_situacao_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Situação Alterar requerido.'+'<br>';
    }

    //Campo: anterior_produto_situacao_id x atual_produto_situacao_id (igual)
    if (document.getElementById('anterior_produto_situacao_id').value == document.getElementById('atual_produto_situacao_id').value) {
        validacao_ok = false;
        mensagem += 'Situação Atual não pode ser igual a Situação Alterar.'+'<br>';
    }

    //Campo: anterior_estoque_local_id x atual_estoque_local_id (igual)
    if (document.getElementById('anterior_estoque_local_id').value == document.getElementById('atual_estoque_local_id').value) {
        validacao_ok = false;
        mensagem += 'Local Atual não pode ser igual a Local Alterar.'+'<br>';
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

// Patrimônio Situações Table
function patrimonioSituacoesTable(produto_entrada_item_id) {
    var url_atual = window.location.protocol+'//'+window.location.host+'/';

    // Acessar rota
    fetch(url_atual+'patrimonio/patrimonio_situacoes/'+produto_entrada_item_id, {
        method: 'GET',
        headers: {'REQUEST-ORIGIN': 'fetch'}
    }).then(response => {
        return response.json();
    }).then(data => {
        // Lendo json
        const patrimonio_situacoes = data.success.patrimonio_situacoes;

        // Grade
        let grade = '';

        // Montar Grade
        if (patrimonio_situacoes.length > 0) {
            grade += '<table class="table align-middle table-nowrap table-check table-sm class-datatable-3">';
            grade += '  <thead class="table-light">';
            grade += '      <tr>';
            grade += '          <th scope="col">Data</th>';
            grade += '          <th scope="col">Hora</th>';
            grade += '          <th scope="col">Situação Anterior</th>';
            grade += '          <th scope="col">Situação Atual</th>';
            grade += '      </tr>';
            grade += '  </thead>';
            grade += '  <tbody>';

            // Varrer
            patrimonio_situacoes.forEach(dado => {
                // TR
                grade += '<tr>';
                grade += '  <td>'+formatarData(2, dado.data_alteracao)+'</td>';
                grade += '  <td>'+dado.hora_alteracao+'</td>';
                grade += '  <td>'+dado.anteriorProdutoSituacaoName+'</td>';
                grade += '  <td>'+dado.atualProdutoSituacaoName+'</td>';
                grade += '</tr>';
            });

            grade += '  </tbody>';
            grade += '</table>';
        } else {
            grade = 'Nenhuma Situação encontrada.';
        }

        // Retornar Grade
        document.getElementById('divPatrimonioSituacoesTable').innerHTML = grade;
    }).catch(error => {}).finally(() => {});
}
