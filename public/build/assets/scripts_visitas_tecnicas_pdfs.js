function gerar_visita_tecnica(visita_tecnica_id, visita_tecnica_tipo_id, traducao = 'pt', vt_cs = 1) {
    if (visita_tecnica_tipo_id == 1) { vtt1_visitaTecnicaGerarPdf(visita_tecnica_id, traducao, vt_cs); }
    if (visita_tecnica_tipo_id == 2) {vtt2_visitaTecnicaGerarPdf(visita_tecnica_id, traducao, vt_cs);}
}
