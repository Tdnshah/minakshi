/** Minimal Payload Lexical JSON → HTML serializer */

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
  fields?: { url?: string; newTab?: boolean };
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
    case 'link': {
      const href = node.fields?.url ?? node.url ?? '#';
      const target = (node.fields?.newTab ?? node.newTab)
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      return `<a href="${escape(href)}"${target}>${serializeChildren(node.children)}</a>`;
    }
    case 'quote':
      return `<blockquote>${serializeChildren(node.children)}</blockquote>`;
    case 'horizontalrule':
      return '<hr />';
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
