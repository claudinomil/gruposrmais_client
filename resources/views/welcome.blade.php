<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <title> {{env('APP_NAME')}} | @yield('page_title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="{{ asset('build/assets/images/image_favicon.png') }}" id="appFavicon">

        <!-- Styles -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        @include('layouts.head-css')
    </head>
    <body style="background-color: #2a3042;">
        <div class="container">
            <div class="row">
                <div class="col-12 mt-5 pt-5">
                    <div class="col-12 text-center">
                        <img src="{{ asset('build/assets/images/welcome_logo.png') }}" class="col-6">
                    </div>
                    <div class="col-12 text-center pt-3">
                        <h1 class="text-light">Bem vindo</h1>
                        <span class="text-light">Sistema de Administração e Controle</span>
                    </div>

                    <div class="col-12 text-center pt-5">
                        <div class="row">
                            <div class="col">
                                <a class="text-light font-size-24" href="{{route('login')}}">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
