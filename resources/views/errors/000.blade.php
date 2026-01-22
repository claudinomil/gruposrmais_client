@extends('layouts.app-without-nav')

@section('title') Erro @endsection

@section('body')

    <body>
    @endsection

    @section('content')

        <div class="account-pages my-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center mb-5">
                            <h1 class="display-2 fw-medium">{{ substr($code, 0, 1) }}<i class="bx bx-buoy bx-spin text-primary display-3"></i>{{ substr($code, 2, 1) }}</h1>
                            <h4 class="text-uppercase">
                                @php
                                    $messages = explode("##", $message);

                                    foreach ($messages as $msg) {
                                        echo "<div>".$msg.'</div>';
                                    }
                                @endphp
                            </h4>

                            @if($backpage)
                            <div class="mt-5 text-center">
                                <a class="btn btn-primary waves-effect waves-light" href="#" onclick="window.history.go(-1); return false;">Back Page</a>
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-8 col-xl-6">
                        <div class="text-center">
                            <img src="{{ asset('build/assets/images/error-img.png') }}" alt="" class="img-fluid" width="400px">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    @endsection
