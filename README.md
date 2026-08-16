# Coros Portugal — website

Website institucional da Coros Portugal. Astro (site) + Sanity (CMS) + Vercel (hosting).
PT (idioma principal, sem prefixo de URL) e EN (`/en/...`).

## Estrutura do repositório

```
/                     — site Astro (o que é publicado em corosportugal.pt)
  src/pages/          — rotas PT na raiz, rotas EN em src/pages/en/
  src/components/     — componentes partilhados (Header, Footer, cards, formulário)
  src/layouts/        — BaseLayout.astro (SEO, JSON-LD, header/footer)
  src/lib/sanity.ts   — cliente Sanity + funções de fetch (devolvem [] / null se
                        PUBLIC_SANITY_PROJECT_ID não estiver definido, para o site
                        continuar a funcionar antes de existir projeto Sanity)
  src/content/        — texto institucional (PT) e política de privacidade,
                        usados como fallback caso o Sanity ainda não tenha conteúdo
  src/i18n/           — dicionário de strings de interface (ui.ts) + helpers
  src/pages/api/contact.ts — endpoint serverless do formulário de contacto

studio/               — Sanity Studio (projeto separado, não faz parte do build do site)
  schemaTypes/        — evento, coroAssociado, paginaInstitucional
```

## Desenvolvimento local

```sh
npm install
cp .env.example .env   # preencher variáveis reais quando existirem
npm run dev
```

| Comando           | Ação                                          |
| ------------------ | ---------------------------------------------- |
| `npm run dev`       | Servidor local em `localhost:4321`             |
| `npm run build`     | Build de produção para `./dist/`               |
| `npm run preview`   | Pré-visualização do build (via adaptador Vercel) |

O Studio corre à parte:

```sh
cd studio
npm install
npm run dev   # abre em localhost:3333
```

## Variáveis de ambiente

Ver `.env.example`. Nenhuma é obrigatória para correr o site localmente — sem elas, a
Agenda/Histórico e o diretório de coros aparecem vazios, e o formulário de contacto e a
inscrição de coros mostram um aviso "por configurar" em vez de falhar.

