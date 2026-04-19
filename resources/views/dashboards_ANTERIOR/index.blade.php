@extends('layouts.app')

@section('title') Dashboards @endsection

@section('css')
@endsection

@section('content')
@component('components.breadcrumb')
@section('page_title') {{ __(\App\Facades\Breadcrumb::getCurrentPageTitle()) }} @endsection
@endcomponent

<div id="crudTable">
    <div class="row">
        <div class="row" id="divGraficos"></div>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="dashboardCanvas">
        <div class="offcanvas-header">
            <h5>Gerar Gráficos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <div class="mb-4 d-flex gap-2">
                <button class="btn btn-sm btn-primary" onclick="dashboardGerarSelecionados()">Gerar Selecionados</button>
                <button class="btn btn-sm btn-secondary" onclick="dashboardToggleAll(true)">Marcar Todos</button>
                <button class="btn btn-sm btn-secondary" onclick="dashboardToggleAll(false)">Desmarcar Todos</button>
            </div>
            <div id="dashboardCanvasContent"></div>
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
