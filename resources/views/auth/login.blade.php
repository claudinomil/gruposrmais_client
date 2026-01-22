@extends('layouts.app-without-nav')

@section('title') Login @endsection

@section('body')
<body style="background-color: #2a3042;">
    @endsection

    @section('content')
    <div class="account-pages my-4">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card overflow-hidden">
                        <div class="bg-primary bg-soft">
                            <div class="row">
                                <div class="col-7">
                                    <div class="text-primary p-4">
                                        <h5 class="text-primary">Bem vindo de volta !</h5>
                                        <div class="pt-1">
                                            <img src="{{ asset('build/assets/images/image_logo_previnir.png') }}" width="100">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-5 align-self-end">
                                    <img src="{{ asset('build/assets/images/profile-img.png') }}" alt="" class="img-fluid">
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <div class="pt-3 pb-5">
                                @if(session()->has('gsrm_cliente_id') && session('gsrm_cliente_id') == 0)
                                <img src="{{ asset('build/assets/images/image_logo_login.png') }}" width="120">
                                @else
                                <img src="{{ asset(session('gsrm_cliente_logotipo_principal')) }}" width="120">
                                @endif
                            </div>
                            <div class="p-0">
                                <!-- Erros -->
                                @if (isset($error) and $error != '')
                                <div class="alert alert-danger mt-1">{{ $error }}</div>
                                @endif

                                @if (Session::has('message'))
                                <div class="alert alert-success" role="alert">
                                    {{ Session::get('message') }}
                                </div>
                                @endif

                                <form method="POST" class="form-horizontal" action="{{ route('login') }}">
                                    @csrf

                                    <div class="mb-3" id="divEmpresa" style="display: none;">
                                        <select class="form-control" name="empresa_id" id="empresa_id" onchange="setNomeEmpresa();" required>
                                            <option value="">Selecione a Empresa</option>

                                            @foreach ($empresas as $key => $empresa)
                                            <option value="{{ $empresa['id'] }}">{{ $empresa['name'] }}</option>
                                            @endforeach
                                        </select>
                                        <input type="hidden" name="empresa_name" id="empresa_name">
                                    </div>
                                    <div class="mb-3" id="divCliente" style="display: none;">
                                        <input type="text" class="form-control" id="cliente_name" name="cliente_name" value="{{ session('gsrm_cliente_name') }}" readonly>
                                        <input type="hidden" id="cliente_id" name="cliente_id" value="{{ session('gsrm_cliente_id') }}">
                                    </div>
                                    <div class="mb-3">
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Digite seu E-mail de Usuário" required autofocus>
                                    </div>
                                    <div class="mb-3">
                                        <div class="input-group auth-pass-inputgroup">
                                            <input type="password" class="form-control" id="password" name="password" placeholder="Digite sua Senha" aria-label="Password" aria-describedby="password-addon" required>
                                            <button class="btn btn-light " type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <select class="form-control" name="idioma" id="idioma" required>
                                            <option value="">Selecione o Idioma</option>
                                            <option value="pt_BR">{{ __('Português') }}</option>
                                            <option value="en">Inglês</option>
                                        </select>
                                    </div>
                                    <div class="mt-4 d-grid">
                                        <button class="btn btn-primary waves-effect waves-light" type="submit" id="btn_Login">Login</button>
                                    </div>

                                    @if(session()->has('gsrm_cliente_id') && session('gsrm_cliente_id') != 0)
                                    <div class="mt-2 text-center">
                                        <a href="{{ route('rota_entrada_1') }}" class="text-success"><i class="mdi mdi-star me-1"></i> Login no Grupo SR+</a>
                                    </div>
                                    @endif

                                    @if (Route::has('forget.password.get'))
                                    <div class="mt-2 text-center">
                                        <a href="{{ route('forget.password.get') }}" class="text-muted"><i class="mdi mdi-lock me-1"></i> Esqueceu sua senha?</a>
                                    </div>
                                    @endif
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function setNomeEmpresa() {
            let select = document.getElementById('empresa_id');
            let nomeEmpresa = select.options[select.selectedIndex].text;
            document.getElementById('empresa_name').value = nomeEmpresa;
        }
    </script>

    <script>
        window.addEventListener('DOMContentLoaded', function () {
            // URL
            var url_atual = window.location.protocol + '//' + window.location.host + '/';

            // Pegando Elementos
            var divEmpresa = document.getElementById('divEmpresa');
            var empresa_id = document.getElementById('empresa_id');
            var divCliente = document.getElementById('divCliente');
            var cliente_id = document.getElementById('cliente_id');

            // Manipilando Elementos
            divEmpresa.style.display = 'none';
            empresa_id.value = '';
            divCliente.style.display = 'none';

            // Verificando se é Sistema Padrão ou Dominio Cliente
            if (cliente_id.value == 0) {
                divEmpresa.style.display = '';
                empresa_id.value = '';
            } else {
                divCliente.style.display = '';
                empresa_id.value = 1;
            }

            // Dados caso entre no Desenvolvimento
            if (url_atual == 'http://gruposrmais-client.test/') {
                document.getElementById('empresa_id').value = 1;
                document.getElementById('email').value = 'claudinomoraes@yahoo.com.br';
                document.getElementById('password').value = '12345678';
                document.getElementById('idioma').value = 'pt_BR';

                document.getElementById('btn_Login').focus();
            }
        });
    </script>
    @endsection
