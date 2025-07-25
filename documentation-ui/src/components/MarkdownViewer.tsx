import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import { useEffect, useState } from 'react';
import { useStackEdit } from '@/hooks/useStackEdit';

export default function MarkdownViewer({ file }: { file: string }) {
  const [md, setMd] = useState<string>('Loading…');
  const openEditor   = useStackEdit(file);

  useEffect(() => {
    fetch(file)
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
          onClick={() => openEditor(md, setMd)}
          className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Edit ✏️
        </button>
      </div>

      {/* 👉 add remarkPlugins */}
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkFootnotes, { inlineNotes: false }], // false → classic footnote block; true → inline pop‑ins
        ]}
      >
        {md}
      </ReactMarkdown>
    </article>
  );
}
