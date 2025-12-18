function validar_frm_modulos() {
    var validacao_ok = true;
    var mensagem = '';




    var validacao_ok = false;
    var mensagem = 'FALTA FAZER VALIDAÇÃO';




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

$(document).ready(function () {
    if ($('#frm_modulos').length) {
        $('#frm_modulos').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                menu_text: {
                    required: true,
                    minlength: 3
                },
                menu_url: {
                    required: true,
                    minlength: 3
                },
                menu_route: {
                    required: true,
                    minlength: 3
                },
                menu_icon: {
                    required: true
                },
                viewing_order: {
                    required: true,
                    number: true,
                    step: 1
                }
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    }
});
