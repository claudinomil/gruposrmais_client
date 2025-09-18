@extends('layouts.app')

@section('title') Fornecedores @endsection

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
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="fornecedores.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'fornecedores.name', 'descricao' => 'Nome'],
                                        ['value' => 'fornecedores.identidade', 'descricao' => 'Identidade'],
                                        ['value' => 'identidade_orgaos.name', 'descricao' => 'Órgão Identidade'],
                                        ['value' => 'fornecedores.cpf', 'descricao' => 'CPF'],
                                        ['value' => 'generos.name', 'descricao' => 'Gênero'],
                                        ['value' => 'estados_civis.name', 'descricao' => 'Estado Civil'],
                                        ['value' => 'fornecedores.pai', 'descricao' => 'Pai'],
                                        ['value' => 'fornecedores.mae', 'descricao' => 'Mãe'],
                                        ['value' => 'fornecedores.email', 'descricao' => 'E-mail']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="4" :colsNames="['#', 'Nome', 'Nascimento', 'Ações']" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="perfil,name,data_nascimento,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('fornecedores.form')
@endsection

@section('script')
    <!-- scripts_fornecedores.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_fornecedores.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
