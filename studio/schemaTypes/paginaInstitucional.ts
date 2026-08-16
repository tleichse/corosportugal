import { defineField, defineType } from 'sanity';

// Builds a minimal portable-text block from plain paragraphs, only so the
// singleton below can ship pre-filled with the exact PT copy from the
// project spec (§4) as an editable starting point — not a fallback the
// site code depends on. Content lives in the dataset from here on; the
// Direção can correct typos in Studio without a developer.
const block = (text: string) => ({
  _type: 'block',
  style: 'normal',
  children: [{ _type: 'span', text }],
});

const paragraphs = (...lines: string[]) => lines.map(block);

export const paginaInstitucional = defineType({
  name: 'paginaInstitucional',
  title: 'Página institucional (Quem Somos / Missão, Visão e Valores)',
  type: 'document',
  // Singleton: the Studio structure (sanity.config.ts) pins this to a
  // single fixed document id, so only one instance can ever exist.
  fields: [
    defineField({
      name: 'quemSomos',
      title: 'Quem Somos? (PT)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: paragraphs(
        'A Coros Portugal é a associação de referência da comunidade coral portuguesa, representando uma rede viva de mais de 30 mil praticantes — cantores, maestros, dirigentes e criadores — unidos pela música coral enquanto prática artística coletiva. Somos uma organização cultural plural, aberta à diversidade estética e institucional, e comprometida com o desenvolvimento do setor em toda a sua extensão: do coro amador ao conjunto profissional, do repertório popular ao erudito, do histórico à criação contemporânea, do continente às regiões autónomas.'
      ),
    }),
    defineField({
      name: 'quemSomosEn',
      title: 'Who We Are (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Aguarda tradução revista e aprovada pela Direção — não preencher com tradução automática (ver spec §4).',
    }),
    defineField({
      name: 'oQueFazemos',
      title: 'O que fazemos? (PT)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: paragraphs(
        'Promovemos, apoiamos e damos visibilidade à música coral em Portugal. Fazemo-lo através da organização de eventos de encontro e partilha, como o Dia Mundial da Música Coral, da criação de oportunidades de formação e desenvolvimento artístico, e do estímulo a redes de colaboração entre os agentes do setor. Atuamos também como plataforma de circulação e reconhecimento de projetos corais, posicionando a comunidade coral e profissionais do setor em espaço cultural público de forma consistente e representativa.'
      ),
    }),
    defineField({
      name: 'oQueFazemosEn',
      title: 'What We Do (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Aguarda tradução revista e aprovada pela Direção.',
    }),
    defineField({
      name: 'visao',
      title: 'A Nossa Visão (PT)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: paragraphs(
        'Nós idealizamos um futuro onde a Coros Portugal é reconhecida como o principal agente cultural da música coral em Portugal — uma referência incontornável para quem canta, dirige, ensina ou cria, e uma voz legítima junto de instituições, parceiros e do público em geral.',
        'Queremos ser o ponto de encontro da música coral portuguesa — não apenas a sua representação formal, mas o seu coração ativo. Uma comunidade coral onde qualquer pessoa consegue encontrar um espaço de pertença, crescimento e expressão artística; que não se limita a agregar quem já canta, dirige ou produz, mas que cria as condições para que a prática coral cresça em alcance, profundidade e reconhecimento público.',
        'Pretendemos unir o que é, por natureza, disperso: coros de estilos e regiões diferentes; cantores amadores e profissionais, sejam estes mais jovens ou mais velhos; maestros em início de percurso e com décadas de experiência; repertório popular e erudito, histórico e contemporâneo. Uma plataforma onde a diversidade não é um obstáculo à identidade comum, mas precisamente aquilo que a define.',
        'Acima de tudo, queremos que qualquer pessoa ligada à música coral em Portugal — seja a cantar num coro amador ou a dirigir um ensemble profissional — sinta que a Coros Portugal existe para ela, fala por ela e trabalha com ela.'
      ),
    }),
    defineField({
      name: 'visaoEn',
      title: 'Our Vision (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Aguarda tradução revista e aprovada pela Direção.',
    }),
    defineField({
      name: 'missao',
      title: 'A Nossa Missão (PT)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: paragraphs(
        'O nosso propósito é construir uma plataforma de encontro, desenvolvimento e colaboração que sirva toda a comunidade coral. Uma plataforma onde os jovens músicos desenvolvam a sua identidade artística, onde as gerações séniores encontrem comunidade e vitalidade, onde os criadores e conjuntos profissionais façam circular o seu trabalho junto de quem o aprecia, e onde qualquer pessoa em Portugal possa descobrir na prática coral um espaço de expressão e pertença.',
        'O caminho a percorrer é claro: uma oferta formativa estruturada e acessível, momentos de encontro regulares que criem laços duradouros entre agentes do setor, canais de circulação que levem o trabalho coral a públicos mais amplos, e uma narrativa pública sobre a música coral que seja convidativa, desmistificadora e culturalmente relevante.',
        'Acreditamos que o canto coral é mais do que uma forma de arte: é um exercício de escuta e partilha, de disciplina coletiva, de participação, e de construção de identidade partilhada. Por isso, a nossa missão não se esgota no setor — projeta-se na sociedade. Trabalhamos para que a vida coral seja uma presença ativa, relevante e reconhecida no quotidiano cultural português, hoje e nas gerações que se seguem.'
      ),
    }),
    defineField({
      name: 'missaoEn',
      title: 'Our Mission (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Aguarda tradução revista e aprovada pela Direção.',
    }),
    defineField({
      name: 'valores',
      title: 'Valores Fundamentais',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valor',
          fields: [
            defineField({ name: 'nome', title: 'Nome (PT)', type: 'string' }),
            defineField({ name: 'nomeEn', title: 'Nome (EN)', type: 'string' }),
            defineField({ name: 'descricao', title: 'Descrição (PT)', type: 'text', rows: 3 }),
            defineField({
              name: 'descricaoEn',
              title: 'Descrição (EN)',
              type: 'text',
              rows: 3,
              description: 'Aguarda tradução revista e aprovada pela Direção.',
            }),
          ],
          preview: { select: { title: 'nome', subtitle: 'descricao' } },
        },
      ],
      initialValue: [
        {
          _type: 'valor',
          nome: 'Inclusão',
          descricao:
            'Acreditamos que a música coral pertence a todos. Celebramos a diversidade de repertórios e expressões regionais, formações e perfis humanos, e trabalhamos para que cada cantor e cada coro se sinta parte de algo maior do que si próprio.',
        },
        {
          _type: 'valor',
          nome: 'Pedagogia',
          descricao:
            'Valorizamos a aprendizagem contínua. Cada encontro, cada ensaio e cada evento é uma oportunidade para conhecer mais — sobre técnica, sobre história, sobre o presente e o futuro da música coral.',
        },
        {
          _type: 'valor',
          nome: 'Qualidade',
          descricao:
            'Perseguimos a excelência artística como horizonte permanente, respeitando as características e o percurso único de cada grupo e cantor.',
        },
        {
          _type: 'valor',
          nome: 'Colaboração',
          descricao:
            'Reconhecemos que o setor coral cresce quando em conjunto. Fomentamos redes de contacto, parceria e cumplicidade entre os agentes da comunidade, transcendendo fronteiras humanas e regionais.',
        },
        {
          _type: 'valor',
          nome: 'Identidade',
          descricao:
            'Assumimos a música coral como parte viva do património cultural português, com responsabilidade de preservar o seu legado e abertura para o reinventar.',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página institucional' };
    },
  },
});
