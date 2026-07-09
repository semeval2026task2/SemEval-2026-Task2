import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentationHeader from "@/components/DocumentationHeader";
import { navItems, slugToFile } from "@/components/DocumentationSidebar";
import DocumentationSidebar from "@/components/DocumentationSidebar";
import MarkdownViewer from "@/components/MarkdownViewer";
import Leaderboard from "@/components/Leaderboard";   // ← add this
import { Menu } from "lucide-react";

export default function Index({ initialFile }: { initialFile?: string }) {
  const { slug } = useParams();
  const file = slug ? slugToFile[slug] : (initialFile ?? slugToFile[""]);
  const [activeFile, setActiveFile] = useState("/docs/overview/overview.md");

  useEffect(() => {
    if (file) setActiveFile(file);
  }, [file]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen bg-background flex no-scrollbar flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <DocumentationSidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          items={navItems}
          activeFile={activeFile}
          onSelectFile={() => {}}
        />

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-3 left-3 z-50 md:hidden p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <main className={`flex-1 overflow-auto px-6 py-8 md:px-8 ${slug === "leaderboard" ? "" : "no-scrollbar"}`}>
          <div className={`mx-auto ${slug === "leaderboard" ? "max-w-full" : "max-w-5xl"}`}>
            {slug === "leaderboard" ? (
              <Leaderboard />
            ) : (
              <MarkdownViewer file={activeFile} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}