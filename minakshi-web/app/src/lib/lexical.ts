/** Payload Lexical JSON → HTML serializer */

interface LexicalNode {
  type: string;
  version?: number;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  listType?: 'bullet' | 'number' | 'check';
  url?: string;
  newTab?: boolean;
  /** Payload link / relationship / upload fields */
  fields?: Record<string, unknown>;
  /** Payload upload node */
  value?: Record<string, unknown>;
  relationTo?: string;
  indent?: number;
}

const FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
} as const;

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function serializeChildren(children: LexicalNode[] = []): string {
  return children.map(serializeNode).join('');
}

function serializeLink(node: LexicalNode): string {
  const f = node.fields as { url?: string; newTab?: boolean; linkType?: string; doc?: { value?: { slug?: string } } } | undefined;
  let href = f?.url ?? (node as Record<string, unknown>).url as string ?? '#';
  if (f?.linkType === 'internal' && f?.doc?.value?.slug) {
    href = `/${f.doc.value.slug}`;
  }
  const target = f?.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${escape(href)}"${target}>${serializeChildren(node.children)}</a>`;
}

function serializeBlock(node: LexicalNode): string {
  const fields = node.fields as Record<string, unknown> | undefined;
  if (!fields) return '';
  switch (fields['blockType']) {
    case 'mediaColumns': {
      const cols = (fields['columns'] ?? []) as Array<{ image?: { url?: string; alt?: string }; caption?: string }>;
      const layoutStr = (fields['layout'] as string) ?? '2col';
      const count = layoutStr === '3col' ? 3 : layoutStr === '4col' ? 4 : 2;
      const items = cols
        .filter(c => c.image?.url)
        .map(c => {
          const src = escape(c.image!.url!);
          const alt = escape(c.image!.alt ?? '');
          const caption = c.caption ? `<figcaption>${escape(c.caption)}</figcaption>` : '';
          return `<figure><img src="${src}" alt="${alt}" loading="lazy" />${caption}</figure>`;
        })
        .join('');
      return `<div class="media-columns media-columns--${count}col">${items}</div>`;
    }
    default:
      return '';
  }
}

function serializeNode(node: LexicalNode): string {
  switch (node.type) {
    case 'text': {
      let text = escape(node.text ?? '');
      const f = node.format ?? 0;
      if (f & FORMAT.CODE) return `<code>${text}</code>`;
      if (f & FORMAT.BOLD) text = `<strong>${text}</strong>`;
      if (f & FORMAT.ITALIC) text = `<em>${text}</em>`;
      if (f & FORMAT.UNDERLINE) text = `<u>${text}</u>`;
      if (f & FORMAT.STRIKETHROUGH) text = `<s>${text}</s>`;
      if (f & FORMAT.SUBSCRIPT) text = `<sub>${text}</sub>`;
      if (f & FORMAT.SUPERSCRIPT) text = `<sup>${text}</sup>`;
      return text;
    }
    case 'linebreak':
      return '<br />';
    case 'tab':
      return '&nbsp;&nbsp;&nbsp;&nbsp;';
    case 'paragraph': {
      const inner = serializeChildren(node.children);
      return inner.trim() ? `<p>${inner}</p>` : '';
    }
    case 'heading': {
      const tag = node.tag ?? 'h2';
      return `<${tag}>${serializeChildren(node.children)}</${tag}>`;
    }
    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      return `<${tag}>${serializeChildren(node.children)}</${tag}>`;
    }
    case 'listitem':
      return `<li>${serializeChildren(node.children)}</li>`;
    case 'link':
    case 'autolink':
      return serializeLink(node);
    case 'quote':
      return `<blockquote>${serializeChildren(node.children)}</blockquote>`;
    case 'horizontalrule':
      return '<hr />';
    case 'upload': {
      const media = node.value;
      if (!media?.url) return '';
      const src = escape(String(media.url));
      const alt = escape(String(media.alt ?? ''));
      const captionVal = (node.fields as Record<string, unknown> | undefined)?.caption;
      const caption = captionVal ? `<figcaption>${escape(String(captionVal))}</figcaption>` : '';
      return `<figure class="rich-text-image"><img src="${src}" alt="${alt}" loading="lazy" />${caption}</figure>`;
    }
    case 'block':
      return serializeBlock(node);
    case 'relationship': {
      return '';
    }
    case 'root':
    default:
      return node.children?.length ? serializeChildren(node.children) : '';
  }
}

export function lexicalToHtml(content: unknown): string {
  if (!content || typeof content !== 'object') return '';
  const root = (content as Record<string, unknown>).root as LexicalNode | undefined;
  if (!root) return '';
  return serializeNode(root);
}
