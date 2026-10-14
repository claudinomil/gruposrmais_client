@extends('layouts.app')

@section('title') Funcionários @endsection

@section('topbar_title')
{{ __('Funcionários') }}
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
                                    <x-button-crud op="1" onclick="crudCreate();" />
                                    @endif

                                    <!-- Ações para serem feitas com Funcionários -->
                                    @if (\App\Facades\Permissoes::permissao(['edit']))
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary text-white mb-2 waves-effect btn-label waves-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-clipboard-list label-icon"></i>Ações com Funcionários</button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#" onclick="funcionarioAcaoControle(1, 1)">Entregas de Uniformes</a>
                                        </div>
                                    </div>
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="funcionarios.name">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                    $selectCampoPesquisar = [
                                    ['value' => 'funcionarios.name', 'descricao' => __('Nome')],
                                    ['value' => 'tomador_servico_clientes.name', 'descricao' => __('Tomador de Serviço')],
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
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="fotografia_documento,funcionario,data_nascimento,departamentoName,funcaoName,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Funcionário Ação 1 - Entregas de Uniformes -->
<div class="modal fade" id="modal_funcionario_acao_1" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header p-4" style="background-color: #2a3042;">
                <div class="row w-100">
                    <div class="col-lg-4">
                        <div class="d-flex">
                            <div class="me-3">
                                <i class="fas fa-clipboard-list avatar-sm rounded-circle img-thumbnail text-center align-content-center" style="font-size: 30px; color: #2a3042;"></i>
                            </div>
                            <div class="align-self-center">
                                <p class="mb-0 font-size-18 text-warning">Entregas de Uniformes</p>
                                <p class="mb-1 font-size-12 text-light" id="modal_funcionario_acao_1_subtitulo">Grade de Registros</p>
                                <div class="clearfix mt-4 mt-lg-2">
                                    <div class="dropdown float-start">
                                        <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="bx bxs-cog align-middle me-1"></i> Opções
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-start">
                                            @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                            <a class="dropdown-item" href="#" onclick="funcionarioAcaoControle(1, 2);">Nova Entrega de Uniformes</a>
                                            <a class="dropdown-item" href="#" onclick="funcionarioAcaoControle(1, 1);">Grade de Entregas de Uniformes</a>
                                            @endif

                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#" data-bs-dismiss="modal">Fechar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 align-self-center">
                        <div class="text-lg-center mt-4 mt-lg-0">
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-light text-truncate font-size-12 mb-2">Entregas Realizadas</p>
                                    <h5 class="text-light font-size-12 mb-0" id="modal_funcionario_acao_1_total_entregas_realizadas">0</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="col-12" id="funcionario_acao_1_div_visualizar" style="display: none;">
                    <div class="row">
                        <div class="col-12 col-md-5">
                            <div class="mb-3">
                                <label class="form-label small">Tomador de Serviço</label>
                                <div id="modal_funcionario_acao_1_tomador_servico_cliente_nome_visualizar"></div>
                            </div>
                        </div>
                        <div class="col-12 col-md-3">
                            <div class="mb-3">
                                <label class="form-label small">Função</label>
                                <div id="modal_funcionario_acao_1_funcao_nome_visualizar"></div>
                            </div>
                        </div>
                        <div class="col-12 col-md-2">
                            <div class="mb-3">
                                <label class="form-label small">Número da Entrega</label>
                                <div id="modal_funcionario_acao_1_numero_entrega_visualizar"></div>
                            </div>
                        </div>
                        <div class="col-12 col-md-2">
                            <div class="mb-3">
                                <label class="form-label small">Data da Entrega</label>
                                <div id="modal_funcionario_acao_1_data_entrega_visualizar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-2">
                        <h6 class="text-primary"><i class="fas fa-table"></i> Funcionários x Uniformes</h6>
                        <div class="table-responsive mt-3">
                            <table class="table table-sm table-hover align-middle mb-0">
                                <thead class="table-light small">
                                    <tr>
                                        <th class="text-center">ITEM</th>
                                        <th>FUNCIONÁRIO</th>
                                        <th>UNIFORME</th>
                                        <th class="text-center">QUANTIDADE</th>
                                        <th class="text-center">TAMANHO</th>
                                    </tr>
                                </thead>
                                <tbody class="small" id="modal_funcionario_acao_1_grade_uniformes_visualizar"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-12" id="funcionario_acao_1_div_edicao" style="display: none;">
                    <form>
                        <input type="hidden" id="entrega_uniforme_id" name="entrega_uniforme_id" value="0">

                        <div class="mb-3">
                            <button type="button" class="btn btn-sm btn-success w-md" onclick="funcionario_acao_1_Store()" id="funcionario_acao_1_botao_incluir" style="display: none;">Confirmar Inclusão</button>
                            <button type="button" class="btn btn-sm btn-primary w-md" onclick="funcionario_acao_1_Update()" id="funcionario_acao_1_botao_alterar" style="display: none;">Confirmar Alteração</button>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-7">
                                <div class="mb-3">
                                    <label for="modal_funcionario_acao_1_tomador_servico_cliente_id" class="form-label small">Tomador de Serviço</label>
                                    <select class="form-select form-select-sm" id="modal_funcionario_acao_1_tomador_servico_cliente_id" name="modal_funcionario_acao_1_tomador_servico_cliente_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($tomadores_servicos as $tomador_servico)
                                        <option value="{{ $tomador_servico['id'] }}">{{ $tomador_servico['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-5">
                                <div class="mb-3">
                                    <label for="modal_funcionario_acao_1_funcao_id" class="form-label small">Função</label>
                                    <select class="form-select form-select-sm" id="modal_funcionario_acao_1_funcao_id" name="modal_funcionario_acao_1_funcao_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($funcoes as $funcao)
                                        <option value="{{ $funcao['id'] }}">{{ $funcao['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row my-2">
                            <h6 class="text-primary"><i class="fas fa-table"></i> Funcionários x Uniformes</h6>
                            <div class="col-12" id="modal_funcionario_acao_1_escolher">
                                <div class="row align-items-end">
                                    <div class="col-12 col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label small" for="modal_funcionario_acao_1_escolher_funcionario_id">Funcionário</label>
                                            <select class="form-select form-select-sm" id="modal_funcionario_acao_1_escolher_funcionario_id" name="modal_funcionario_acao_1_escolher_funcionario_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($funcionarios as $funcionario)
                                                <option value="{{ $funcionario['id'] }}" data-tomador_servico_id="{{ $funcionario['tomador_servico_cliente_id'] }}" data-funcao_id="{{ $funcionario['funcao_id'] }}">{{ $funcionario['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-3">
                                        <div class="mb-3">
                                            <label class="form-label small" for="modal_funcionario_acao_1_escolher_uniforme_id">Uniforme</label>
                                            <select class="form-select form-select-sm" id="modal_funcionario_acao_1_escolher_uniforme_id" name="modal_funcionario_acao_1_escolher_uniforme_id">
                                                <option value="">Selecione...</option>

                                                @foreach ($uniformes as $uniforme)
                                                <option value="{{ $uniforme['id'] }}" data-funcionarios_campo="{{ $uniforme['funcionarios_campo'] }}">{{ $uniforme['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-1">
                                        <div class="mb-3">
                                            <label class="form-label small" for="modal_funcionario_acao_1_escolher_quantidade">Quantidade</label>
                                            <input type="number" min="1" step="1" class="form-control form-control-sm" id="modal_funcionario_acao_1_escolher_quantidade" name="modal_funcionario_acao_1_escolher_quantidade">
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-1">
                                        <div class="mb-3">
                                            <label class="form-label small" for="modal_funcionario_acao_1_escolher_tamanho">Tamanho</label>
                                            <input type="text" maxlength="10" class="form-control form-control-sm" id="modal_funcionario_acao_1_escolher_tamanho" name="modal_funcionario_acao_1_escolher_tamanho">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-3">
                                        <div class="mb-3">
                                            <label class="form-label small">Opções</label>
                                            <div class="d-flex gap-1">
                                                <button type="button" class="btn btn-sm btn-success" id="modal_funcionario_acao_1_escolher_adicionar_btn"><i class="fas fa-plus"></i> Adicionar</button>
                                                <button type="button" class="btn btn-sm btn-primary d-none" id="modal_funcionario_acao_1_escolher_salvar_btn"><i class="fas fa-save"></i> Salvar</button>
                                                <button type="button" class="btn btn-sm btn-secondary d-none" id="modal_funcionario_acao_1_escolher_cancelar_btn"><i class="fas fa-times"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive mt-3">
                                    <table class="table table-sm table-hover align-middle mb-0">
                                        <thead class="table-light small">
                                            <tr>
                                                <th class="text-center">ITEM</th>
                                                <th>FUNCIONÁRIO</th>
                                                <th>UNIFORME</th>
                                                <th class="text-center">QUANTIDADE</th>
                                                <th class="text-center">TAMANHO</th>
                                                <th class="text-center">AÇÕES</th>
                                            </tr>
                                        </thead>
                                        <tbody class="small" id="modal_funcionario_acao_1_grade_uniformes"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-12" id="funcionario_acao_1_div_grade_registros" style="display: none;">
                    <div class="row">
                        <div class="table-responsive mt-3">
                            <table class="table table-sm table-hover align-middle mb-0">
                                <thead class="table-light small">
                                    <tr>
                                        <th class="text-center">ITEM</th>
                                        <th>NÚMERO ENTREGA</th>
                                        <th>DATA ENTREGA</th>

                                        @if(\App\Facades\Permissoes::permissao(['funcionarios_edit']))
                                        <th class="text-end">&nbsp;</th>
                                        @endif
                                    </tr>
                                </thead>
                                <tbody class="small" id="modal_funcionario_acao_1_grade_registros"></tbody>
                            </table>
                        </div>
                    </div>
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

{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script> --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"></script>

<!-- QRCode.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

<!-- scripts_funcionarios.js -->
<script src="{{ Vite::asset('resources/assets_template/js/scripts_funcionarios.js')}}"></script>

@endsection

@section('script-bottom')
@endsection
