import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

// No Sanity project exists yet for Coros Portugal (see README). Until
// PUBLIC_SANITY_PROJECT_ID is set, `sanity` is null and every fetch helper
// below returns empty results instead of throwing, so the site still
// builds and renders (with empty event/directory sections) on day one.
export const sanity: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: true,
    })
  : null;

const builder = sanity ? createImageUrlBuilder(sanity) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return undefined;
  return builder.image(source);
}

export interface Evento {
  _id: string;
  titulo: string;
  tituloEn?: string;
  slug: { current: string };
  data: string;
  local?: string;
  descricao?: unknown;
  descricaoEn?: unknown;
  imagem?: SanityImageSource & { alt?: string };
  linkExterno?: string;
}

export interface CoroAssociado {
  _id: string;
  nome: string;
  slug: { current: string };
  cidade?: string;
  email?: string;
  telefone?: string;
  website?: string;
  descricaoBreve?: string;
  descricaoBreveEn?: string;
  logotipo?: SanityImageSource & { alt?: string };
}

export interface PaginaInstitucional {
  quemSomos?: unknown;
  quemSomosEn?: unknown;
  oQueFazemos?: unknown;
  oQueFazemosEn?: unknown;
  visao?: unknown;
  visaoEn?: unknown;
  missao?: unknown;
  missaoEn?: unknown;
  valores?: Array<{
    nome: string;
    nomeEn?: string;
    descricao: string;
    descricaoEn?: string;
  }>;
}

export async function getEventosAgenda(): Promise<Evento[]> {
  if (!sanity) return [];
  return sanity.fetch(
    `*[_type == "evento" && data >= now()] | order(data asc)`
  );
}

export async function getEventosHistorico(): Promise<Evento[]> {
  if (!sanity) return [];
  return sanity.fetch(
    `*[_type == "evento" && data < now()] | order(data desc)`
  );
}

export async function getEventosDestaque(limit = 3): Promise<Evento[]> {
  if (!sanity) return [];
  return sanity.fetch(
    `*[_type == "evento" && data >= now()] | order(data asc) [0...$limit]`,
    { limit }
  );
}

export async function getCorosAssociados(): Promise<CoroAssociado[]> {
  if (!sanity) return [];
  return sanity.fetch(`*[_type == "coroAssociado"] | order(nome asc)`);
}

export async function getPaginaInstitucional(): Promise<PaginaInstitucional | null> {
  if (!sanity) return null;
  return sanity.fetch(`*[_type == "paginaInstitucional"][0]`);
}
