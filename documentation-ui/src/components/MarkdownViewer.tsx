import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';
import 'katex/dist/katex.min.css';
import DatasetConsentDownload from '@/components/DatasetConsentDownload';
import CitationPage from '@/components/CitationPage';
import ModelDownload from '@/components/ModelDownload';

function withBase(path: string) {
  const base = import.meta.env.BASE_URL;
  return base + path.replace(/^\/+/, '');
}

export default function MarkdownViewer({ file }: { file: string }) {
  const [md, setMd] = useState<string>('Loading…');

  useEffect(() => {
    const url = withBase(file);
    fetch(url)
      .then(async r => {
        if (!(r.ok && r.headers.get('content-type')?.includes('text'))) {
          throw new Error(`File not found: ${url}`);
        }
        setMd(await r.text());
      })
      .catch(err => setMd(`# 404\n\n${err.message}`));
  }, [file]);

  const isGetData = file === '/docs/data/get-data.md';
  if (file === '/docs/citation.md') {
    return (
      <article className="prose prose-lg max-w-none">
        <CitationPage />
      </article>
    );
  }
  if (file === '/docs/data/get-models.md') {
    return (
      <article className="prose prose-lg max-w-none">
        <ModelDownload />
      </article>
    );
  }
  return (
    <article className="prose prose-lg max-w-none">
      {isGetData && <DatasetConsentDownload />}

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkFootnotes, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {md}
      </ReactMarkdown>
    </article>
  );
}