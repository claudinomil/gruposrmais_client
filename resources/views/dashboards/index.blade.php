@extends('layouts.app')

@section('title') Dashboards @endsection

@section('topbar_title')
{{ __('Dashboards') }}
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
            <div class="card border-0 mb-4">
                <div class="card-body">
                    <div class="d-flex align-items-start alert alert-secondary p-1 mb-2" id="containerHeader">
                        <div class="me-3">
                            <i class="bx bxs-dashboard img-thumbnail font-size-24"></i>
                        </div>
                        <div class="me-3">
                            <div class="text-muted">
                                <h5 class="mb-1" id="dash_topo_titulo"></h5>
                            </div>
                        </div>
                        <div class="ms-auto dropdown">
                            <button class="btn btn-light btn-sm" type="button" onclick="abrirControle()">
                                <i class="bx bxs-cog align-middle me-1"></i> {{ __('Controle de Gráficos') }}
                            </button>
                        </div>
                    </div>

                    <!-- <div class="d-flex flex-wrap justify-content-start gap-2 g-2 mb-2" id="containerInformacoes"></div> -->

                    <div class="row g-1 mb-2" id="containerInformacoes"></div>

                    <div class="row g-2 mb-2" id="containerGraficos"></div>

                    <div class="offcanvas offcanvas-end" tabindex="-1" id="containerControle">
                        <div class="offcanvas-header">
                            <h4>Controle de Gráficos</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div class="mb-4 col-12" id="containerControleGrupos">&nbsp;</div>

                            <div class="mb-4 col-12">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-light text-primary col-12 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-office-building-outline font-size-18 me-1"></i> <span class="d-none d-sm-inline-block">Clientes x Edificações <i class="mdi mdi-chevron-down"></i></span></button>
                                    <div class="dropdown-menu p-3 col-12">
                                        <div class="mb-2">
                                            <label class="form-label small">{{ __('Cliente') }}</label>
                                            <select class="form-select form-select-sm" id="controle_ce_cliente_id" name="controle_ce_cliente_id">
                                                <option value="0">{{ __('Selecione...') }}</option>

                                                @foreach ($clientes as $cliente)
                                                <option value="{{ $cliente['id'] }}">{{ $cliente['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label small">{{ __('Edificação') }}</label>
                                            <select class="form-select form-select-sm" id="controle_ce_edificacao_id" name="controle_ce_edificacao_id">
                                                <option value="0" data-cliente_id="0">{{ __('Todos...') }}</option>

                                                @foreach ($edificacoes as $edificacao)
                                                <option value="{{ $edificacao['id'] }}" data-cliente_id="{{ $edificacao['cliente_id'] }}">{{ $edificacao['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label small">{{ __('Nível') }}</label>
                                            <select class="form-select form-select-sm" id="controle_ce_edificacao_nivel_id" name="controle_ce_edificacao_nivel_id">
                                                <option value="0" data-edificacao_id="0">{{ __('Todos...') }}</option>

                                                @foreach ($edificacoes_niveis as $edificacao_nivel)
                                                <option value="{{ $edificacao_nivel['id'] }}" data-edificacao_id="{{ $edificacao_nivel['edificacao_id'] }}">{{ $edificacao_nivel['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <button type="button" class="btn btn-sm btn-primary col-12 mt-2" id="controle_ce_gerar_dashboard">Gerar Dashboard</button>
                                    </div>
                                </div>
                            </div>


                            <input type="hidden" id="clienteId" name="clienteId" value="0" />
                            <input type="hidden" id="clienteName" name="clienteName" value="" />
                            <input type="hidden" id="edificacaoId" name="edificacaoId" value="0" />
                            <input type="hidden" id="edificacaoName" name="edificacaoName" value="" />
                            <input type="hidden" id="edificacaoNivelId" name="edificacaoNivelId" value="0" />
                            <input type="hidden" id="edificacaoNivelName" name="edificacaoNivelName" value="" />

                            <h5 class="text-primary pb-2">Gráficos Disponíveis</h5>

                            <div class="mb-4 d-flex gap-1">
                                <button class="btn btn-sm btn-primary" onclick="gerarGraficosSelecionados()">Gerar Selecionados</button>
                                <button class="btn btn-sm btn-secondary" onclick="alternarTodos(true)">Marcar Todos</button>
                                <button class="btn btn-sm btn-secondary" onclick="alternarTodos(false)">Desmarcar Todos</button>
                            </div>
                            <div id="containerControleGraficos"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
<!-- E-Charts -->
<script src="https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js"></script>

<!-- scripts_dashboards.js -->
<script src="{{ Vite::asset('resources/assets_template/js/scripts_dashboards.js')}}"></script>
@endsection
