@extends('layouts.app')

@section('title') Mapas @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
        @section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
    @endcomponent

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                        @if(\App\Facades\Permissoes::permissao(['list']))
                            <!-- Mapas -->
                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Escolher Mapa <i class="mdi mdi-chevron-down"></i></button>
                                <div class="dropdown-menu dropdown-menu-dark">
                                    <a class="dropdown-item" href="#" id="mp_escolher">Mapa</a>
                                </div>
                            </div>

                            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Montar Mapa</button>
                        @endif
                    </div>
                    <div class="col-12 col-md-12 mt-3" style="height: 600px; margin-bottom: 1rem;" id="mp_mapa"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- OffCanvas -->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h3 class="col-11">Montar Mapa</h3>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="row g-2">
                <div class="col-md-6">
                    <a href="#" class="btn btn-primary btn-sm dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">POIs Sistema Individual <i class="mdi mdi-chevron-down"></i></a>
                    <div class="dropdown-menu p-2">
                        <div class="mb-2">
                            <input type="text" id="input-poi-search" class="form-control form-control-sm" placeholder="Buscar POIs..." oninput="pontoInteresseIndividualAutocomplete(this.value)">
                            <div id="autocomplete-pois" class="list-group mt-1"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <a href="#" class="btn btn-info btn-sm dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">POIs Sistema Grupo <i class="mdi mdi-chevron-down"></i></a>
                    <div class="dropdown-menu p-2">
                        @foreach ($mapas_pontos_tipos as $mapa_ponto_tipo)
                            <a href="#" class="dropdown-item small text-info ps-1" onclick="mapItensPontosInteresseGrupo({{ $mapa_ponto_tipo['id'] }});">
                                <i class="fa fa-map-marked me-1 font-size-14"></i> POI's Sistema ({{ $mapa_ponto_tipo['name'] }})
                            </a>
                        @endforeach
                    </div>
                </div>

                <div class="col-md-6">
                    <a href="#" class="btn btn-success btn-sm dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">POIs Google Grupo <i class="mdi mdi-chevron-down"></i></a>
                    <div class="dropdown-menu p-2">
                        <!-- POIs Google attraction -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.attraction');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Attraction)
                        </a>

                        <!-- POIs Google park -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.park');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Park)
                        </a>

                        <!-- POIs Google school -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.school');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (School)
                        </a>

                        <!-- POIs Google place_of_worship -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.place_of_worship');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Place of Worship)
                        </a>

                        <!-- POIs Google medical -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.medical');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Medical)
                        </a>

                        <!-- POIs Google business -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.business');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Business)
                        </a>

                        <!-- POIs Google government -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.government');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Government)
                        </a>

                        <!-- POIs Google sports_complex -->
                        <a href="#" class="dropdown-item small text-success ps-1" onclick="mapItensPontosGoogle('poi.sports_complex');">
                            <i class="fa fa-star me-1 font-size-14"></i> POI's Google (Sports Complex)
                        </a>
                    </div>
                </div>

                <div class="col-md-6">
                    <a href="#" class="btn btn-warning btn-sm dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">Outros Itens <i class="mdi mdi-chevron-down"></i></a>
                    <div class="dropdown-menu p-2">
                        <a href="#" class="dropdown-item small text-warning ps-1" onclick="mapItensPoligonosComunidades();">
                            <i class="fa fa-draw-polygon me-1 font-size-14"></i> Comunidades (Polígonos)
                        </a>
                        <a href="#" class="dropdown-item small text-warning ps-1" onclick="configOfcanvas(1);">
                            <i class="fa fa-map-marker me-1 font-size-14"></i> Pontos Personalizados
                        </a>
                        <a href="#" class="dropdown-item small text-warning ps-1" onclick="configOfcanvas(2);">
                            <i class="fa fa-route me-1 font-size-14"></i> Rotas Personalizadas
                        </a>
                        <a href="#" class="dropdown-item small text-warning ps-1" onclick="configOfcanvas(3);">
                            <i class="fa fa-map-marked-alt me-1 font-size-14"></i> Rotas Órdem Serviço
                        </a>
                    </div>
                </div>
            </div>

            <hr />

            <!-- Pontos Personalizados - Início -->
            <!-- Pontos Personalizados - Início -->
            <div class="col-12 py-3 bg-light rounded-1 p-1" id="div_ponto_personalizado" style="display: none;">
                <form id="form_ponto_personalizado">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-4">
                            <button type="submit" class="btn btn-outline-success btn-sm w-100">Salvar Ponto</button>
                        </div>
                        <div class="col-12 col-md-6 mb-4">
                            <button type="button" class="btn btn-outline-warning btn-sm w-100" onclick="configOfcanvas();">Fechar</button>
                        </div>
                        <div class="col-12 col-md-6 mb-2">
                            <label for="mapa_ponto_tipo_id" class="form-label">Ponto Tipo</label>
                            <select class="form-select form-select-sm" name="mapa_ponto_tipo_id" id="mapa_ponto_tipo_id" required>
                                <option value="">Selecione...</option>
                                @foreach ($mapas_pontos_tipos as $mapa_ponto_tipo)
                                    <option value="{{ $mapa_ponto_tipo['id'] }}">{{ $mapa_ponto_tipo['name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12 col-md-6 mb-2">
                            <label for="name" class="form-label">Nome</label>
                            <input type="text" class="form-control form-control-sm" id="name" name="name" required>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="descricao" class="form-label">Descrição</label>
                            <input type="text" class="form-control form-control-sm" id="descricao" name="descricao">
                        </div>
                        <div class="col-12 col-md-6 mb-2">
                            <label for="latitude" class="form-label">Latitude</label>
                            <input type="text" class="form-control form-control-sm" id="latitude" name="latitude" required>
                        </div>
                        <div class="col-12 col-md-6 mb-2">
                            <label for="longitude" class="form-label">Longitude</label>
                            <input type="text" class="form-control form-control-sm" id="longitude" name="longitude" required>
                        </div>
                        <div class="col-12 col-md-6 mb-2">
                            <label class="form-label">
                                Ícone&nbsp;&nbsp;
                                <a href="#" class="texto-primary" data-bs-toggle="modal" data-bs-target="#modalIcons" id="buscarIcones">
                                    <i class="mdi mdi-search-web"></i> Buscar
                                </a>
                            </label>
                            <div class="row">
                                <div class="col-10">
                                    <input type="text" class="form-control form-control-sm" id="icone" name="icone" required readonly>
                                </div>
                                <div class="col-2 d-flex align-items-center">
                                    <img id="iconView" style="height: 24px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Pontos Personalizados - Fim -->
            <!-- Pontos Personalizados - Fim -->

            <!-- Rotas Personalizadas - Início -->
            <!-- Rotas Personalizadas - Início -->
            <div class="col-12 py-3 bg-light p-1" id="div_rota_personalizada" style="display: none;">
                <form id="form_rota_personalizada">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-4">
                            <button type="submit" class="btn btn-outline-success btn-sm w-100">Salvar Rota</button>
                        </div>
                        <div class="col-12 col-md-6 mb-4">
                            <button type="button" class="btn btn-outline-warning btn-sm w-100" onclick="configOfcanvas();">Fechar</button>
                        </div>
                        <div class="col-12 col-md-6 mb-2">
                            <label for="rota_name" class="form-label">Nome</label>
                            <input type="text" class="form-control form-control-sm" id="rota_name" name="rota_name" required>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="rota_descricao" class="form-label">Descrição</label>
                            <input type="text" class="form-control form-control-sm" id="rota_descricao" name="rota_descricao">
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="cep_origem" class="form-label">CEP Origem</label>
                            <input type="text" class="form-control form-control-sm mask_cep" id="cep_origem" name="cep_origem" required>
                        </div>
                        <div class="col-12 col-md-5 mb-2">
                            <label for="numero_origem" class="form-label">Número Origem</label>
                            <input type="text" class="form-control form-control-sm" id="numero_origem" name="numero_origem">
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="cep_destino" class="form-label">CEP Destino</label>
                            <input type="text" class="form-control form-control-sm mask_cep" id="cep_destino" name="cep_destino" required>
                        </div>
                        <div class="col-12 col-md-5 mb-2">
                            <label for="numero_destino" class="form-label">Número Destino</label>
                            <input type="text" class="form-control form-control-sm" id="numero_destino" name="numero_destino">
                        </div>
                    </div>
                </form>
            </div>
            <!-- Rotas Personalizadas - Fim -->
            <!-- Rotas Personalizadas - Fim -->

            <!-- Rotas Ordem de Serviço - Início -->
            <!-- Rotas Ordem de Serviço - Início -->
            <div class="col-12 py-3 bg-light p-1" id="div_rota_ordem_servico" style="display: none;">
                <form id="form_rota_ordem_servico">
                    <div class="row mt-2">
                        <div class="col-12 col-md-12 mb-2">
                            <label for="ordem_servico_id" class="form-label">Órdem Serviço</label>
                            <select class="form-select form-select-sm" name="ordem_servico_id" id="ordem_servico_id" required>
                                <option value="">Selecione...</option>
                                @foreach ($ordens_servicos as $ordem_servico)
                                    <option value="{{ $ordem_servico['id'] }}">{{ 'Ordem Serviço nº. '.$ordem_servico['numero_ordem_servico'].'/'.$ordem_servico['ano_ordem_servico'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Rotas Ordem de Serviço - Fim -->
            <!-- Rotas Ordem de Serviço - Fim -->

            <!-- Grade de Itens - Início -->
            <!-- Grade de Itens - Início -->
            <div class="col-12 py-3">
                <h6 class="text-primary">Grade de Itens no Mapa</h6>
                <table class="table table-sm table-striped align-middle mb-2 small" id="map_itens_tabela">
                    <thead class="table-light">
                    <tr>
                        <th scope="col">Item</th>
                        {{--                        <th scope="col">Nome</th>--}}
                        <th scope="col" class="text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <!-- Grade de Itens - Fim -->
            <!-- Grade de Itens - Fim -->
        </div>
    </div>

    <!-- Icons modal -->
    <div class="modal fade modal-dialog-scrollable" id="modalIcons" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ícones</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        @php
                            $dados = array_filter(scandir('build/assets/images/icones/mapas'), function($arquivo) {
                                return pathinfo($arquivo, PATHINFO_EXTENSION) === 'png';
                            });

                            foreach ($dados as $nome) {
                                echo "<div class='col-md-4 text-center pb-5'>
                                        <a href='#' class='text-black' onClick=\"$('#icone').val('".$nome."'); $('#iconView').removeClass(); $('#iconView').attr('src', 'build/assets/images/icones/mapas/".$nome."'); $('#modalIcons').modal('hide');\">
                                            <img src='build/assets/images/icones/mapas/$nome'>
                                            <div class='text-center'>".$nome."</div>
                                        </a>
                                      </div>";
                            }
                        @endphp

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <!-- scripts_mapas.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_mapas.js')}}"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyARmoDmjUAPxUg4J5Ztuq1ceSqZK6i3WbM"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
@endsection

@section('script-bottom')
@endsection
