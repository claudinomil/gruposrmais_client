@extends('layouts.app')

@section('title') Clientes Relatorios @endsection

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

<!-- Modal Relatorio 11 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio11" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio11_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-6 pb-3">
                        <label class="form-label">{{ __('Data início') }}</label>
                        <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio11_data_inicio" id="modal_relatorio11_data_inicio" value="{{ date('d/m/Y') }}">
                    </div>
                    <div class="form-group col-6 pb-3">
                        <label class="form-label">{{ __('Data fim') }}</label>
                        <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio11_data_fim" id="modal_relatorio11_data_fim" value="{{ date('d/m/Y') }}">
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Cidade') }}</label>
                        <select class="form-select" name="modal_relatorio11_cidade_id" id="modal_relatorio11_cidade_id">
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
                        <select class="form-select" name="modal_relatorio11_idioma" id="modal_relatorio11_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio11_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio11(2)">{{ __('Gerar') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Relatorio 12 -->
<div class="modal fade bs-example-modal-sm" id="modal_relatorio12" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_relatorio12_titulo">Xxxxxxxxxxxx</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Tipo') }}</label>
                        <select class="form-select" name="modal_relatorio12_ponto_tipo_id" id="modal_relatorio12_ponto_tipo_id">
                            <option value="0">{{ __('Todos os Tipos') }}</option>
                            @foreach ($pontos_tipos as $pontos_tipo)
                                <option value="{{$pontos_tipo['id']}}">{{$pontos_tipo['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Natureza') }}</label>
                        <select class="form-select" name="modal_relatorio12_ponto_natureza_id" id="modal_relatorio12_ponto_natureza_id">
                            <option value="0">{{ __('Todos as Naturezas') }}</option>
                            @foreach ($pontos_naturezas as $pontos_natureza)
                                <option value="{{$pontos_natureza['id']}}">{{$pontos_natureza['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Modelo') }}</label>
                        <select class="form-select" name="modal_relatorio12_modelo" id="modal_relatorio12_modelo">
                            <option value="1">{{ __('Relatório Analítico') }}</option>
                            <option value="2">{{ __('Relatório Sintético') }}</option>
                        </select>
                    </div>
                    <div class="form-group col-12 pb-3">
                        <label class="form-label">{{ __('Idioma') }}</label>
                        <select class="form-select" name="modal_relatorio12_idioma" id="modal_relatorio12_idioma">
                            <option value="1">{{ __('Português') }}</option>
                            <option value="2">{{ __('Inglês') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio12_cancelar">{{ __('Cancelar') }}</button>
                    <button type="button" class="btn btn-primary" onclick="relatorio12(2)">{{ __('Gerar') }}</button>
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

    <!-- scripts_clientes_relatorios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_clientes_relatorios.js')}}"></script>
@endsection
