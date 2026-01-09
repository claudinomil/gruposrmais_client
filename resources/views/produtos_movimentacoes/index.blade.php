@extends('layouts.app')

@section('title') Produtos Movimentacoes @endsection

@section('css')
@endsection

@section('content')

    @component('components.breadcrumb')
@section('page_title') {{ __(\App\Facades\Breadcrumb::getCurrentPageTitle()) }} @endsection
@endcomponent

<div id="crudTable">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <!-- Botoes -->
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <!-- Botões -->
                                <div class="col-12 col-md-6 pb-2">
                                    @if (\App\Facades\Permissoes::permissao(['create']))
                                        <x-button-crud op="1" onclick="crudCreate();" />
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="produtos_entrdas_itens.produto_name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'produtos_entrdas_itens.produto_name', 'descricao' => __('Produto')]
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="3" :colsNames="[__('Data'), __('Hora'), __('Origem'), __('Destino'), __('Ações')]" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="data_movimentacao,hora_movimentacao,origem,destino,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('produtos_movimentacoes.form')
@endsection

@section('script')
    <!-- scripts_produtos_movimentacoes.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_produtos_movimentacoes.js')}}"></script>
@endsection
