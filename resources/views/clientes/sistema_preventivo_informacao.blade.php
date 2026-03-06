@extends('layouts.app-without-nav')

@section('body')
    <body>
@endsection

@section('content')
    @if ($dados['sistema_preventivo'] !== null)
        @php
        $sistema_preventivo = $dados['sistema_preventivo'];

        $sistema_preventivo_nome = $sistema_preventivo['name'];
        $sistema_preventivo_descricao = $sistema_preventivo['descricao'];
        $sistema_preventivo_fotografia = $sistema_preventivo['fotografia'];
        $sistema_preventivo_sistema_preventivo_numero = $sistema_preventivo['sistema_preventivo_numero'];

        $sistema_preventivo_cliente_name = $sistema_preventivo['clienteName'];
        $sistema_preventivo_medida_seguranca_name = $sistema_preventivo['medidaSegurancaName'];
        @endphp

        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="pt-2">
                        <h2><img src="{{ asset('build/assets/images/clientes/sistema_preventivo-0.png') }}" alt="" width="50px">{{ __('Informação Sistema Preventivo') }}: {{ $sistema_preventivo_numero }} - {{ $sistema_preventivo_nome }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-5">
                                <img src="{{ asset($sistema_preventivo_fotografia) }}" alt="" width="250px">
                            </div>
                            <div class="col-12 col-md-7">
                                <div class="mt-4 mt-xl-3">
                                    <h4 class="mt-1 mb-3">{{ $sistema_preventivo_nome }}</h4>
                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Sistema Preventivo: {{ $sistema_preventivo_sistema_preventivo_numero }}</p>
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Cliente: {{ $sistema_preventivo_cliente_name }}</p>
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Medida Segurança: {{ $sistema_preventivo_medida_seguranca_name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="col-12">
            <div class="pt-2">
                <h2><img src="{{ asset('build/assets/images/clientes/sistema_preventivo-0.png') }}" alt="" width="50px">{{ __('Informação Sistema Preventivo') }}: {{ $sistema_preventivo_numero }} - {{ __('Não encontrado') }}</h2>
            </div>
        </div>
    @endif
@endsection
