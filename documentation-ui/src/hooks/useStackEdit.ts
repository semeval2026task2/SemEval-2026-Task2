import Stackedit from 'stackedit-js';
import { useCallback } from 'react';

/**
 * Returns `openEditor`.
 *   openEditor(filePath, markdownSource, setMarkdown)
 */
export function useStackEdit() {
  return useCallback(
    (
      filePath: string,
      initialText: string,
      onChangeLocal: (md: string) => void,
    ) => {
      // brand‑new iframe each time → no stale listeners
      const se = new Stackedit();

      se.openFile({
        name: filePath.split('/').pop() || 'untitled.md',
        content: { text: initialText },
      });

      se.on('fileChange', async file => {
        const md = file.content.text;
        onChangeLocal(md); // update preview immediately

        await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath, markdown: md }),
        });
      });
    },
    [],
  );
}
