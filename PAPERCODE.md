# Do Papel ao Simulador: Primeira Estimativa no Minerador 4.0

Este documento mostra, em linguagem didática, como fazer uma primeira estimativa "no papel" antes de interpretar os resultados do simulador **Minerador 4.0**.

O objetivo não é substituir laboratório, laudo, projeto de engenharia ou validação profissional. A proposta é ensinar o raciocínio: definir premissas, fechar balanço de massa, estimar custos e comparar cenários sem vender promessa fora de escopo.

> **Importante:** o código-fonte do simulador é proprietário. Este repositório público contém o portal, instaladores e documentação para uso educacional. As contas abaixo são uma referência pedagógica para entender o que o simulador organiza.

---

## 1. O Problema

Imagine uma lixívia mineral didática, isto é, uma solução líquida que representa material dissolvido após uma etapa de preparação mineral.

Queremos responder:

- Quanto material vai para o lodo precipitado?
- Quanto permanece na solução?
- O balanço de massa fecha?
- Qual cenário parece melhor na primeira leitura econômica?
- O maior pH sempre é melhor?

No simulador, essa pergunta aparece no espírito do painel:

```text
Campo  -> contexto e origem do material
Lab    -> pH, volume, concentração e precipitação
Mercado -> valor, custo, retorno e decisão
```

---

## 2. Premissas da Primeira Estimativa

Para este exemplo, usamos um cenário didático alinhado ao perfil `apatita_registro`.

| Premissa | Valor |
|---|---:|
| Volume de lixívia | 1,0 m³ |
| Volume em litros | 1.000 L |
| Perfil didático | `apatita_registro` |
| Eficiência de captura | 85% |
| Cenários de pH final | 8,8 / 9,5 / 10,2 |
| Tipo de leitura | Educacional / primeira estimativa |

Os valores abaixo foram gerados pela aplicação em ambiente de simulação e arredondados para leitura humana.

---

## 3. Regra Principal: Balanço de Massa

Antes de falar em dinheiro, pureza ou ROI, a primeira pergunta é:

```text
Entrada - Lodo - Solução = 0
```

Ou, em forma equivalente:

```text
Entrada = Lodo + Solução
```

Se essa conta não fecha, o restante da análise perde confiança. Em simulação computacional, é normal aparecer um erro muito pequeno por arredondamento numérico. O que queremos é erro praticamente zero.

---

## 4. Conta no Papel: Cenário A

Para o cenário A, com pH final 8,8, a aplicação retornou:

| Grandeza | Valor |
|---|---:|
| Massa total inicial | 9.015,2500 g |
| Massa total no lodo | 6.469,0042 g |
| Massa total na solução | 2.546,2458 g |

Agora fazemos a conta no papel:

```text
Erro = Entrada - Lodo - Solução

Erro = 9.015,2500 - 6.469,0042 - 2.546,2458
Erro = aproximadamente 0,0000 g
```

A aplicação retornou erro bruto de aproximadamente:

```text
1,82e-12 g
```

Isso é zero numérico para a finalidade didática. A diferença vem da forma como computadores representam números decimais.

---

## 5. Três Cenários Comparados

| Cenário | pH final | Entrada (g) | Lodo (g) | Solução (g) | Erro do balanço |
|---|---:|---:|---:|---:|---:|
| A - Conservador | 8,8 | 9.015,2500 | 6.469,0042 | 2.546,2458 | ~0,00 g |
| B - Balanceado | 9,5 | 9.015,2500 | 6.573,2248 | 2.442,0252 | ~0,00 g |
| C - Agressivo | 10,2 | 9.015,2500 | 6.993,8261 | 2.021,4239 | ~0,00 g |

Leitura simples:

- Ao aumentar o pH final, mais massa vai para o lodo.
- A solução fica com menos massa residual.
- O balanço fecha nos três casos.
- Isso ainda não diz qual cenário é melhor; só diz que a contabilidade física da simulação está coerente.

---

## 6. Primeira Leitura Técnica e Econômica

Depois de conferir massa, podemos olhar indicadores de processo e valor.

| Cenário | Recuperação TR | Pureza do lodo | Massa capturada | Receita app | Custo total app | Lucro bruto | ROI app |
|---|---:|---:|---:|---:|---:|---:|---:|
| A - Conservador | 98,98% | 83,71% | 5,50 kg | R$ 162,10 | R$ 32,86 | R$ 129,25 | 393,36% |
| B - Balanceado | 99,99% | 83,23% | 5,59 kg | R$ 159,80 | R$ 33,67 | R$ 126,13 | 374,60% |
| C - Agressivo | 100,00% | 78,23% | 5,94 kg | R$ 150,19 | R$ 39,07 | R$ 111,12 | 284,44% |

O cenário C captura mais massa, mas isso não significa automaticamente melhor decisão. Nesta simulação, ele reduz a pureza do lodo e piora o retorno financeiro. O cenário A, mesmo mais conservador, apresenta a melhor leitura financeira inicial.

Essa é uma das lições centrais do Minerador 4.0:

```text
Maior captura não é sempre melhor decisão.
Maior número não é sempre melhor processo.
Simular é enxergar o custo da escolha.
```

---

## 7. Como Reproduzir a Lógica no Simulador

No uso didático, siga este roteiro:

1. Abra o **Minerador 4.0**.
2. Valide a etapa ambiental quando aplicável.
3. No Lab, ajuste o volume, o pH e a concentração.
4. Rode a simulação.
5. Confira se a massa de entrada se distribui entre lodo e solução.
6. Compare pureza, recuperação, custo, receita e retorno.
7. Discuta o resultado antes de acreditar no maior número da tela.

O ponto não é decorar a tabela. O ponto é aprender a perguntar:

```text
O balanço fecha?
O ganho de recuperação compensa a perda de pureza?
O custo cresceu mais que o valor?
O cenário é aula, hipótese ou decisão de engenharia?
```

---

## 8. O Que Este Documento Não É

Este documento não é:

- laudo químico;
- recomendação de investimento;
- projeto de planta;
- ART;
- validação industrial;
- garantia de recuperação;
- garantia de retorno financeiro.

É um exemplo público de raciocínio técnico para primeira estimativa.

---

## 9. Onde Baixar e Estudar

- Portal público: [ete.caracore.com.br](https://ete.caracore.com.br/)
- Instaladores oficiais: [Releases do caracore-ete-releases](https://github.com/chmulato/caracore-ete-releases/releases)
- Canal de melhorias: [ete.caracore.com.br/canal-feedback.html](https://ete.caracore.com.br/canal-feedback.html)

---

## 10. Resumo Final

Uma boa simulação começa no papel:

```text
Entrada = Lodo + Solução
```

Depois vem a interpretação:

```text
Pureza + recuperação + custo + valor + risco = decisão melhor informada
```

O Minerador 4.0 existe para transformar essa conversa em experiência prática: uma ponte entre química, Python, educação técnica e soberania mineral.
