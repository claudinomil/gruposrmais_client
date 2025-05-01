@extends('layouts.app')

@section('title') Relatorios @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
@section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
@endcomponent

<div>
    <div class="row">
        <div class="row pt-3" id="divRelatorios"></div>
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
                            <label class="form-label">Grupo</label>
                            <select class="form-select" name="modal_relatorio1_grupo_id" id="modal_relatorio1_grupo_id">
                                <option value="0">Todos os Grupos</option>
                                @foreach ($grupos as $grupo)
                                    <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Idioma</label>
                            <select class="form-select" name="modal_relatorio1_idioma" id="modal_relatorio1_idioma">
                                <option value="1">Português</option>
                                <option value="2">Inglês</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio1_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio1(2)">Gerar</button>
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
                            <label class="form-label">Grupo</label>
                            <select class="form-select" name="modal_relatorio2_grupo_id" id="modal_relatorio2_grupo_id">
                                <option value="0">Todos os Grupos</option>
                                @foreach ($grupos as $grupo)
                                    <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Situação</label>
                            <select class="form-select" name="modal_relatorio2_situacao_id" id="modal_relatorio2_situacao_id">
                                <option value="0">Todos as Situações</option>
                                @foreach ($situacoes as $situacao)
                                    <option value="{{$situacao['id']}}">{{$situacao['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Idioma</label>
                            <select class="form-select" name="modal_relatorio2_idioma" id="modal_relatorio2_idioma">
                                <option value="1">Português</option>
                                <option value="2">Inglês</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio2_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio2(2)">Gerar</button>
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
                            <label class="form-label">Data</label>
                            <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio3_data" id="modal_relatorio3_data">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Usuário</label>
                            <select class="form-select" name="modal_relatorio3_user_id" id="modal_relatorio3_user_id">
                                <option value="0">Todos os Usuários</option>
                                @foreach ($users as $user)
                                    <option value="{{$user['id']}}">{{$user['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Submódulo</label>
                            <select class="form-select" name="modal_relatorio3_submodulo_id" id="modal_relatorio3_submodulo_id">
                                <option value="0">Todos os Submódulos</option>
                                @foreach ($submodulos as $submodulo)
                                    <option value="{{$submodulo['id']}}">{{$submodulo['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Operação</label>
                            <select class="form-select" name="modal_relatorio3_operacao_id" id="modal_relatorio3_operacao_id">
                                <option value="0">Todos as Operações</option>
                                @foreach ($operacoes as $operacao)
                                    <option value="{{$operacao['id']}}">{{$operacao['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Dado</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio3_dado" id="modal_relatorio3_dado">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Idioma</label>
                            <select class="form-select" name="modal_relatorio3_idioma" id="modal_relatorio3_idioma">
                                <option value="1">Português</option>
                                <option value="2">Inglês</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio3_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio3(2)">Gerar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 4 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio4" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio4_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Data</label>
                            <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio4_data" id="modal_relatorio4_data">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Título</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio4_title" id="modal_relatorio4_title">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Notificação</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio4_notificacao" id="modal_relatorio4_notificacao">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Usuário</label>
                            <select class="form-select" name="modal_relatorio4_user_id" id="modal_relatorio4_user_id">
                                <option value="0">Todos os Usuários</option>
                                @foreach ($users as $user)
                                    <option value="{{$user['id']}}">{{$user['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Idioma</label>
                            <select class="form-select" name="modal_relatorio4_idioma" id="modal_relatorio4_idioma">
                                <option value="1">Português</option>
                                <option value="2">Inglês</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio4_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio4(2)">Gerar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 5 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio5" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio5_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Nome</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio5_name" id="modal_relatorio5_name">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Descrição</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio5_descricao" id="modal_relatorio5_descricao">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">URL</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio5_url" id="modal_relatorio5_url">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Usuário</label>
                            <select class="form-select" name="modal_relatorio5_user_id" id="modal_relatorio5_user_id">
                                <option value="0">Todos os Usuários</option>
                                @foreach ($users as $user)
                                    <option value="{{$user['id']}}">{{$user['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Idioma</label>
                            <select class="form-select" name="modal_relatorio5_idioma" id="modal_relatorio5_idioma">
                                <option value="1">Português</option>
                                <option value="2">Inglês</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio5_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio5(2)">Gerar</button>
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
                            <label class="form-label">Data início</label>
                            <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio6_data_inicio" id="modal_relatorio6_data_inicio" value="25/04/2025">
                        </div>
                        <div class="form-group col-6 pb-3">
                            <label class="form-label">Data fim</label>
                            <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio6_data_fim" id="modal_relatorio6_data_fim" value="30/04/2025">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Cidade</label>
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
                            <label class="form-label">Idioma</label>
                            <select class="form-select" name="modal_relatorio6_idioma" id="modal_relatorio6_idioma">
                                <option value="1">Português</option>
                                <option value="2">Inglês</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio6_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio6(2)">Gerar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="loadingAviso" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); color: white; font-size: 20px; text-align: center; padding-top: 20%; z-index: 9999;">
    Gerando PDF, por favor aguarde...
</div>

@endsection

@section('script')
    <!-- jsPDF e AutoTable -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf.js') }}"></script>
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf_autotable.js') }}"></script>

    <!-- scripts_relatorios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_relatorios.js')}}"></script>
@endsection
