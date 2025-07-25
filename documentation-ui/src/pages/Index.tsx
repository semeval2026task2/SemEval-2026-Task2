// pages/Index.tsx
import { useState } from "react";
import DocumentationHeader from "@/components/DocumentationHeader";
import DocumentationSidebar from "@/components/DocumentationSidebar";
import MarkdownViewer from "@/components/MarkdownViewer";     // renders the .md file
import { navItems } from "@/components/DocumentationSidebar"; // export navItems there or move it here
import { Menu } from 'lucide-react';

export default function Index() {
  /* which file is currently displayed in the main pane */
  const [activeFile, setActiveFile] = useState("/docs/overview/overview.md");

  /* sidebar open / close (mobile) */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar  = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen bg-background flex no-scrollbar flex-col overflow-hidden">
      {/* top bar (hamburger lives inside) */}
      {/* <DocumentationHeader onMenuClick={toggleSidebar} /> */}

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
      {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-3 left-3 z-50 md:hidden
                    p-2 rounded-md text-black
                    focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        {/* main markdown viewer */}
        <main className="flex-1 overflow-auto no-scrollbar px-6 py-8 md:px-8">
          <div className="mx-auto max-w-5xl">
            <MarkdownViewer file={activeFile} />
          </div>
        </main>
      </div>
    </div>
  );
}
