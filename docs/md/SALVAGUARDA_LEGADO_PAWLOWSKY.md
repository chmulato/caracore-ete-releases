# Cláusula de Salvaguarda de Legado — Simulador chmulato/ETE (Minerador 4.0 / Ouro 4.0)

Documento de referência em **Propriedade Intelectual e Direito Civil** para o simulador de Estação de Tratamento de Efluentes (ETE) e módulos Ambiental e Mineração. Objetivo: proteger a **Cara-Core Informática** e honrar a família do **Prof. Urivald Pawlowsky**, definindo os limites entre a **Inspiração Científica** e a **Propriedade de Software**.

---

## 1. Atribuição de Honra (Inspiração Científica)

O uso do nome **Pawlowsky**, das referências às suas contribuições acadêmicas e das equações e fundamentos científicos inspirados em seu legado constitui **homenagem** ao Professor **Urivald Pawlowsky**, titular da Universidade Federal do Paraná (UFPR), e à sua contribuição à Engenharia de Recursos Hídricos e Ambiental no Brasil.

Tal uso é de natureza **educativa e memorial**, reconhecendo que a base científica e didática aqui aplicada tem raízes no conhecimento público e acadêmico desenvolvido na UFPR e em instituições congêneres. Nenhuma afirmação de titularidade sobre o conhecimento científico em si é feita pela Cara-Core Informática; a empresa apenas **inspira-se** nesse legado para fins de ensino e simulação.

---

## 2. Cessão e Propriedade de Direitos de Software

Embora a **base científica** (teorias, equações, métodos publicados na literatura e no meio acadêmico) seja de domínio público ou de titularidade das instituições acadêmicas, os seguintes bens são **propriedade exclusiva** da **Cara-Core Informática**, inscrita sob CNPJ **23.969.028/0001-37**:

- O **código-fonte** do simulador (repositórios, algoritmos de implementação, scripts e demais artefatos de software).
- A **interface de usuário (UI/UX)**, incluindo layouts, fluxos, elementos visuais e experiência de uso.
- A **marca Minerador 4.0**, o nome comercial **Ouro 4.0** e demais sinais distintivos associados ao produto.

Nenhuma cessão de direitos sobre esses bens é feita ao usuário final além da licença de uso concedida nos Termos de Uso. A Cara-Core Informática reserva-se o direito de alterar, descontinuar ou licenciar o software nos termos que entender convenientes, sem que isso implique responsabilidade perante a família do Prof. Pawlowsky ou a UFPR.

---

## 3. Isenção de Responsabilidade (Disclaimer)

Os resultados produzidos pelo simulador, em especial os **resultados simbióticos** (módulo Ambiental e módulo Mineração), são **simulações computacionais** com finalidade educativa e de apoio à decisão. Eles **não substituem** análises técnicas, projetos de engenharia ou pareceres legais realizados por profissionais habilitados.

**A família do Prof. Urivald Pawlowsky, a UFPR e demais instituições acadêmicas citadas não possuem responsabilidade técnica, comercial ou legal** pelas decisões tomadas pelos usuários do software, pelos resultados da simulação ou pelo uso que se faça deles. A responsabilidade pelo uso do simulador e pelas consequências de decisões baseadas em seus resultados é exclusivamente do **usuário** e, quando aplicável, da **Cara-Core Informática** na qualidade de titular e licenciante do software.

---

## 4. Uso de Imagem e Direito de Personalidade

Qualquer **imagem, selo, assinatura ou representação visual** que utilize a face, o nome ou elementos identificadores do Prof. Urivald Pawlowsky é utilizada **em memória e para fins estritamente educativos**, com o propósito de atribuir crédito e honra à sua trajetória acadêmica.

A Cara-Core Informática compromete-se a **não ferir o direito de imagem e à honra** da família do professor. O uso de selos ou referências visuais deve observar:

- **Consentimento ou menção de memória:** quando houver uso de imagem ou assinatura, deve haver consentimento prévio da família ou, na ausência disso, menção explícita de que se trata de **tributo em memória**, sem fins comerciais que envolvam a figura do professor além do contexto educativo.
- **Escopo educativo:** o uso restringe-se a contextos de ensino, divulgação científica e reconhecimento do legado, sem associação a propaganda comercial que possa ofender a dignidade ou a memória do homenageado.

Em caso de solicitação da família ou de titulares de direitos de personalidade, a Cara-Core Informática compromete-se a avaliar a remoção ou o ajuste do uso em conformidade com a legislação aplicável (Lei Civil e Marco Civil da Internet).

---

## 5. Resumo para Termos de Uso e Créditos (Versão ao Usuário)

Para exibição na seção **Termos de Uso e Créditos** do software e antes da primeira ativação da versão Premium:

- **Crédito e homenagem:** O nome e o legado científico do Prof. Pawlowsky são usados em homenagem à sua contribuição à UFPR e à engenharia brasileira.
- **Propriedade do software:** Código, interface e marcas (Minerador 4.0 / Ouro 4.0) são propriedade exclusiva da Cara-Core Informática (CNPJ 23.969.028/0001-37).
- **Disclaimer:** Resultados são simulações; família e universidade não se responsabilizam por decisões dos usuários.
- **Imagem:** Uso de imagem/selo em memória e fins educativos, respeitando o direito de imagem da família.

---

---

## 6. Ação no software (implementação)

- **Seção "Termos de Uso e Créditos":** Acessível pelo **Selo de Qualidade Pawlowsky** em todas as telas em que o selo apareça. No portal caracore-ete-releases, o selo é um link para a página termos-uso-creditos.html.
- **Exibição antes da primeira ativação Premium:** O texto dos Termos de Uso e Créditos (resumo ou integral) deve ser exibido de forma **clara** antes da primeira ativação da versão Premium (R$ 29,90). No protótipo do painel simbiótico, isso é feito por meio de um modal exibido ao clicar em "Simular ativação" (ou, no app real, antes de validar a license.key pela primeira vez), com opção "Li e aceito" e botão "Continuar para ativação". O aceite pode ser persistido localmente (ex.: `ouro40_terms_accepted`) para não solicitar novamente no mesmo dispositivo.

No simulador chmulato/ETE, repetir a mesma lógica: exibir termos antes da primeira ativação Premium e disponibilizar o texto completo via Selo de Qualidade.

---

*Documento redigido para fins de salvaguarda de legado e conformidade com Direito Civil e Propriedade Intelectual.*

