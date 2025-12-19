@extends('layouts.app-without-nav')

@section('body')
    <body>
@endsection

@section('content')
    @if ($dados['materiais'] !== null)
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
                                <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100 small">
                                    <thead>
                                        <tr>
                                            <th class="text-center">#</th>
                                            <th class="text-center">PATRIMÔNIO</th>
                                            <th>MATERIAL</th>
                                            <th>LOCAL</th>
                                            <th class="text-center">SITUAÇÃO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($dados['materiais'] as $material)
                                            @php
                                            $material_nome = $material['nome'];
                                            $material_descricao = $material['descricao'];
                                            $material_fotografia = $material['fotografia'];
                                            $material_ca = $material['ca'];
                                            $material_categoria = $material['categoria'];
                                            $material_numero_patrimonio = $material['numero_patrimonio'];
                                            $material_local = $material['local'];
                                            $material_situacao_id = $material['situacao_id'];
                                            $material_situacao = $material['situacao'];
                                            $material_estoque_id = $material['estoque_id'];
                                            $material_estoque_nome = $material['estoque'];
                                            $material_local_empresa = $material['local_empresa'];
                                            $material_local_cliente = $material['local_cliente'];

                                            if ($material_estoque_id == 1) {
                                                $local = $material_estoque_nome.': '.$material_local_empresa.' - '.$material_local;
                                            } else {
                                                $local = $material_estoque_nome.': '.$material_local_cliente.' - '.$material_local;
                                            }

                                            if ($material_situacao_id == 1 or $material_situacao_id == 2 or $material_situacao_id == 5) {
                                                $situacao = '<div class="text-success">'.'<b>'.$material_situacao.'</b>'.'</div>'.'<div>Movimentação Permitida</div>';
                                            } else {
                                                $situacao = '<div class="text-danger">'.'<b>'.$material_situacao.'</b>'.'</div>';
                                            }
                                            @endphp

                                            <tr>
                                                <th class="text-center" scope="row"><img src="{{ asset($material_fotografia) }}" alt="product-img" title="product-img" class="rounded avatar-sm"></th>
                                                <td class="text-center"><b>{{ $material_numero_patrimonio }}</b></td>
                                                <td><b>{{ $material_nome }}</b><br><br>{{ $material_categoria }}</td>
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


<script>
$(document).ready(function(){$("#datatable").DataTable(),$("#datatable-buttons").DataTable({lengthChange:!1,buttons:["copy","excel","pdf","colvis"]}).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)"),$(".dataTables_length select").addClass("form-select form-select-sm")});
</script>
