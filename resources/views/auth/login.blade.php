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
                                    </div>
                                </div>
                                <div class="col-5 align-self-end">
                                    <img src="{{ asset('build/assets/images/profile-img.png') }}" alt="" class="img-fluid">
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <div class="auth-logo">
                                <img src="{{ asset('build/assets/images/image_logo_login.png') }}" style="margin-top: -90px;">
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

                                    <div class="mb-3">
                                        <select class="form-control" name="empresa_id" id="empresa_id" onchange="setNomeEmpresa();" required>
                                            <option value="">Selecione a Empresa</option>

                                            @foreach ($empresas as $key => $empresa)
                                                <option value="{{ $empresa['id'] }}">{{ $empresa['name'] }}</option>
                                            @endforeach
                                        </select>
                                        <input type="hidden" name="empresa_name" id="empresa_name">
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
                                            <option value="pt_BR">Português</option>
                                            <option value="en">Inglês</option>
                                        </select>
                                    </div>
                                    <div class="mt-5 d-grid">
                                        <button class="btn btn-primary waves-effect waves-light" type="submit" id="btn_Login">Login</button>
                                    </div>

                                    @if (Route::has('forget.password.get'))
                                        <div class="mt-4 text-center">
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
        window.addEventListener('DOMContentLoaded', function() {
        	var url_atual = window.location.protocol+'//'+window.location.host+'/';

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
