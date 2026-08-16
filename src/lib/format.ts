import type { Lang } from '../i18n/utils';

export function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
