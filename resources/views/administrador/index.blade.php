<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Grupo SR+ - Administrador</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- CSS -->
        <link href="{{asset('build/assets/bootstrap.css')}}" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <link href="{{asset('build/assets/app.css')}}" id="app-style" rel="stylesheet" type="text/css" />

        <!-- JS -->
        <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jquery/jquery.min.js') }}"></script>
        <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/bootstrap/bootstrap.min.js') }}"></script>

        @if($permissao === true)
            <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/js/administrador.js') }}"></script>
        @endif
    </head>
    <body>
        @if($permissao === true)
            <div class="row" id="header">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9 col-lg-3">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-3">
                                        <img src="build/assets/images/users/avatar-0.png" alt="" class="avatar-md rounded-circle img-thumbnail">
                                    </div>
                                    <div class="flex-grow-1 align-self-center">
                                        <div class="text-muted">
                                            <h3 class="mb-2">Grupo SR+</h3>
                                            <h5 class="mb-1">Administrador</h5>
                                            <p class="mb-0">Claudino Mil</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-7 d-none d-lg-block">
                                <div class="text-lg-center">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Usuários</p>
                                                <h5 class="mb-0" id="est_usuarios">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Backups Banco</p>
                                                <h5 class="mb-0" id="est_backups_banco">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Backups Arquivos</p>
                                                <h5 class="mb-0" id="est_backups_arquivos">0</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3 col-lg-2 mt-3 mt-lg-0">
                                <div class="clearfix mt-4 mt-lg-0">
                                    <div class="dropdown float-end">
                                        <button class="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="bx bxs-cog align-middle me-1"></i> Opções
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="#">Backups Banco</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row px-3" id="backups">
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h4 class="card-title m-0">Backups Banco de Dados</h4>
                                <button class="btn btn-sm btn-success" onclick="criarBackupBanco();" id="btn_criar_backup_banco">Criar Backup</button>
                            </div>
                            <div class="table-responsive" style="max-height: 250px; overflow-y: auto;">
                                <table class="table table-sm mb-0" id="tabelaBackupsBanco">
                                    <thead class="table-light sticky-top">
                                    <tr>
                                        <th>#</th>
                                        <th>>{{ __('Nome') }}</th>
                                        <th>Data</th>
                                        <th>Tamanho</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h4 class="card-title m-0">Backups Arquivos</h4>
                                <button class="btn btn-sm btn-success" onclick="criarBackupArquivos();" id="btn_criar_backup_arquivos">Criar Backup</button>
                            </div>
                            <div class="table-responsive" style="max-height: 250px; overflow-y: auto;">
                                <table class="table table-sm mb-0" id="tabelaBackupsArquivos">
                                    <thead class="table-light sticky-top">
                                    <tr>
                                        <th>#</th>
                                        <th>>{{ __('Nome') }}</th>
                                        <th>Data</th>
                                        <th>Tamanho</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @else
            <div class="text-center text-danger font-size-20 mt-5">Permissão Negada.</div>
        @endif
    </body>
</html>
