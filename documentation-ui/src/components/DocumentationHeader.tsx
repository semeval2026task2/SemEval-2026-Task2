import { Menu } from "lucide-react";
import { InstitutionLogoBar } from "@/components/InstitutionLogos";

interface DocumentationHeaderProps {
  onMenuClick: () => void;
}

const DocumentationHeader = ({ onMenuClick }: DocumentationHeaderProps) => {
  return (
    <header className="shrink-0 h-16 bg-background border-b border-border flex items-center gap-4 px-4 md:px-8">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 rounded-md hover:bg-nav-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="mr-auto overflow-x-auto no-scrollbar">
        <InstitutionLogoBar />
      </div>
    </header>
  );
};

export default DocumentationHeader;
