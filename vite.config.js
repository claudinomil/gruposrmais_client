import { viteStaticCopy } from 'vite-plugin-static-copy'

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
                {src: 'resources/assets_template/css/bootstrap.css', dest: 'assets'},
                {src: 'resources/assets_template/css/app.css', dest: 'assets'},
                {src: 'resources/assets_template/css/bootstrap-dark.css', dest: 'assets'},
                {src: 'resources/assets_template/css/app-dark.css', dest: 'assets'},

                {src: 'resources/assets_template/libs/jquery/jquery.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/bootstrap/bootstrap.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-validation/jquery-validation.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-validation/jquery-validation-pt-br.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/metismenu/metismenu.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/simplebar/simplebar.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/node-waves/node-waves.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/sweetalert2/sweetalert2.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/select2/select2.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/datatables/datatables.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-repeater/jquery-repeater.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jszip/jszip.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/pdfmake/pdfmake.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-mask/jquery.mask.min.js', dest: 'assets'},

                {src: 'resources/assets_template/js/jquery-validation-methods.js', dest: 'assets'},
                {src: 'resources/assets_template/js/jquery-masks.js', dest: 'assets'},
                {src: 'resources/assets_template/js/app.min.js', dest: 'assets'},
                {src: 'resources/assets_template/js/main.js', dest: 'assets'},
                {src: 'resources/assets_template/js/cruds.js', dest: 'assets'},
                {src: 'resources/assets_template/js/cruds_functions.js', dest: 'assets'},
                {src: 'resources/assets_template/js/administrador.js', dest: 'assets'},
                {src: 'resources/assets_template/js/functions.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_template_init.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_bancos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_dashboards_global.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_dashboards.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_dashboards2.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_dashboards3.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_patrimonio.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_materiais.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_materiais_entradas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_materiais_movimentacoes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_brigadas_incendios.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_empresas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_departamentos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_funcionarios.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_mapas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_pontos_interesse.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_relatorios.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_veiculos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_clientes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_clientes_executivos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_estoques_locais.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ordens_servicos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ordens_servicos_ost1.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ordens_servicos_ost2.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ordens_servicos_ost3.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_fornecedores.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_generos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_grupos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_identidade_orgaos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_estados_civis.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_modulos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_nacionalidades.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_naturalidades.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_funcoes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_escolaridades.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_submodulos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_users.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_profiles.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_servico_tipos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_servicos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_propostas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_visitas_tecnicas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_visitas_tecnicas_vtt1.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_visitas_tecnicas_vtt2.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jspdf/jspdf.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jspdf/jspdf_autotable.js', dest: 'assets'},
                {src: 'resources/assets_template/images/clientes/cliente-0.png', dest: 'assets/images/clientes'},
                {src: 'resources/assets_template/images/fornecedores/fornecedor-0.png', dest: 'assets/images/fornecedores'},
                {src: 'resources/assets_template/images/clientes_executivos/cliente_executivo-0.png', dest: 'assets/images/clientes_executivos'},
                {src: 'resources/assets_template/images/funcionarios/funcionario-0.png', dest: 'assets/images/funcionarios'},
                {src: 'resources/assets_template/images/materiais/material-0.png', dest: 'assets/images/materiais'},
                {src: 'resources/assets_template/images/users/avatar-0.png', dest: 'assets/images/users'},
                {src: 'resources/assets_template/images/visitas_tecnicas/visita-tecnica-0.png', dest: 'assets/images/visitas_tecnicas'},

                {src: 'resources/assets_template/images/cartao_emergencial_cnooc.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/cartao_emergencial_funcionario.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/cliente-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/visita_tecnica-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/error-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/verification-img.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/fornecedor-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/funcionario-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/visita_tecnica-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_favicon.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_dark_menu.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_dark_menu_min.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_light_menu.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_light_menu_min.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_login.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_qrcode.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_relatorio.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/megamenu-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/profile-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_logo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_topo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_topo_simples.jpg', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_rodape.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_logo_cbmerj.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_logo_crea.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_logo_gruposrmais.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_logo_inmetro.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_email.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_pdf.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/emergencia.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/ordem_servico_topo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/ordem_servico_topo_cliente_2.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/ordem_servico_rodape.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/ordem_servico_rodape_cliente_2.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/visita_tecnica_topo.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/visita_tecnica_rodape.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/proposta_topo.jpg', dest: 'assets/images'},
                {src: 'resources/assets_template/images/proposta_rodape.jpg', dest: 'assets/images'},

                {src: 'resources/assets_template/images/relatorios_topo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/relatorios_rodape.png', dest: 'assets/images'},

                {src: 'resources/assets_template/images/pictograma_1.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/pictograma_2.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/pictograma_5.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/pictograma_7.png', dest: 'assets/images'},

                {src: 'resources/assets_template/pdfs/clientes/pdf.pdf', dest: 'assets/pdfs/clientes'},
                {src: 'resources/assets_template/pdfs/visitas_tecnicas/pdf.pdf', dest: 'assets/pdfs/visitas_tecnicas'},
                {src: 'resources/assets_template/pdfs/funcionarios/pdf.pdf', dest: 'assets/pdfs/funcionarios'},
                {src: 'resources/assets_template/pdfs/clientes_executivos/pdf.pdf', dest: 'assets/pdfs/clientes_executivos'},
                {src: 'resources/assets_template/pdfs/materiais_entradas/pdf.pdf', dest: 'assets/pdfs/materiais_entradas'},

                {src: 'resources/assets_template/qrcodes/clientes_executivos/qrcode.pdf', dest: 'assets/qrcodes/clientes_executivos'},
                {src: 'resources/assets_template/qrcodes/funcionarios/qrcode.pdf', dest: 'assets/qrcodes/funcionarios'},

                {src: 'resources/proxy-directions.php', dest: ''},
                {src: 'resources/gerar-mapa.php', dest: ''},

                //Imagens aleatorias
                {src: 'resources/assets_template/images/sem_imagem_quadrada.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/sem_imagem_retangular.png', dest: 'assets/images'},

                //Testes
                {src: 'resources/assets_template/json/ocorrencias.json', dest: 'assets'},

                //Ícones Mapas
                {src: 'resources/assets_template/images/icones/mapas/*.png', dest: 'assets/images/icones/mapas'},

                //Comunidades para montar pilígonos no Mapa
                {src: 'resources/assets_template/json/comunidades.json', dest: 'assets'},

                //Copianto tinymce completo para funcionar sem erro
                {src: 'resources/assets_template/libs/tinymce', dest: 'assets'},

                //Fonts
                {src: 'resources/assets_template/fonts/boxicons.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/summernote.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/summernote.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/summernote.woff', dest: 'fonts'}
            ]
        })
    ]
});
