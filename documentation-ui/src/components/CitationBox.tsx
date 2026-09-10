// components/CitationBox.tsx
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CitationBoxProps {
  label: string;
  text: string;
  isCode?: boolean;
}

const CitationBox = ({ label, text, isCode }: CitationBoxProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{label}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={`whitespace-pre-wrap text-sm p-3 rounded-md bg-gray-900 text-gray-100 border border-gray-700 ${
          isCode ? "font-mono" : "font-sans"
        }`}
      >
        {text}
      </pre>
    </div>
  );
};

export default CitationBox;