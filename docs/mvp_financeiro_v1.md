# MVP financeiro v1 (ETE Mineração)

Documento de escopo alinhado a `library/roadmap_ete.md` (Fase 1). Serve para congelar o que entra na primeira versão “decisão econômica” sem prometer precisão de FEED.

## Objetivo

Dar resposta coerente às perguntas: investimento (CAPEX), custo operacional (OPEX), retorno simples (payback), retorno descontado (VPL), taxa implícita (TIR), faixa de mercado (três cenários de receita) e choques mínimos de custo (sensibilidade).

## O que entra no MVP v1

| Elemento | Implementação | Observação |
|----------|----------------|------------|
| Premissas documentadas | `docs/premissas/` | Inventário versionado; atualizar data ao mudar número |
| CAPEX modular (faixa) | `AnalisadorEconomico.estimar_capex_planta` | Classe 5; breakdown na Auditoria |
| OPEX / tonelada | Derivado de `volume_mes_m3` e produção | KPI “custo por kg” como proxy |
| Payback | `calcular_payback` | Fluxo mensal constante |
| VPL | `calcular_vpl_fluxo_mensal_uniforme` | CAPEX em t=0; lucro mensal igual; taxa configurável na UI |
| TIR | `calcular_tir_anual_fluxo_mensal_uniforme` | Mesmo fluxo; pode ser `None` se não houver raiz |
| Cenários pessimista/base/otimista | `calcular_triplo_cenario_preco_receita` | Fatores 0,85 / 1,00 / 1,15 sobre **receita**; OPEX fixo |
| Sensibilidade | `matriz_sensibilidade_minima` | Choques +20% energia, +15% reagentes, +10% disposição (proxy logística) |
| Painéis Fase 2 (UI) | Nova etapa **Painéis decisório** no Streamlit Mineração | Issues #5–#7; expansores empilham bem em mobile |

## Fora do MVP v1 (Fase 1b / Fase 2)

- VPL/TIR **por cenário** de preço (apenas tabela de lucro mensal por cenário).
- Sensibilidade cruzada ou distribuição probabilística.
- OPEX variando com cenário de preço (reagentes indexados a mercado).
- Comparativo modular vs centralizado com **dois** fluxos simulados lado a lado (Fase 2).

## Referências de código

- `analise_economica.py` — funções novas no final do arquivo.
- `src/ete_mineracao/app_mineracao.py` — etapa **Viabilidade** e seções extras no relatório HTML.

## Responsável e revisão

Preencher nome e data em `library/roadmap_ete.md` (secção 6) na revisão mensal.
