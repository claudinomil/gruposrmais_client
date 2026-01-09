@extends('layouts.app-without-nav')

@section('body')
    <body>
@endsection

@section('content')
    @if ($dados['produto'] !== null)
        @php
        $produto = $dados['produto'];

        $produto_nome = $produto['nome'];
        $produto_descricao = $produto['descricao'];
        $produto_fotografia = $produto['fotografia'];
        $produto_ca = $produto['ca'];
        $produto_categoria = $produto['categoria'];
        $produto_numero_patrimonio = $produto['numero_patrimonio'];
        $produto_local = $produto['local'];
        $produto_situacao = $produto['situacao'];
        $produto_estoque_id = $produto['estoque_id'];
        $produto_local_empresa = $produto['local_empresa'];
        $produto_local_cliente = $produto['local_cliente'];

        $movimentacoes = $dados['movimentacoes'];
        @endphp

        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="pt-2">
                        <h2><img src="{{ asset('build/assets/images/produtos/produto-0.png') }}" alt="" width="50px">{{ __('Informação Patrimônio') }}: {{ $produto_numero_patrimonio }} - {{ $produto_nome }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-5">
                                <img src="{{ asset($produto_fotografia) }}" alt="" width="250px">
                            </div>
                            <div class="col-12 col-md-7">
                                <div class="mt-4 mt-xl-3">
                                    <h4 class="mt-1 mb-3">{{ $produto_nome }}</h4>
                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Patrimônio: {{ $produto_numero_patrimonio }}</p>
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Categoria: {{ $produto_categoria }}</p>
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> CA: {{ $produto_ca }}</p>
                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Local: {{ $produto_local }}</p>

                                            @if ($produto_estoque_id == 1)
                                                <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Empresa: {{ $produto_local_empresa }}</p>
                                            @endif

                                            @if ($produto_estoque_id == 2)
                                                <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Cliente: {{ $produto_local_cliente }}</p>
                                            @endif

                                            <p class="text-muted"><i class="fas fa-check-double font-size-12 align-middle text-primary me-1"></i> Situação: {{ $produto_situacao }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            <h5 class="mb-3">{{ __('Movimentações') }}:</h5>

                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>TIPO</th>
                                            <th>DATA</th>
                                            <th>ORIGEM</th>
                                            <th>DESTINO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($movimentacoes as $movimentacao)
                                            @php

                                            if ($movimentacao['origemEstoqueId'] == 1) {
                                                $origem = $movimentacao['origemEstoqueLocalName'].' - '.$movimentacao['origemEstoqueName'].' - '.$movimentacao['origemEmpresaName'];
                                            } else {
                                                $origem = $movimentacao['origemEstoqueLocalName'].' - '.$movimentacao['origemEstoqueName'].' - '.$movimentacao['origemClienteName'];
                                            }

                                            if ($movimentacao['destinoEstoqueId'] == 1) {
                                                $destino = $movimentacao['destinoEstoqueLocalName'].' - '.$movimentacao['destinoEstoqueName'].' - '.$movimentacao['destinoEmpresaName'];
                                            } else {
                                                $destino = $movimentacao['destinoEstoqueLocalName'].' - '.$movimentacao['destinoEstoqueName'].' - '.$movimentacao['destinoClienteName'];
                                            }

                                            @endphp

                                            <tr>
                                                <th scope="row">1</th>
                                                <td>{{ $movimentacao['tipo'] }}</td>
                                                <td>{{ \App\Services\SuporteService::getDataFormatada(1, $movimentacao['data_movimentacao']).'  '.$movimentacao['hora_movimentacao'] }}</td>
                                                <td>{{ $origem }}</td>
                                                <td>{{ $destino }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="col-12">
            <div class="pt-2">
                <h2><img src="{{ asset('build/assets/images/produtos/produto-0.png') }}" alt="" width="50px">{{ __('Informação Patrimônio') }}: {{ $produto_numero_patrimonio }} - {{ __('Não encontrado') }}</h2>
            </div>
        </div>
    @endif



        <!--

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-6">
                                        <div class="product-detai-imgs">
                                            <div class="row">
                                                <div class="col-md-2 col-sm-3 col-4">
                                                    <div class="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                        <a class="nav-link active" id="product-1-tab" data-bs-toggle="pill" href="#product-1" role="tab" aria-controls="product-1" aria-selected="true">
                                                            <img src="assets/images/product/img-7.png" alt="" class="img-fluid mx-auto d-block rounded">
                                                        </a>
                                                        <a class="nav-link" id="product-2-tab" data-bs-toggle="pill" href="#product-2" role="tab" aria-controls="product-2" aria-selected="false">
                                                            <img src="assets/images/product/img-8.png" alt="" class="img-fluid mx-auto d-block rounded">
                                                        </a>
                                                        <a class="nav-link" id="product-3-tab" data-bs-toggle="pill" href="#product-3" role="tab" aria-controls="product-3" aria-selected="false">
                                                            <img src="assets/images/product/img-7.png" alt="" class="img-fluid mx-auto d-block rounded">
                                                        </a>
                                                        <a class="nav-link" id="product-4-tab" data-bs-toggle="pill" href="#product-4" role="tab" aria-controls="product-4" aria-selected="false">
                                                            <img src="assets/images/product/img-8.png" alt="" class="img-fluid mx-auto d-block rounded">
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-7 offset-md-1 col-sm-9 col-8">
                                                    <div class="tab-content" id="v-pills-tabContent">
                                                        <div class="tab-pane fade show active" id="product-1" role="tabpanel" aria-labelledby="product-1-tab">
                                                            <div>
                                                                <img src="assets/images/product/img-7.png" alt="" class="img-fluid mx-auto d-block">
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="product-2" role="tabpanel" aria-labelledby="product-2-tab">
                                                            <div>
                                                                <img src="assets/images/product/img-8.png" alt="" class="img-fluid mx-auto d-block">
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="product-3" role="tabpanel" aria-labelledby="product-3-tab">
                                                            <div>
                                                                <img src="assets/images/product/img-7.png" alt="" class="img-fluid mx-auto d-block">
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="product-4" role="tabpanel" aria-labelledby="product-4-tab">
                                                            <div>
                                                                <img src="assets/images/product/img-8.png" alt="" class="img-fluid mx-auto d-block">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <button type="button" class="btn btn-primary waves-effect waves-light mt-2 me-1">
                                                            <i class="bx bx-cart me-2"></i> Add to cart
                                                        </button>
                                                        <button type="button" class="btn btn-success waves-effect  mt-2 waves-light">
                                                            <i class="bx bx-shopping-bag me-2"></i>Buy now
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-6">
                                        <div class="mt-4 mt-xl-3">
                                            <a href="javascript: void(0);" class="text-primary">Headphone</a>
                                            <h4 class="mt-1 mb-3">Wireless Headphone (Black)</h4>

                                            <p class="text-muted float-start me-3">
                                                <span class="bx bxs-star text-warning"></span>
                                                <span class="bx bxs-star text-warning"></span>
                                                <span class="bx bxs-star text-warning"></span>
                                                <span class="bx bxs-star text-warning"></span>
                                                <span class="bx bxs-star"></span>
                                            </p>
                                            <p class="text-muted mb-4">( 152 Customers Review )</p>

                                            <h6 class="text-success text-uppercase">20 % Off</h6>
                                            <h5 class="mb-4">Price : <span class="text-muted me-2"><del>$240 USD</del></span> <b>$225 USD</b></h5>
                                            <p class="text-muted mb-4">To achieve this, it would be necessary to have uniform grammar pronunciation and more common words If several languages coalesce</p>
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div>
                                                        <p class="text-muted"><i class="bx bx-unlink font-size-16 align-middle text-primary me-1"></i> Wireless</p>
                                                        <p class="text-muted"><i class="bx bx-shape-triangle font-size-16 align-middle text-primary me-1"></i> Wireless Range : 10m</p>
                                                        <p class="text-muted"><i class="bx bx-battery font-size-16 align-middle text-primary me-1"></i> Battery life : 6hrs</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div>
                                                        <p class="text-muted"><i class="bx bx-user-voice font-size-16 align-middle text-primary me-1"></i> Bass</p>
                                                        <p class="text-muted"><i class="bx bx-cog font-size-16 align-middle text-primary me-1"></i> Warranty : 1 Year</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="product-color">
                                                <h5 class="font-size-15">Color :</h5>
                                                <a href="javascript: void(0);" class="active">
                                                    <div class="product-color-item border rounded">
                                                        <img src="assets/images/product/img-7.png" alt="" class="avatar-md">
                                                    </div>
                                                    <p>Black</p>
                                                </a>
                                                <a href="javascript: void(0);">
                                                    <div class="product-color-item border rounded">
                                                        <img src="assets/images/product/img-7.png" alt="" class="avatar-md">
                                                    </div>
                                                    <p>Blue</p>
                                                </a>
                                                <a href="javascript: void(0);">
                                                    <div class="product-color-item border rounded">
                                                        <img src="assets/images/product/img-7.png" alt="" class="avatar-md">
                                                    </div>
                                                    <p>Gray</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-5">
                                    <h5 class="mb-3">Specifications :</h5>

                                    <div class="table-responsive">
                                        <table class="table mb-0 table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th scope="row" style="width: 400px;">Category</th>
                                                    <td>Headphone</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Brand</th>
                                                    <td>JBL</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Color</th>
                                                    <td>Black</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Connectivity</th>
                                                    <td>Bluetooth</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Warranty Summary</th>
                                                    <td>1 Year</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="mt-5">
                                    <h5>Reviews :</h5>

                                    <div class="d-flex py-3 border-bottom">
                                        <div class="flex-shrink-0 me-3">
                                            <img src="assets/images/users/avatar-2.jpg" class="avatar-xs rounded-circle" alt="img" />
                                        </div>

                                        <div class="flex-grow-1">
                                            <h5 class="mb-1 font-size-15">Brian</h5>
                                            <p class="text-muted">If several languages coalesce, the grammar of the resulting language.</p>
                                            <ul class="list-inline float-sm-end mb-sm-0">
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);"><i class="far fa-thumbs-up me-1"></i> Like</a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);"><i class="far fa-comment-dots me-1"></i> Comment</a>
                                                </li>
                                            </ul>
                                            <div class="text-muted font-size-12"><i class="far fa-calendar-alt text-primary me-1"></i> 5 hrs ago</div>
                                        </div>
                                    </div>
                                    <div class="d-flex py-3 border-bottom">
                                        <div class="flex-shrink-0 me-3">
                                            <img src="assets/images/users/avatar-4.jpg" class="avatar-xs rounded-circle" alt="img" />
                                        </div>

                                        <div class="flex-grow-1">
                                            <h5 class="font-size-15 mb-1">Denver</h5>
                                            <p class="text-muted">To an English person, it will seem like simplified English, as a skeptical Cambridge</p>
                                            <ul class="list-inline float-sm-end mb-sm-0">
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);"><i class="far fa-thumbs-up me-1"></i> Like</a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);"><i class="far fa-comment-dots me-1"></i> Comment</a>
                                                </li>
                                            </ul>
                                            <div class="text-muted font-size-12"><i class="far fa-calendar-alt text-primary me-1"></i> 07 Oct, 2019</div>
                                            <div class="d-flex mt-4">
                                                <div class="flex-shrink-0 me-2">
                                                    <img src="assets/images/users/avatar-5.jpg" class="avatar-xs me-3 rounded-circle" alt="img" />
                                                </div>

                                                <div class="flex-grow-1">
                                                    <h5 class="mb-1 font-size-15">Henry</h5>
                                                    <p class="text-muted">Their separate existence is a myth. For science, music, sport, etc.</p>
                                                    <ul class="list-inline float-sm-end mb-sm-0">
                                                        <li class="list-inline-item">
                                                            <a href="javascript: void(0);"><i class="far fa-thumbs-up me-1"></i> Like</a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a href="javascript: void(0);"><i class="far fa-comment-dots me-1"></i> Comment</a>
                                                        </li>
                                                    </ul>
                                                    <div class="text-muted font-size-12"><i class="far fa-calendar-alt text-primary me-1"></i> 08 Oct, 2019</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex py-3 border-bottom">
                                        <div class="flex-shrink-0 me-3">
                                            <div class="avatar-xs">
                                                <span class="avatar-title bg-primary bg-soft text-primary rounded-circle font-size-16">
                                                    N
                                                </span>
                                            </div>
                                        </div>

                                        <div class="flex-grow-1">
                                            <h5 class="mb-1 font-size-15">Neal</h5>
                                            <p class="text-muted">Everyone realizes why a new common language would be desirable.</p>
                                            <ul class="list-inline float-sm-end mb-sm-0">
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);"><i class="far fa-thumbs-up me-1"></i> Like</a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);"><i class="far fa-comment-dots me-1"></i> Comment</a>
                                                </li>
                                            </ul>
                                            <div class="text-muted font-size-12"><i class="far fa-calendar-alt text-primary me-1"></i> 05 Oct, 2019</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-12">
                        <div>
                            <h5 class="mb-3">Recent product :</h5>

                            <div class="row">
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col-md-4">
                                                    <img src="assets/images/product/img-7.png" alt="" class="img-fluid mx-auto d-block">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text-center text-md-start pt-3 pt-md-0">
                                                        <h5 class="text-truncate"><a href="javascript: void(0);" class="text-dark">Wireless Headphone</a></h5>
                                                        <p class="text-muted mb-4">
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star"></i>
                                                        </p>
                                                        <h5 class="my-0"><span class="text-muted me-2"><del>$240</del></span> <b>$225</b></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col-md-4">
                                                    <img src="assets/images/product/img-4.png" alt="" class="img-fluid mx-auto d-block">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text-center text-md-start pt-3 pt-md-0">
                                                        <h5 class="text-truncate"><a href="javascript: void(0);" class="text-dark">Phone patterned cases</a></h5>
                                                        <p class="text-muted mb-4">
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star"></i>
                                                        </p>
                                                        <h5 class="my-0"><span class="text-muted me-2"><del>$150</del></span> <b>$145</b></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col-md-4">
                                                    <img src="assets/images/product/img-6.png" alt="" class="img-fluid mx-auto d-block">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text-center text-md-start pt-3 pt-md-0">

                                                        <h5 class="text-truncate"><a href="javascript: void(0);" class="text-dark">Phone Dark Patterned cases</a></h5>
                                                        <p class="text-muted mb-4">
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star text-warning"></i>
                                                            <i class="bx bxs-star"></i>
                                                        </p>
                                                        <h5 class="my-0"><span class="text-muted me-2"><del>$138</del></span> <b>$135</b></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        -->






@endsection
