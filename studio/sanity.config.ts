import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// PROJECT_ID and DATASET are not yet assigned — a Sanity project has not
// been created for Coros Portugal (see README "Sanity setup" section).
// Create a project at https://www.sanity.io/manage, then set these via
// environment variables (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET)
// or replace the fallbacks below directly.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Coros Portugal',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Página institucional')
              .child(
                S.editor()
                  .id('paginaInstitucional')
                  .schemaType('paginaInstitucional')
                  .documentId('paginaInstitucional')
              ),
            S.divider(),
            S.documentTypeListItem('evento').title('Eventos'),
            S.documentTypeListItem('coroAssociado').title('Coros associados'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
