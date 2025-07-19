import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useStackEdit } from '@/hooks/useStackEdit';

export default function MarkdownViewer({ file }: { file: string }) {
  const [md, setMd]   = useState<string>('Loading…');
  const openEditor = useStackEdit(file); 

  // fetch the file whenever the sidebar selection changes
  useEffect(() => {
    fetch(file)
    .then(r => {
        const ct = r.headers.get('content-type') || '';
        if (ct.includes('text/html')) {
        throw new Error(`File not found: ${file}`);
        }

        return r.text();
    })
    .then(setMd)
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

      <ReactMarkdown>{md}</ReactMarkdown>
    </article>
  );
}