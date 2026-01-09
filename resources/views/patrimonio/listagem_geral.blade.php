@extends('layouts.app-without-nav')

@section('body')
    <body>
@endsection

@section('content')
    @if ($dados['produtos'] !== null)
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="pt-2">
                        <h2><i class="bx bxs-box"></i> {{ __('Patrimônio') }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table mb-0 nowrap w-100 small class-datatable-1">
                                    <thead class="table-light">
                                        <tr>
                                            <th class="text-center">#</th>
                                            <th class="text-center">PATRIMÔNIO</th>
                                            <th>PRODUTO</th>
                                            <th>AQUISIÇÃO</th>
                                            <th>VALOR</th>
                                            <th>LOCAL</th>
                                            <th class="text-center">SITUAÇÃO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($dados['produtos'] as $produto)
                                            @php
                                            $produto_nome = $produto['nome'];
                                            $produto_descricao = $produto['descricao'];
                                            $produto_fotografia = $produto['fotografia'];
                                            $produto_ca = $produto['ca'];
                                            $produto_categoria = $produto['categoria'];
                                            $produto_numero_patrimonio = $produto['numero_patrimonio'];
                                            $produto_local = $produto['local'];
                                            $produto_situacao_id = $produto['situacao_id'];
                                            $produto_situacao = $produto['situacao'];
                                            $produto_estoque_id = $produto['estoque_id'];
                                            $produto_estoque_nome = $produto['estoque'];
                                            $produto_local_empresa = $produto['local_empresa'];
                                            $produto_local_cliente = $produto['local_cliente'];
                                            $produto_data_aquisicao = $produto['data_emissao'];
                                            $produto_valor_unitario = $produto['valor_unitario'];

                                            if ($produto_estoque_id == 1) {
                                                $local = $produto_estoque_nome.': '.$produto_local_empresa.' - '.$produto_local;
                                            } else {
                                                $local = $produto_estoque_nome.': '.$produto_local_cliente.' - '.$produto_local;
                                            }

                                            if ($produto_situacao_id == 1 or $produto_situacao_id == 2 or $produto_situacao_id == 5) {
                                                $situacao = '<div class="text-success">'.'<b>'.$produto_situacao.'</b>'.'</div>'.'<div>Movimentação Permitida</div>';
                                            } else {
                                                $situacao = '<div class="text-danger">'.'<b>'.$produto_situacao.'</b>'.'</div>';
                                            }
                                            @endphp

                                            <tr>
                                                <th class="text-center" scope="row"><img src="{{ asset($produto_fotografia) }}" alt="product-img" title="product-img" class="rounded avatar-sm"></th>
                                                <td class="text-center"><b>{{ $produto_numero_patrimonio }}</b></td>
                                                <td><b>{{ $produto_nome }}</b><br>{{ $produto_categoria }}</td>
                                                <td>{{ \App\Services\SuporteService::getDataFormatada(1, $produto_data_aquisicao) }}</td>
                                                <td>{{ number_format($produto_valor_unitario, 2, ",", ".") }}</td>
                                                <td>{{ $local }}</td>
                                                <td class="text-center">{!! $situacao !!}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="col-12">
            <div class="pt-2">
                <h2><i class="bx bxs-box"></i> {{ __('Patrimônio') }}: {{ __('Não encontrado') }}</h2>
            </div>
        </div>
    @endif
@endsection

@section('script')
    <!-- scripts_patrimonio.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_patrimonio.js')}}"></script>
@endsection
