@extends('layouts.app')

@section('title') Funcionários @endsection

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

                                    <!-- Ações para serem feitas com Funcionários -->
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Ações com Funcionários <i class="mdi mdi-chevron-down"></i></button>
                                        <div class="dropdown-menu dropdown-menu-dark">
                                            <a class="dropdown-item" href="#" id="funcionario_acao_1_dropdown">Contrato Carnaval 2025</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="funcionarios.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'funcionarios.name', 'descricao' => __('Nome')],
                                        ['value' => 'funcionarios.identidade', 'descricao' => __('Identidade')],
                                        ['value' => 'identidade_orgaos.name', 'descricao' => __('Órgão Identidade')],
                                        ['value' => 'funcionarios.cpf', 'descricao' => __('CPF')],
                                        ['value' => 'generos.name', 'descricao' => __('Gênero')],
                                        ['value' => 'estados_civis.name', 'descricao' => __('Estado Civil')],
                                        ['value' => 'funcionarios.mae', 'descricao' => __('Mãe')],
                                        ['value' => 'funcionarios.pai', 'descricao' => __('Pai')],
                                        ['value' => 'funcionarios.email', 'descricao' => __('E-mail')]
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="5" :colsNames="['#', __('Nome'), __('Nascimento'), __('Departamento'), __('Função'), __('Ações')]" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="fotografia_documento,name,data_nascimento,departamentoName,funcaoName,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('funcionarios.form')
@endsection

@section('script')
    <!-- jsPDF -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf.js') }}"></script>
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf_autotable.js') }}"></script>

    <!-- Rotacionar Foto -->
    <script src="https://cdn.jsdelivr.net/npm/piexifjs"></script>

{{--    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>--}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"></script>

    <!-- QRCode.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

    <!-- scripts_funcionarios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_funcionarios.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
