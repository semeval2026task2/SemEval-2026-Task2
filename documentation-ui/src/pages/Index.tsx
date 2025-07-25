// pages/Index.tsx
import { useState } from "react";
import DocumentationHeader from "@/components/DocumentationHeader";
import DocumentationSidebar from "@/components/DocumentationSidebar";
import MarkdownViewer from "@/components/MarkdownViewer";     // renders the .md file
import { navItems } from "@/components/DocumentationSidebar"; // export navItems there or move it here

export default function Index() {
  /* which file is currently displayed in the main pane */
  const [activeFile, setActiveFile] = useState("/docs/overview/overview.md");

  /* sidebar open / close (mobile) */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar  = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* top bar (hamburger lives inside) */}
      <DocumentationHeader onMenuClick={toggleSidebar} />

      {/* content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* left sidebar (collapsible on mobile) */}
        <DocumentationSidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onSelectFile={setActiveFile}  // <<< key line: child -> parent
          items={navItems}
          activeFile={activeFile}
        />

        {/* main markdown viewer */}
        <main className="flex-1 overflow-auto px-6 py-8 md:px-8">
          <div className="mx-auto max-w-5xl">
            <MarkdownViewer file={activeFile} />
          </div>
        </main>
      </div>
    </div>
  );
}
