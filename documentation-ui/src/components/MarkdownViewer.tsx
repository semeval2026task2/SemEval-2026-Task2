import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { useStackEdit } from '@/hooks/useStackEdit';
import 'katex/dist/katex.min.css';

export default function MarkdownViewer({ file }: { file: string }) {
  const [md, setMd] = useState<string>('Loading…');
  const openEditor  = useStackEdit(); // ← new hook (3‑arg signature)
  function withBase(path: string) {
    const base = import.meta.env.BASE_URL;        // "/" or "/SemEval-2026/"
    return base + path.replace(/^\/+/, '');       // strip leading slash(es)
  }
  /* pull the Markdown whenever the path changes */
  useEffect(() => {
    const url = withBase(file);
    console.debug(`Fetching Markdown from: ${url}`);
    fetch(url)
      .then(async r => {
        if (!(r.ok && r.headers.get('content-type')?.includes('text'))) {
          throw new Error(`File not found: ${file}`);
        }
        setMd(await r.text());
      })
      .catch(err => setMd(`# 404\n\n${err.message}`));
  }, [file]);

  return (
    <article className="prose prose-lg max-w-none">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => openEditor(file, md, setMd)}
          className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Edit ✏️
        </button>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkFootnotes, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {md}
      </ReactMarkdown>
    </article>
  );
}
