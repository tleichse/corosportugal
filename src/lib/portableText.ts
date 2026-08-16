interface PortableTextSpan {
  _type: 'span';
  text: string;
}

interface PortableTextBlock {
  _type: 'block';
  children?: PortableTextSpan[];
}

// The institutional copy is plain paragraphs with no inline formatting, so
// a full portable-text renderer would be overkill — this just joins each
// block's spans into a paragraph string for simple <p> rendering.
export function blocksToParagraphs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return (blocks as PortableTextBlock[])
    .filter((block) => block._type === 'block')
    .map((block) => (block.children ?? []).map((span) => span.text).join(''))
    .filter((text) => text.trim().length > 0);
}
