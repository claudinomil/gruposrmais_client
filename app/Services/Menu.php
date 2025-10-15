<?php

namespace App\Services;

use App\Facades\Permissoes;

class Menu
{
    public function getMenu($tp)
    {
        $menu = '';

        //Módulos e Submódulos
        $modulos = session('se_userLoggedMenuModulos');
        $submodulos = session('se_userLoggedMenuSubmodulos');

        //Pegar Id do Modulo Ativo
        $moduloIdActive = 0;

        foreach ($submodulos as $dado) {
            if ($dado['menu_route'] . '.index' == session('breadcrumbCurrentPageRoute')) {
                $moduloIdActive = $dado['modulo_id'];
            }
        }

        //Menu Verticarl
        if ($tp == 1) {
            $menu .= "<ul class='metismenu list-unstyled' id='side-menu'>
                        <li class='text-light text-center font-size-22 pb-2'>".session('gsrm_empresa')."</li>";
        }

        //Menu Horizontal
        if ($tp == 2) {
            $menu .= "<ul class='navbar-nav'>";
        }

        //varrer Módulos
        foreach ($modulos as $modulo) {
            $modOk = 1;

            //Varrer Submódulos
            foreach ($submodulos as $submodulo) {
                if ($modulo['id'] == $submodulo['modulo_id']) {
                    $permitido = Permissoes::permissao([$submodulo['prefix_permissao'] . '_list']);

                    //negar submodulos para fim de desenvolvimento''''''''''''''''''''''''''''''''''''''''''''''''''''''
                    //1 : Grupos
                    //if ($submodulo['id'] == 1) {$permitido = false;}

                    //2 : Usuários
                    //if ($submodulo['id'] == 2) {$permitido = false;}

                    //4 : Log de Transações
                    //if ($submodulo['id'] == 4) {$permitido = false;}

                    //6 : Bancos
                    //if ($submodulo['id'] == 6) {$permitido = false;}

                    //7 : Departamentos
                    //if ($submodulo['id'] == 7) {$permitido = false;}

                    //8 : Estados Civis
                    //if ($submodulo['id'] == 8) {$permitido = false;}

                    //9 : Nacionalidades
                    //if ($submodulo['id'] == 9) {$permitido = false;}

                    //10 : Escolaridades
                    //if ($submodulo['id'] == 10) {$permitido = false;}

                    //11 : Naturalidades
                    //if ($submodulo['id'] == 11) {$permitido = false;}

                    //12 : Gêneros
                    //if ($submodulo['id'] == 12) {$permitido = false;}

                    //13 : Funções
                    //if ($submodulo['id'] == 13) {$permitido = false;}

                    //14 : Funcionários
                    //if ($submodulo['id'] == 14) {$permitido = false;}

                    //15 : Órgãos Identidades
                    //if ($submodulo['id'] == 15) {$permitido = false;}

                    //16 : Clientes
                    //if ($submodulo['id'] == 16) {$permitido = false;}

                    //17 : Dashboards
                    //if ($submodulo['id'] == 17) {$permitido = false;}

                    //18 : Fornecedores
                    //if ($submodulo['id'] == 18) {$permitido = false;}

                    //19 : Usuários Perfil
                    //if ($submodulo['id'] == 19) {$permitido = false;}

                    //20 : Serviços
                    if ($submodulo['id'] == 20) {$permitido = false;}

                    //21 : Propostas
                    if ($submodulo['id'] == 21) {$permitido = false;}

                    //22 : Visitas Técnicas
                    //if ($submodulo['id'] == 22) {$permitido = false;}

                    //24 : Empresas
                    //if ($submodulo['id'] == 24) {$permitido = false;}

                    //26 : Ordens de Servicos
                    //if ($submodulo['id'] == 26) {$permitido = false;}

                    //27 : Veículos
                    //if ($submodulo['id'] == 27) {$permitido = false;}

                    //28 : Clientes Executivos
                    //if ($submodulo['id'] == 28) {$permitido = false;}

                    //29 : Relatórios
                    //if ($submodulo['id'] == 29) {$permitido = false;}

                    //30 : Mapas
                    //if ($submodulo['id'] == 30) {$permitido = false;}

                    //31 : Pontos de Interesse
                    //if ($submodulo['id'] == 31) {$permitido = false;}

                    //32 : Materiais
                    //if ($submodulo['id'] == 32) {$permitido = false;}

                    //33 : Brigadas de Incêndios
                    //if ($submodulo['id'] == 33) {$permitido = false;}
                    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    if ($permitido) {
                        if ($modOk == 1) {
                            $modOk = 0;

                            //li_active
                            $li_active = '';
                            if ($modulo['id'] == $moduloIdActive) {
                                $li_active = 'mm-active';
                            }

                            //Menu Verticarl
                            if ($tp == 1) {
                                $menu .= "<li class='" . $li_active . "'>
                                        <a href='javascript: void(0);' class='has-arrow waves-effect'>
                                            <i class='" . $modulo['menu_icon'] . "' style='font-size:16px;'></i><span key='t-" . $modulo['menu_route'] . "'>" . __($modulo['menu_text']) . "</span>
                                        </a>
                                        <ul class='sub-menu' aria-expanded='true'>";
                            }

                            //Menu Horizontal
                            if ($tp == 2) {
                                $menu .= "<li class='nav-item dropdown " . $li_active . "'>
                                            <a class='nav-link dropdown-toggle arrow-none' href='#' id='topnav-layout' role='button'>
                                                <i class='" . $modulo['menu_icon'] . " me-2'></i><span key='t-" . $modulo['menu_route'] . "'>" . __($modulo['menu_text']) . "</span> <div class='arrow-down'></div>
                                            </a>
                                            <div class='dropdown-menu' aria-labelledby='topnav-layout'>
                                                <div class='dropdown'>";
                            }
                        }

                        //$submodulo_menu_status
                        $submodulo_menu_status = '';

                        //Colocar Desenvolvimento, Teste e Novo'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        $desenvolvimento = '<span class="badge rounded-pill bg-danger float-end" title="Submódulo Em Desenvolvimento">SED</span>';
                        $teste = '<span class="badge rounded-pill bg-warning float-end" title="Submódulo Em Teste">SET</span>';
                        $novo = '<span class="badge rounded-pill bg-success float-end" title="Submódulo Novo">SNO</span>';

                        //Desenvolvimento
                        if (
                            $submodulo['id'] == 0
                            or $submodulo['id'] == 21
                            or $submodulo['id'] == 22
                            or $submodulo['id'] == 26
                            or $submodulo['id'] == 30 
                            or $submodulo['id'] == 33
                        ) {$submodulo_menu_status = $desenvolvimento;}

                        //Teste
                        if ($submodulo['id'] == 0) {$submodulo_menu_status = $teste;}

                        //Novo
                        if ($submodulo['id'] == 0) {$submodulo_menu_status = $novo;}
                        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                        //Menu Verticarl
                        if ($tp == 1) {
                            $active = '';

                            if ($submodulo['menu_route'] . '.index' == session('breadcrumbCurrentPageRoute')) {
                                $active = 'active';
                            }

                            $menu .= "<li><a href='" . route($submodulo['menu_route'] . '.index') . "' class='" . $active . "' key='t-" . $submodulo['menu_route'] . "'><i class='" . $submodulo['menu_icon'] . " font-size-10'></i>" . __($submodulo['menu_text']) . $submodulo_menu_status . "</a></li>";
                        }

                        //Menu Horizontal
                        if ($tp == 2) {
                            $menu .= "<a href='" . route($submodulo['menu_route'] . '.index') . "' class='dropdown-item' key='t-" . $submodulo['menu_route'] . "'><i class='" . $submodulo['menu_icon'] . " me-1'></i>" . __($submodulo['menu_text']) . $submodulo_menu_status . "</a>";
                        }
                    }
                }
            }

            if ($modOk == 0) {
                //Menu Verticarl
                if ($tp == 1) {
                    $menu .= "</ul></li>";
                }

                //Menu Horizontal
                if ($tp == 2) {
                    $menu .= "</div></div></li>";
                }
            }
        }

        //Menu Verticarl
        if ($tp == 1) {
            $menu .= "</ul>";
        }

        //Menu Horizontal
        if ($tp == 2) {
            $menu .= "</ul>";
        }

        return $menu;
    }
}
