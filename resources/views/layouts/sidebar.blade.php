<div class="vertical-menu" id="div_menu_vertical">
    <div data-simplebar class="h-100">
        <div id="sidebar-menu">@php echo \App\Facades\Menu::getMenu(1) @endphp</div>

        @if(session('gsrm_cliente_id') != 0)
        <div class="text-center">
            <img src="{{ asset('build/assets/images/image_logo_layout_light_menu.png') }}" height="40">
        </div>
        @endif
    </div>
</div>
