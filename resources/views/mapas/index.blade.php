@extends('layouts.app')

@section('title') Mapas @endsection

@section('css')
@endsection

@section('content')

    @component('components.breadcrumb')
@section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
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

                                    <!-- Mapas -->
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Visualizar Mapa <i class="mdi mdi-chevron-down"></i></button>
                                        <div class="dropdown-menu dropdown-menu-dark">
                                            <a class="dropdown-item" href="#" id="visualizar_mapa_1_dropdown">Mapa 1</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="mapas.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'mapas.name', 'descricao' => 'Nome'],
                                        ['value' => 'mapas.descricao', 'descricao' => 'Descrição']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="5" :colsNames="['Nome', 'Descrição', 'Ações']" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="name,descricao,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('mapas.form')
@endsection

@section('script')
    <!-- scripts_mapas.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_mapas.js')}}"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyARmoDmjUAPxUg4J5Ztuq1ceSqZK6i3WbM"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
@endsection

@section('script-bottom')
@endsection
