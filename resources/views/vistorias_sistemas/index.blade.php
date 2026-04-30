@extends('layouts.app')

@section('title') Vistorias Sistemas @endsection

@section('topbar_title')
{{ __('Vistorias Sistemas') }}
@endsection

@section('css')
@endsection

@section('content')

{{--
@component('components.breadcrumb')
@section('page_title') {{ __(\App\Facades\Breadcrumb::getCurrentPageTitle()) }} @endsection
@endcomponent
--}}

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
                                            <select class="form-select" name="edificacao_id" id="edificacao_id">
                                                <option value="">Escolha a Edificação...</option>
                                                @foreach ($edificacoes as $edificacao)
                                                <option value="{{ $edificacao['id'] }}">{{ $edificacao['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Executar Vistoria Sistema"><i class="bx bx-plus"></i></button>
                                            <div class="dropdown-menu dropdown-menu-end" id="vistoria_sistema_dropdown">


                                                CRIAR AQUI A RELAÇÃO DE EDIFICAÇÕES NÍVEIS PARA ESCOLHER E INICIAR A VISTORIA.


                                                <div class="col-12 col-md-12">
                                                    <div class="mt-4">
                                                        <input class="form-check-input" type="checkbox" id="formCheckcolor1" checked="">
                                                        <label class="form-check-label" for="formCheckcolor1">Checkbox Primary</label>

                                                        <input class="form-check-input" type="checkbox" id="formCheckcolor2" checked="">
                                                        <label class="form-check-label" for="formCheckcolor2">Checkbox Success</label>
                                                    </div>
                                                </div>


                                                <a class="dropdown-item small text-success" href="#">Executar Vistoria Sistema</a>
                                            </div>
                                        </div>
                                    </div>
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="edificacoes.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                    $selectCampoPesquisar = [
                                    ['value' => 'edificacoes.name', 'descricao' => __('Nome')]
                                    ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="3" :colsNames="[__('Vistoria Sistema'), __('Edificação'), __('Ações')]" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="vistoria_sistema,edificacaoName,action">
                </div>
            </div>
        </div>
    </div>
</div>

@include('vistorias_sistemas.form')
@endsection

@section('script')
<!-- Incluir a CDN do jsPDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>

<!-- scripts_vistorias_sistemas.js -->
<script src="{{ Vite::asset('resources/assets_template/js/scripts_vistorias_sistemas.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
