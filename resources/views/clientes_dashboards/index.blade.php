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
    </div>
@endsection

@section('script')
    <!-- E-Charts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js"></script>

    <!-- scripts_clientes_dashboards.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_clientes_dashboards.js')}}"></script>
@endsection
