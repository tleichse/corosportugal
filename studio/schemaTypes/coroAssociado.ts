import { defineField, defineType } from 'sanity';

// No status/approval field on purpose: registrations arrive through the
// Google Form (see README "Coros associados — processo de inscrição"),
// and a Direção member only creates a document here once a submission is
// approved. Existence of the document *is* the approval — see spec §5.
export const coroAssociado = defineType({
  name: 'coroAssociado',
  title: 'Coro associado',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cidade',
      title: 'Cidade',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'telefone',
      title: 'Telefone de contacto',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website / redes sociais',
      type: 'url',
    }),
    defineField({
      name: 'descricaoBreve',
      title: 'Descrição breve (PT)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descricaoBreveEn',
      title: 'Descrição breve (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logotipo',
      title: 'Logótipo',
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
  ],
  preview: {
    select: { title: 'nome', subtitle: 'cidade', media: 'logotipo' },
  },
});
