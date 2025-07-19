
import Stackedit from "stackedit-js";
import { useRef } from "react";

export function useStackEdit(filePath: string) {
  const ref = useRef<Stackedit>();

  /** open and save */
  const open = (text: string, onChangeLocal: (s: string) => void) => {
    if (!ref.current) ref.current = new Stackedit();

    ref.current.openFile({ name: filePath.split("/").pop()!, content: { text } });

    ref.current.on("fileChange", async file => {
      const md = file.content.text;
      onChangeLocal(md);                       // update preview immediately

      // 🔐 save to server
      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, markdown: md }),
      });
    });
  };

  return open;
}


