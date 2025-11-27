document.addEventListener("DOMContentLoaded", function(event) {
    if (document.getElementById('crudPrefixPermissaoSubmodulo')) {
        //Variáveis
        var prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;

        if (typeof prefixPermissaoSubmodulo !== "undefined" && prefixPermissaoSubmodulo != '') {
            if (prefixPermissaoSubmodulo != 'dashboards' && prefixPermissaoSubmodulo != 'dashboards2' && prefixPermissaoSubmodulo != 'dashboards3' && prefixPermissaoSubmodulo != 'relatorios' && prefixPermissaoSubmodulo != 'logotipos' && prefixPermissaoSubmodulo != 'mapas') {
                //Table
                crudTable(prefixPermissaoSubmodulo);
            }
        }
    }
});
