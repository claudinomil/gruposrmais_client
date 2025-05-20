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
            <!-- Dropdown -->
            <div class="dropdown col-10">
                <a href="#" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onclick="mp_config_ofcanvas(3);">Opções para o Mapa <i class="mdi mdi-chevron-down"></i></a>
                <div class="dropdown-menu p-2">
                    @foreach ($mapas_pontos_tipos as $mapa_ponto_tipo)
                        <div class="form-check mb-1">
                            <input class="form-check-input" type="checkbox" id="mapa_ponto_tipo_{{ $mapa_ponto_tipo['id'] }}" onclick="mp_pontos_interesse({{ $mapa_ponto_tipo['id'] }});">
                            <label class="form-check-label ms-1 small" for="mapa_ponto_tipo_{{ $mapa_ponto_tipo['id'] }}">POI's Sistema ({{ $mapa_ponto_tipo['name'] }})</label>
                        </div>
                    @endforeach

                    <!-- POIs Google attraction -->
                    <hr />
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_attraction" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_">POI's Google (Attraction)</label>
                    </div>

                    <!-- POIs Google park -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_park" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_park">POI's Google (Park)</label>
                    </div>

                    <!-- POIs Google school -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_school" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_school">POI's Google (School)</label>
                    </div>

                    <!-- POIs Google place_of_worship -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_place_of_worship" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_">POI's Google (Place of Worship)</label>
                    </div>

                    <!-- POIs Google medical -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_medical" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_medical">POI's Google (Medical)</label>
                    </div>

                    <!-- POIs Google business -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_business" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_business">POI's Google (Business)</label>
                    </div>

                    <!-- POIs Google government -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_government" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_government">POI's Google (Government)</label>
                    </div>

                    <!-- POIs Google sports_complex -->
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="pois_google_sports_complex" onclick="mp_mapa_POIs_google();">
                        <label class="form-check-label ms-1 small" for="pois_google_sports_complex">POI's Google (Sports Complex)</label>
                    </div>

                    <!-- Comunidades Polígonos -->
                    <hr />
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" id="comunidades" onclick="mp_mapa_comunidades();">
                        <label class="form-check-label ms-1 small" for="comunidades">Comunidades (Polígonos)</label>
                    </div>

                    <hr />
                    <a href="#" class="dropdown-item small text-primary ps-1" onclick="mp_config_ofcanvas(1);">
                        <i class="fa fa-map-marker me-1 font-size-14"></i> Inserir Ponto Personalizado
                    </a>
                    <a href="#" class="dropdown-item small text-success ps-1" onclick="mp_config_ofcanvas(2);">
                        <i class="fa fa-route me-1 font-size-14"></i> Inserir Rota
                    </a>
                </div>
            </div>

            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- Pontos Personalizados -->
            <div class="col-12" id="div_ponto_personalizado" style="display: none;">
                <form id="form_ponto_personalizado">
                    <input type="hidden" id="ponto_id" name="ponto_id">

                    <div class="row mt-2">
                        <div class="col-12 col-md-12 mb-4">
                            <button type="submit" class="btn btn-success btn-sm col-12">Salvar Ponto Personalizado</button>
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

            <!-- Rotas Personalizadas -->
            <div class="col-12" id="div_rota_personalizada" style="display: none;">
                <form id="form_rota_personalizada">
                    <input type="hidden" id="rota_id" name="rota_id">

                    <div class="row mt-2">
                        <div class="col-12 col-md-12 mb-4">
                            <button type="submit" class="btn btn-success btn-sm col-12">Salvar Rota Personalizada</button>
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="cep_origem" class="form-label">CEP Origem</label>
                            <input type="text" class="form-control form-control-sm mask_cep" id="cep_origem" name="cep_origem" required>
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="numero_origem" class="form-label">Número Origem</label>
                            <input type="text" class="form-control form-control-sm" id="numero_origem" name="numero_origem">
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="complemento_origem" class="form-label">Compl. Origem</label>
                            <input type="text" class="form-control form-control-sm" id="complemento_origem" name="complemento_origem">
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="cep_destino" class="form-label">CEP Destino</label>
                            <input type="text" class="form-control form-control-sm mask_cep" id="cep_destino" name="cep_destino" required>
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="numero_destino" class="form-label">Número Destino</label>
                            <input type="text" class="form-control form-control-sm" id="numero_destino" name="numero_destino">
                        </div>
                        <div class="col-12 col-md-4 mb-2">
                            <label for="complemento_destino" class="form-label">Compl. Destino</label>
                            <input type="text" class="form-control form-control-sm" id="complemento_destino" name="complemento_destino">
                        </div>
                    </div>
                </form>
            </div>

            <!-- Grade de Pontos Personalizados -->
            <div class="col-12 pb-3" id="grade_ponto_personalizado" style="display: none;">
                <h6 class="text-primary">Pontos Personalizados</h6>
                <table class="table table-sm table-striped align-middle mb-2 small" id="tabelaPontos">
                    <thead class="table-light">
                    <tr>
                        <th scope="col">Tipo/Nome</th>
                        <th scope="col" class="text-center text-end">Ações</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <!-- Grade de Rotas Personalizadas -->
            <div class="col-12 pb-3" id="grade_rota_personalizada" style="display: none;">
                <h6 class="text-primary">Rotas Personalizadas</h6>
                <table class="table table-sm table-striped align-middle mb-2 small" id="tabelaRotas">
                    <thead class="table-light">
                    <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nome</th>
                        <th scope="col" class="text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
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
