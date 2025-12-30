@extends('layouts.app')

@section('title') Relatorios @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
@section('page_title') {{ __(\App\Facades\Breadcrumb::getCurrentPageTitle()) }} @endsection
@endcomponent

<div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="row pt-3" id="divRelatorios">Aguarde...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 1 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio1" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio1_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Grupo') }}</label>
                        <select class="form-select" name="modal_relatorio1_grupo_id" id="modal_relatorio1_grupo_id">
                            <option value="0">{{ __('Todos os Grupos') }}</option>
                            @foreach ($grupos as $grupo)
                                <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio1_idioma" id="modal_relatorio1_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio1_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio1(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 2 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio2" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio2_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Grupo') }}</label>
                        <select class="form-select" name="modal_relatorio2_grupo_id" id="modal_relatorio2_grupo_id">
                            <option value="0">{{ __('Todos os Grupos') }}</option>
                            @foreach ($grupos as $grupo)
                                <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Situação') }}</label>
                        <select class="form-select" name="modal_relatorio2_situacao_id" id="modal_relatorio2_situacao_id">
                            <option value="0">{{ __('Todos as Situações') }}</option>
                            @foreach ($situacoes as $situacao)
                                <option value="{{$situacao['id']}}">{{$situacao['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio2_idioma" id="modal_relatorio2_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio2_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio2(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 3 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio3" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio3_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Data') }}</label>
                        <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio3_data" id="modal_relatorio3_data">
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Usuário') }}</label>
                        <select class="form-select" name="modal_relatorio3_user_id" id="modal_relatorio3_user_id">
                            <option value="0">Todos os Usuários</option>
                            @foreach ($users as $user)
                                <option value="{{$user['id']}}">{{$user['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Submódulo') }}</label>
                        <select class="form-select" name="modal_relatorio3_submodulo_id" id="modal_relatorio3_submodulo_id">
                            <option value="0">{{ __('Todos os Submódulos') }}</option>
                            @foreach ($submodulos as $submodulo)
                                <option value="{{$submodulo['id']}}">{{$submodulo['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Operação') }}</label>
                        <select class="form-select" name="modal_relatorio3_operacao_id" id="modal_relatorio3_operacao_id">
                            <option value="0">{{ __('Todos as Operações') }}</option>
                            @foreach ($operacoes as $operacao)
                                <option value="{{$operacao['id']}}">{{$operacao['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Dado') }}</label>
                        <input type="text" class="form-control form-control-sm" name="modal_relatorio3_dado" id="modal_relatorio3_dado">
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio3_idioma" id="modal_relatorio3_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio3_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio3(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 6 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio6" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio6_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-6 pb-3">
                        <label class="form-label">{{ __('Data início') }}</label>
                        <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio6_data_inicio" id="modal_relatorio6_data_inicio" value="{{ date('d/m/Y') }}">
                    </div>
                    <div class="form-group col-6 pb-3">
                        <label class="form-label">{{ __('Data fim') }}</label>
                        <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio6_data_fim" id="modal_relatorio6_data_fim" value="{{ date('d/m/Y') }}">
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Cidade') }}</label>
                        <select class="form-select" name="modal_relatorio6_cidade_id" id="modal_relatorio6_cidade_id">
                            <option value="88959ad9-b2f5-4a33-a8ec-ceff5a572ca5">Belford Roxo</option>
                            <option value="9d7b569c-ec84-4908-96ab-3706ec3bfc57">Cachoeiras de Macacú</option>
                            <option value="2cded3bc-5dfa-425b-a274-5c1a4b8838d5">Duque de Caxias</option>
                            <option value="b920f9ed-fa79-4fc0-bc53-ceb14598fa45">Guapimirim</option>
                            <option value="74000596-0e8d-4762-af55-6fba1db74ceb">Itaborai</option>
                            <option value="e6aa9117-3816-4f42-a7da-1b4b8eef6cdd">Itaguai</option>
                            <option value="dbd21829-f83c-4479-86c8-3f2953021740">Japeri</option>
                            <option value="d4231ca8-3c08-42e2-b877-ad00cc49cecf">Magé</option>
                            <option value="bd078555-2b04-4e46-a637-e87d70551a04">Maricá</option>
                            <option value="5a86d707-02ec-4e09-b497-b000b22f156b">Mesquita</option>
                            <option value="2a69c719-bffc-4839-b832-1ac02b9e873f">Nilópolis</option>
                            <option value="07335d05-e371-42fd-a8f0-42853ccf1a0f">Niterói</option>
                            <option value="7ab2a9b5-7727-4460-8007-eb58b78cc7c9">Nova Iguaçu</option>
                            <option value="6752c981-6a86-4e34-a484-f8b1e2228393">Paracambi</option>
                            <option value="17d2880a-2295-4a24-a480-96d9fa0d40d4">Queimados</option>
                            <option value="712f930a-db93-4363-a3c9-9eccc4f12a5f">Rio Bonito</option>
                            <option value="d1bf56cc-6d85-4e6a-a5f5-0ab3f4074be3" selected>Rio de Janeiro</option>
                            <option value="ab6bc6ed-952f-48f9-ad84-cbfd3dde53ba">São Gonçalo</option>
                            <option value="82f35929-e84c-4842-8181-1dc45a22785f">São João de Meriti</option>
                            <option value="7ee9135d-6f6a-4f95-91bb-c3a5021d409a">Seropédica</option>
                            <option value="c46741dc-bdd2-43d0-92fc-f4d95ed61bf1">Tanguá</option>
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio6_idioma" id="modal_relatorio6_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio6_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio6(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 7 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio7" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio7_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Executivos') }}</label>
                        <select class="form-select form-select-sm" name="modal_relatorio7_clientes_executivos_ids[]" id="modal_relatorio7_clientes_executivos_ids" multiple>
                            @foreach ($clientes_executivos as $cliente_executivo)
                                <option value="{{$cliente_executivo['id']}}">{{$cliente_executivo['executivo_nome']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Funcionários') }}</label>
                        <select class="form-select form-select-sm" name="modal_relatorio7_funcionarios_ids[]" id="modal_relatorio7_funcionarios_ids" multiple>
                            @foreach ($funcionarios as $funcionario)
                                <option value="{{$funcionario['id']}}">{{$funcionario['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio7_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio7(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 8 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio8" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio8_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Tipo') }}</label>
                        <select class="form-select" name="modal_relatorio8_ponto_tipo_id" id="modal_relatorio8_ponto_tipo_id">
                            <option value="0">{{ __('Todos os Tipos') }}</option>
                            @foreach ($pontos_tipos as $pontos_tipo)
                                <option value="{{$pontos_tipo['id']}}">{{$pontos_tipo['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Natureza') }}</label>
                        <select class="form-select" name="modal_relatorio8_ponto_natureza_id" id="modal_relatorio8_ponto_natureza_id">
                            <option value="0">{{ __('Todos as Naturezas') }}</option>
                            @foreach ($pontos_naturezas as $pontos_natureza)
                                <option value="{{$pontos_natureza['id']}}">{{$pontos_natureza['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Modelo') }}</label>
                        <select class="form-select" name="modal_relatorio8_modelo" id="modal_relatorio8_modelo">
                            <option value="1">{{ __('Relatório Analítico') }}</option>
                            <option value="2">{{ __('Relatório Sintético') }}</option>
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio8_idioma" id="modal_relatorio8_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio8_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio8(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 9 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio9" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio9_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio9_idioma" id="modal_relatorio9_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio9_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio9(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 10 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio10" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio10_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Material') }}</label>
                        <select class="form-select" name="modal_relatorio10_material_id" id="modal_relatorio10_material_id">
                            <option value="0">{{ __('Todos os Materiais') }}</option>
                            @foreach ($materiais as $material)
                                <option value="{{$material['id']}}">{{$material['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Categoria') }}</label>
                        <select class="form-select" name="modal_relatorio10_material_categoria_id" id="modal_relatorio10_material_categoria_id">
                            <option value="0">{{ __('Todas as Categorias') }}</option>
                            @foreach ($materiais_categorias as $material_categoria)
                                <option value="{{$material_categoria['id']}}">{{$material_categoria['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Local') }}</label>
                        <select class="form-select" name="modal_relatorio10_estoque_local_id" id="modal_relatorio10_estoque_local_id">
                            <option value="0">{{ __('Todos os Locais') }}</option>
                            @foreach ($estoques_locais as $estoque_local)
                                <option value="{{$estoque_local['id']}}">{{$estoque_local['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Empresa') }}</label>
                        <select class="form-select" name="modal_relatorio10_empresa_id" id="modal_relatorio10_empresa_id">
                            <option value="0">{{ __('Todas as Empresas') }}</option>
                            @foreach ($empresas as $empresa)
                                <option value="{{$empresa['id']}}">{{$empresa['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Cliente') }}</label>
                        <select class="form-select" name="modal_relatorio10_cliente_id" id="modal_relatorio10_cliente_id">
                            <option value="0">{{ __('Todos os Clientes') }}</option>
                            @foreach ($clientes as $cliente)
                                <option value="{{$cliente['id']}}">{{$cliente['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Situação') }}</label>
                        <select class="form-select" name="modal_relatorio10_material_situacao_id" id="modal_relatorio10_material_situacao_id">
                            <option value="0">{{ __('Todas as Situações') }}</option>
                            @foreach ($materiais_situacoes as $material_situacao)
                                <option value="{{$material_situacao['id']}}">{{$material_situacao['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio10_idioma" id="modal_relatorio10_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio10_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio10(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('script')

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script> -->


    <!-- jsPDF -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf.js') }}"></script>
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf_autotable.js') }}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"></script>

    <!-- Rotacionar Foto -->
    <script src="https://cdn.jsdelivr.net/npm/piexifjs"></script>

    <!-- QRCode.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <!-- jsPDF e AutoTable -->
    <!-- <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf.js') }}"></script> -->
    <!-- <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf_autotable.js') }}"></script> -->

    <!-- scripts_relatorios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_relatorios.js')}}"></script>
@endsection