| Variável | Onde se usa | Obter em |
| --- | --- | --- |
| `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` | `src/lib/sanity.ts` | [sanity.io/manage](https://www.sanity.io/manage), depois de criar o projeto |
| `PUBLIC_GOOGLE_FORM_COROS_URL` | embed do formulário em `/coros-associados` | Google Forms → Enviar → Incorporar `<iframe>` → copiar o `src` |
| `RESEND_API_KEY`, `CONTACT_FORM_TO_EMAIL` | `src/pages/api/contact.ts` | [resend.com](https://resend.com), após verificar o domínio `corosportugal.pt` |

Em produção (Vercel), estas variáveis são definidas em Project Settings → Environment
Variables — nunca commitadas no repositório.

## Sanity — configuração inicial

Ainda não existe projeto Sanity para a Coros Portugal. Passos para criar:

1. Criar conta/projeto em [sanity.io/manage](https://www.sanity.io/manage) (usar uma conta
   ligada ao email institucional da associação, não uma pessoal).
2. Copiar o `Project ID` gerado para `PUBLIC_SANITY_PROJECT_ID` (no site) e para
   `SANITY_STUDIO_PROJECT_ID` (no Studio, ao correr `npm run deploy` dentro de `studio/`).
3. Em `studio/`, correr `npx sanity deploy` para publicar o Studio num URL tipo
   `corosportugal.sanity.studio` — é aí que a Direção vai editar conteúdo, sem precisar
   deste repositório.
4. No Studio, abrir "Página institucional" — já vem pré-preenchida com o texto oficial
   da Missão/Visão/Valores (ver `studio/schemaTypes/paginaInstitucional.ts`); basta gravar
   o documento para o site passar a lê-lo do Sanity em vez do fallback em
   `src/content/institutional.ts`.

### Convidar novos editores

No Studio (ou em sanity.io/manage → o projeto → Members), adicionar o email da pessoa com a
role **Editor**. O plano gratuito do Sanity inclui 2 utilizadores não-admin — acrescentar mais
implica upgrade pago (~15 USD/utilizador/mês). Manter o número de editores a 1–2 membros
designados da Direção.

## Coros associados — processo de inscrição

A inscrição de novos coros **não é automática**. Fluxo:

1. O coro preenche o Google Form embutido na página `/coros-associados`
   (`PUBLIC_GOOGLE_FORM_COROS_URL`). O formulário e a respetiva Sheet de respostas devem
   pertencer a uma conta **Google Workspace institucional** (ex. `geral@corosportugal.pt`),
   nunca a uma conta pessoal — caso contrário a associação fica dependente de uma pessoa
   específica para aceder às inscrições.
2. Um membro da Direção revê as respostas na Sheet.
3. Se aprovado, esse membro cria manualmente um documento `coroAssociado` no Sanity Studio
   (nome, cidade, contacto, descrição, logótipo). **Só depois disto o coro aparece no
   diretório público** — não existe nenhuma automação a ligar o Google Form ao Sanity.
4. `[Por definir pela Direção: quem faz esta revisão e com que periodicidade.]`

O mesmo padrão de "aprovação manual = criação do documento" aplica-se — não há campo de
estado pendente/aprovado no schema (ver `studio/schemaTypes/coroAssociado.ts`).

## Deploy (Vercel) e domínio

1. Ligar o repositório GitHub a um novo projeto Vercel (framework preset: Astro, detetado
   automaticamente pelo adaptador `@astrojs/vercel`).
2. Definir as variáveis de ambiente da secção acima em Project Settings.
3. Domínio: **corosportugal.pt** (a confirmar — ver `⚠️` abaixo).
   - ⚠️ **Antes de mexer em qualquer registo DNS**: o registo `www` atual aponta para um IP
     (`81.88.57.70`) da Register S.p.A. (registador/hosting italiano), o que sugere que pode
     já existir site e/ou email ativos neste domínio. Confirmar com a Direção antes de
     avançar, para não desligar algo em uso.
   - Registos a configurar no painel do Vercel ao adicionar o domínio (confirmar valores
     exatos no momento, os abaixo são os genéricos documentados pela Vercel):

     | Tipo | Host | Valor |
     | --- | --- | --- |
     | A | `@` | `76.76.21.21` |
     | CNAME | `www` | `cname.vercel-dns.com` |

   - Decidir qual fica canónico (`corosportugal.pt` vs `www.corosportugal.pt`) e
     redirecionar o outro — afeta SEO. Atualizar `SITE_URL` em `astro.config.mjs` e o
     `Sitemap:` em `public/robots.txt` de acordo com a decisão.
   - DNS de email (`MX`, `SPF`, `DKIM`) é um bloco **separado** do DNS do site — necessário
     se o Google Workspace institucional usar este domínio para email. Fácil de esquecer e só
     dar por falta quando o email deixa de chegar.
4. **Duplicar esta documentação fora do GitHub**: manter também um documento em
   linguagem simples no Drive/Docs da Direção com o nome do domínio, o registador, onde
   estão as credenciais do painel do registador, e os registos DNS ativos — para quem
   precisar de mexer no domínio no futuro e não tiver conta GitHub.

## Notas técnicas

- Formulário de contacto: endpoint on-demand (`export const prerender = false`) em
  `src/pages/api/contact.ts`, envia email via Resend. Inclui campo honeypot simples contra
  spam (sem CAPTCHA).
- `npm audit` assinala 3 vulnerabilidades "high" em `path-to-regexp`, uma dependência
  transitiva do `@astrojs/vercel` usada apenas para gerar configuração de rotas no build —
  não afeta código exposto a pedidos públicos. Rever ao atualizar o adaptador Vercel.
- `studio/`: `sanity` está fixado em `^6.9.2` (a versão inicial `^3.68.0` trazia uma
  vulnerabilidade "critical" via `adm-zip`/`decompress`, resolvida ao atualizar para a major
  mais recente — também obrigou a subir `react`/`react-dom` para `^19.2.2`, exigido pelo
  Sanity v6). As vulnerabilidades restantes reportadas por `npm audit` em `studio/` estão
  todas dentro do próprio toolchain do `@sanity/cli` (module federation, parsing de
  configuração), não em código do website publicado — reavaliar ao atualizar o `sanity`.
- Paleta de cores, tipografia e logótipo em `src/styles/global.css` são placeholders
  neutros — substituir assim que a identidade visual oficial for fornecida (ver secção
  "Em falta" abaixo).

## Em falta antes do lançamento

Retirado do documento de especificação original (secção 9):

- [ ] Confirmar registador do domínio e quem tem acesso ao painel DNS
- [ ] Confirmar se já existe site/email ativo em corosportugal.pt (ver aviso ⚠️ acima)
- [ ] Decidir domínio canónico: `corosportugal.pt` vs `www.corosportugal.pt`
- [ ] Confirmar Vercel como hosting final
- [ ] Logótipo em SVG, cores oficiais (hex) e tipografia (com licença para web)
- [ ] Revisão de texto a todo o conteúdo público antes do lançamento
- [ ] Contactos definitivos (email, telefone, morada, redes sociais) — atualmente
      placeholders em `src/components/Footer.astro`
- [ ] Tradução inglesa do texto institucional, revista e aprovada pela Direção — ver
      `src/pages/en/quem-somos.astro` (mostra aviso de tradução pendente)
- [ ] Texto legal definitivo da Política de Privacidade — o atual em
      `src/content/privacy.ts` é um rascunho não revisto juridicamente
- [ ] Criar conta Google Workspace institucional e o Google Form de inscrição de coros
- [ ] Criar o projeto Sanity (ver secção acima) e designar quem, na Direção, revê as
      respostas do Google Forms e as transcreve para o Sanity, e com que periodicidade
