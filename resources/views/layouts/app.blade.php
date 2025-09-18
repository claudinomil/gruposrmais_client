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
    </body>
</html>
