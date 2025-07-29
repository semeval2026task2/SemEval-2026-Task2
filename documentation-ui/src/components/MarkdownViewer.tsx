import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

/* ⬇️  only bring in the heavy editor hook in dev builds */
const openEditor =
  import.meta.env.DEV
    ? (await import('@/hooks/useStackEdit')).useStackEdit()  // ← same hook
    : () => {};                                             // ← no‑op stub

function withBase(path: string) {
  const base = import.meta.env.BASE_URL;
  return base + path.replace(/^\/+/, '');
}

export default function MarkdownViewer({ file }: { file: string }) {
  const [md, setMd] = useState<string>('Loading…');

  /* pull the Markdown whenever the path changes */
  useEffect(() => {
    const url = withBase(file);
    console.debug(`Fetching Markdown from: ${url}`);

    fetch(url)
      .then(async r => {
        if (!(r.ok && r.headers.get('content-type')?.includes('text'))) {
          throw new Error(`File not found: ${url}`);
        }
        setMd(await r.text());
      })
      .catch(err => setMd(`# 404\n\n${err.message}`));
  }, [file]);

  return (
    <article className="prose prose-lg max-w-none">
      {import.meta.env.DEV && (          /* ⬅️  button only in dev */
        <div className="flex justify-end mb-2">
          <button
            onClick={() => openEditor(file, md, setMd)}
            className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm"
          >
            Edit ✏️
          </button>
        </div>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkFootnotes, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {md}
      </ReactMarkdown>
    </article>
  );
}
