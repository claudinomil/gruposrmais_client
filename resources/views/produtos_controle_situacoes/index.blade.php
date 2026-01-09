@extends('layouts.app')

@section('title') Produtos Controle Situacoes @endsection

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
                                <div class="col-12 col-md-6 pb-2">&nbsp;</div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="produtos.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'produtos.name', 'descricao' => __('Produto')]
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="3" :colsNames="['#', __('Patrimônio'), __('Produto'), __('Local'), __('Situação'), __('Ações')]" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="fotografia,numero_patrimonio,produto,local,situacao,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('produtos_controle_situacoes.form')
@endsection

@section('script')
    <!-- scripts_produtos_controle_situacoes.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_produtos_controle_situacoes.js')}}"></script>
@endsection
