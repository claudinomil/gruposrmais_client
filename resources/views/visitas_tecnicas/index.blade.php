@extends('layouts.app')

@section('title') Visitas Técnicas @endsection

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
                                        <div class="row">
                                            <div class="col-10">
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
                                                    <a class="dropdown-item small text-success" href="#" data-visita_tecnica_tipo_id="1">Executar Visita Técnica de Exaustão</a>
                                                    <a class="dropdown-item small text-primary" href="#" data-visita_tecnica_tipo_id="2">Executar Visita Técnica de Incêndio</a>
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
                                        ['value' => 'clientes.name', 'descricao' => 'Nome']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="3" :colsNames="['Visita Técnica', 'Cliente', 'Ações']" />
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

<!-- Modal -->
@include('visitas_tecnicas.form')
@endsection

@section('script')
    <!-- TinyMCE -->
    <script src="{{ asset('build/assets/tinymce/tinymce.min.js') }}"></script>

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
