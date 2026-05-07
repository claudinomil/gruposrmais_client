function validar_frm_ordens_servicos() {
    if (document.getElementById('ordem_servico_tipo_id').value == 1) { return ost1_validar_frm_ordens_servicos(); }
    if (document.getElementById('ordem_servico_tipo_id').value == 2) { return ost2_validar_frm_ordens_servicos(); }
    if (document.getElementById('ordem_servico_tipo_id').value == 3) { return ost3_validar_frm_ordens_servicos(); }
    if (document.getElementById('ordem_servico_tipo_id').value == 4) { return ost4_validar_frm_ordens_servicos(); }
}

document.addEventListener('DOMContentLoaded', function (event) {
    //Campo: ordem_servico_tipo_id
    document.getElementById('ordem_servico_tipo_id').addEventListener('change', function() {
        const div_ost1 = document.getElementById('divOST1').style.display = 'none';
        const div_ost2 = document.getElementById('divOST2').style.display = 'none';
        const div_ost3 = document.getElementById('divOST3').style.display = 'none';
        const div_ost4 = document.getElementById('divOST4').style.display = 'none';

        if (this.value == 1) {
            const div_ost1 = document.getElementById('divOST1').style.display = '';
        }

        if (this.value == 2) {
            const div_ost2 = document.getElementById('divOST2').style.display = '';
        }

        if (this.value == 3) {
            const div_ost3 = document.getElementById('divOST3').style.display = '';
        }

        if (this.value == 4) {
            const div_ost4 = document.getElementById('divOST4').style.display = '';
        }
    });
});
