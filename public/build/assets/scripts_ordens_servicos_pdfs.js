function gerar_ordem_servico(ordem_servico_id, ordem_servico_tipo_id, traducao = 'pt') {
    if (ordem_servico_tipo_id == 1) { ost1_ordem_servico_gerar_pdf(ordem_servico_id, traducao); }
    if (ordem_servico_tipo_id == 2) { ost2_ordem_servico_gerar_pdf(ordem_servico_id, traducao); }
    if (ordem_servico_tipo_id == 3) { ost3_ordem_servico_gerar_pdf(ordem_servico_id, traducao); }
    if (ordem_servico_tipo_id == 4) { ost4_ordem_servico_gerar_pdf(ordem_servico_id, traducao); }
}
