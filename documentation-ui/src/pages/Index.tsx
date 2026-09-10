import { useState } from "react";
import { useParams } from "react-router-dom";
import DocumentationHeader from "@/components/DocumentationHeader";
import { navItems, slugToFile } from "@/components/DocumentationSidebar";
import DocumentationSidebar from "@/components/DocumentationSidebar";
import MarkdownViewer from "@/components/MarkdownViewer";
import Leaderboard from "@/components/Leaderboard";   // ← add this

export default function Index({ initialFile }: { initialFile?: string }) {
  const { slug } = useParams();
  const file = slug ? slugToFile[slug] : (initialFile ?? slugToFile[""]);
  const activeFile = file ?? "/docs/overview/overview.md";

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

        <div className="flex flex-1 flex-col overflow-hidden">
          <DocumentationHeader onMenuClick={() => setIsSidebarOpen(true)} />

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
    </div>
  );
}