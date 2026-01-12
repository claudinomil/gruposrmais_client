@extends('layouts.app')

@section('title') Visitas Técnicas @endsection

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
                                        <div class="row">
                                            <div class="col-8">
                                                <select class="form-select" name="cliente_id" id="cliente_id">
                                                    <option value="">Escolha o Cliente...</option>
                                                    @foreach ($clientes as $cliente)
                                                        <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Executar Visita Técnica"><i class="bx bx-plus"></i></button>
                                                <div class="dropdown-menu dropdown-menu-end" id="visita_tecnica_dropdown">
                                                    <a class="dropdown-item small text-success" href="#" data-visita_tecnica_tipo_id="1" data-vt_cs="1">Executar Visita Técnica de Exaustão Completa</a>
                                                    <a class="dropdown-item small text-warning" href="#" data-visita_tecnica_tipo_id="1" data-vt_cs="2">Executar Visita Técnica de Exaustão Sintética</a>
                                                    <a class="dropdown-item small text-danger" href="#" data-visita_tecnica_tipo_id="2" data-vt_cs="1">Executar Visita Técnica de Incêndio Completa</a>
                                                    <a class="dropdown-item small text-primary" href="#" data-visita_tecnica_tipo_id="2" data-vt_cs="2">Executar Visita Técnica de Incêndio Sintética</a>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Configurar Perguntas"><i class="bx bx-cog"></i></button>
                                                <div class="dropdown-menu dropdown-menu-end" id="visita_tecnica_configuracao_dropdown">
                                                    <a class="dropdown-item small" href="#" onclick="configurar_perguntas_controle(1);">Configurar Perguntas</a>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="clientes.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'clientes.name', 'descricao' => __('Nome')]
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="3" :colsNames="[__('Visita Técnica'), __('Cliente'), __('Ações')]" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="visita_tecnica,clienteName,action">
                </div>
            </div>
        </div>
    </div>
</div>

@include('visitas_tecnicas.form')
@include('visitas_tecnicas.configurar_perguntas')
@endsection

@section('script')
    <!-- Incluir a CDN do jsPDF -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>

    <!-- scripts_visitas_tecnicas.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_visitas_tecnicas.js')}}"></script>

    <!-- scripts_visitas_tecnicas_vtt1.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_visitas_tecnicas_vtt1.js')}}"></script>

    <!-- scripts_visitas_tecnicas_vtt2.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_visitas_tecnicas_vtt2.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
