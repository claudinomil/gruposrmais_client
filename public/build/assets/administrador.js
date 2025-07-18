//Funções para Bacckup do Banco de Dados na API - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Bacckup do Banco de Dados na API - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function carregarBackupsBanco() {
    const response = await fetch('/administrador/backup/banco/carregar');
    const backups = await response.json();

    const tbody = document.querySelector("#tabelaBackupsBanco tbody");
    tbody.innerHTML = '';

    var qtd = 0;
    backups.forEach(backup => {
        qtd++;

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${qtd}</td>
            <td>${backup.nome}</td>
            <td>${backup.data}</td>
            <td>${backup.tamanho}</td>`;
        tbody.appendChild(tr);
    });

    document.getElementById('est_backups_banco').innerHTML = qtd;
}

async function criarBackupBanco() {
    document.getElementById('btn_criar_backup_banco').disabled = true;

    await fetch('/administrador/backup/banco/criar');

    carregarBackupsBanco();

    document.getElementById('btn_criar_backup_banco').disabled = false;
}
//Funções para Bacckup do Banco de Dados na API - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Bacckup do Banco de Dados na API - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para Bacckup Arquivos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Bacckup Arquivos - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async function carregarBackupsArquivos() {
    const response = await fetch('/administrador/backup/arquivos/carregar');
    const backups = await response.json();

    const tbody = document.querySelector("#tabelaBackupsArquivos tbody");
    tbody.innerHTML = '';

    var qtd = 0;
    backups.forEach(backup => {
        qtd++;

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${qtd}</td>
            <td>${backup.nome}</td>
            <td>${backup.data}</td>
            <td>${backup.tamanho}</td>`;
        tbody.appendChild(tr);
    });

    document.getElementById('est_backups_arquivos').innerHTML = qtd;
}

async function criarBackupArquivos() {
    document.getElementById('btn_criar_backup_arquivos').disabled = true;

    await fetch('/administrador/backup/arquivos/criar');

    carregarBackupsArquivos();

    document.getElementById('btn_criar_backup_arquivos').disabled = false;
}
//Funções para Bacckup Arquivos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Bacckup Arquivos - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

document.addEventListener('DOMContentLoaded', carregarBackupsBanco);
document.addEventListener('DOMContentLoaded', carregarBackupsArquivos);
