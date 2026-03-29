<div>
    <div class="table-responsive pt-4">
        <table class="table table-bordered dt-responsive table-striped w-100" id="datatable-crud-ajax">
            <thead>
                <tr>
                    @foreach($tableColsNames as $tableColName)
                        @if($tableColName == 'Ações')
                            <th width="140px">{{ mb_strtoupper('Ações') }}</th>
                        @elseif($tableColName == 'CNPJ')
                            <th style="white-space: nowrap;">{{mb_strtoupper($tableColName)}}</th>
                        @else
                            <th>{{mb_strtoupper($tableColName)}}</th>
                        @endif
                    @endforeach
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>
