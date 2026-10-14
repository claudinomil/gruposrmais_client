<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <title> {{env('APP_NAME')}} | @yield('page_title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- CSRF-TOKEN -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <!-- App favicon -->
        <link rel="shortcut icon" href="{{ asset('build/assets/images/image_favicon.png') }}" id="appFavicon">

        <!-- Styles -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        @include('layouts.head-css')
    </head>

    @section('body')
        <body class="vertical-collpsed">

        @show

        <!-- Loader -->
        <div class="pt-5" id="preloader">
            <div id="statusPreloader">
                <div class="spinner-chase">
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                </div>
            </div>
        </div>

        <!-- Begin page -->
        <div id="layout-wrapper">

            <!-- Topbar -->
            @include('layouts.topbar')

            <!-- Layout Vertical -->
            @include('layouts.sidebar')

            <!-- Layout Horizontal -->
            @include('layouts.horizontal')

            <!-- Settings User -->
            @include('layouts.settings-user')

            <!-- Start right Content here -->
            <div class="main-content">
                <div class="page-content">
                    <div class="modal-loading" id="crudFormAjaxLoading" style="display: none;">
                        <div class="spinner-chase">
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                        </div>
                    </div>

                    <div class="container-fluid">
                        <input type="hidden" id="user_email" value="{{ session('se_userLoggedData.email') }}">
                        @yield('content')
                    </div>

                    @include('layouts.footer')
                </div>
            </div>

        @include('layouts.modals')

        <!-- Right Sidebar -->
        @include('layouts.right-sidebar')

        <!-- Verificar Mode e Style (Serve para customizar a tela do sistema) -->
        <script>
			//Mode
			sessionStorage.setItem("is_visited_mode", "{{session('se_userLoggedData.layout_mode')}}");

			//Style
            @if(session('access_device') == 'desktop')
                sessionStorage.setItem("is_visited_style", "{{session('se_userLoggedData.layout_style')}}");
            @else
                //se for acesso pelo mobile forçar menu superior
                // sessionStorage.setItem("is_visited_style", "layout_style_horizontal_boxed_width");
            @endif
        </script>

        <!-- javascript -->
        @include('layouts.scripts')
        @include('layouts.scripts-profile')

        <!-- Área escondida para aviso na tela temporariamente -->
        <div id="loading-aviso-tmp" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); color: white; font-size: 20px; text-align: center; padding-top: 20%; z-index: 9999;">&nbsp;</div>

        <!-- Aviso para Usuário -->
        @if (session('modalAviso'))
        <div class="modal fade" id="modalAviso" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" id="modalAvisoDialog">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-body text-center p-3">
                        <div class="row">
                            <div class="" id="divAdvc">
                                <div>
                                    <i class="fas fa-info-circle text-warning font-size-30"></i>
                                </div>
                                <div class="font-size-14 mb-3" id="modalAvisoTitulo_advc"></div>
                                <div class="text-center" id="modalAvisoMensagem_advc"></div>
                            </div>
                            <div class="" id="divAdvf">
                                <div>
                                    <i class="fas fa-info-circle text-warning font-size-30"></i>
                                </div>
                                <div class="font-size-14 mb-3" id="modalAvisoTitulo_advf"></div>
                                <div class="text-center" id="modalAvisoMensagem_advf"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            document.getElementById('modalAvisoTitulo_advc').innerHTML = @json(session('aviso_titulo_advc'));
            document.getElementById('modalAvisoMensagem_advc').innerHTML = @json(session('aviso_mensagem_advc'));

            document.getElementById('modalAvisoTitulo_advf').innerHTML = @json(session('aviso_titulo_advf'));
            document.getElementById('modalAvisoMensagem_advf').innerHTML = @json(session('aviso_mensagem_advf'));

            if (@json(session('aviso_mensagem_advc')) != '' && @json(session('aviso_mensagem_advf')) != '') {
                document.getElementById('modalAvisoDialog').classList.replace('modal-md', 'modal-lg');
                document.getElementById('divAdvc').className = 'col-6';
                document.getElementById('divAdvf').className = 'col-6';
            } else if (@json(session('aviso_mensagem_advc')) != '' && @json(session('aviso_mensagem_advf')) == '') {
                document.getElementById('modalAvisoDialog').classList.replace('modal-lg', 'modal-md');
                document.getElementById('divAdvc').className = 'col-12';
                document.getElementById('divAdvf').className = 'd-none';
            } else if (@json(session('aviso_mensagem_advc')) == '' && @json(session('aviso_mensagem_advf')) != '') {
                document.getElementById('modalAvisoDialog').classList.replace('modal-lg', 'modal-md');
                document.getElementById('divAdvc').className = 'd-none';
                document.getElementById('divAdvf').className = 'col-12';
            }

            const modal = new bootstrap.Modal(document.getElementById('modalAviso'));
            modal.show();
        </script>
        @endif
    </body>
</html>
