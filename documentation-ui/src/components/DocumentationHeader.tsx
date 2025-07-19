import { Search, Menu } from "lucide-react";

interface DocumentationHeaderProps {
  onMenuClick: () => void;
}

const DocumentationHeader = ({ onMenuClick }: DocumentationHeaderProps) => {
  return (
    <header className="h-14 bg-header text-primary-foreground px-4 flex items-center justify-between border-b">
      {/* Left side - Menu button and branding */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden mr-4 p-1 hover:bg-primary-dark rounded transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-foreground text-header rounded flex items-center justify-center font-bold text-sm">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">SemEval 2026</span>
            <span className="text-xs text-primary-foreground/80 leading-tight">Task: Longitudinal Affect Assessment</span>
          </div>
        </div>
      </div>

      {/* Center - Search (hidden on mobile) */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/70" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-primary-foreground placeholder-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side - Version */}
      {/* <div className="text-primary-foreground/80 text-sm font-medium">
        1.10 ▾
      </div> */}
    </header>
  );
};

export default DocumentationHeader;