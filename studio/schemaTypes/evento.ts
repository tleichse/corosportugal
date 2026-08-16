import { defineField, defineType } from 'sanity';

// A single event type covers both the Agenda and the Histórico page:
// the site queries this same collection filtered by `data` (>= today for
// Agenda, < today for Histórico) instead of duplicating content types.
export const evento = defineType({
  name: 'evento',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título (PT)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tituloEn',
      title: 'Título (EN)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'datetime',
      description: 'Determina se o evento aparece na Agenda ou no Histórico.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição (PT)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'descricaoEn',
      title: 'Descrição (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'linkExterno',
      title: 'Link externo (inscrições, bilhetes, etc.)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'titulo', date: 'data', media: 'imagem' },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('pt-PT') : undefined,
        media,
      };
    },
  },
});
