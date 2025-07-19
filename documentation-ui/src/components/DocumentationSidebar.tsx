import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";

export interface NavItem {
  title: string;
  file: string;          
  children?: NavItem[];
}

interface DocumentationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: string) => void;
  items: NavItem[]; 
  activeFile: string; 
}

export const navItems: NavItem[] = [
  { title: 'Overview', file: '/docs/overview/overview.md',
  },
  {
    title: "Data & Resources", file: "/docs/data/data.md",
    children: [
      { title: "Data Overview", file: "/docs/data/data-overview.md" },
      { title: "Data Quality and Dataset Structure", file: "/docs/data/data-quality.md" },
      { title: "Risk and Ethics Statement", file: "/docs/data/risk-and-ethics.md" },
    ]
  },


  {
    title: "Pilot Task", file: "/docs/pilot-task/pilot-task.md",
  },
  {
    title: "Evaluation", file: "/docs/evaluation/evaluation.md",
    children: [
      { title: "Evaluation Overview", file: "/docs/evaluation/evaluation-overview.md" },
      { title: "Subtask 1", file: "/docs/evaluation/subtask1.md" },
      { title: "Subtask 2", file: "/docs/evaluation/subtask2.md" }
    ]
  },
  {
    title: "Task Organizers", file: "/docs/organizers.md"
  }
];

const DocumentationSidebar = ({ isOpen, onClose, onSelectFile, items, activeFile }: DocumentationSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>(() => {
    // Initially expand sections with children
    return { 0: true, 1: true, 3: true };
  });

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-14 left-0 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)]
          w-64 bg-sidebar border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Search - Mobile */}
        <div className="md:hidden p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Type to start searching..."
              className="w-full pl-10 pr-4 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:block p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Type to start searching..."
              className="w-full pl-10 pr-4 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {navItems.map((item, index) => {
              const isExpanded = expandedSections[index];
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li key={index}>
                  <div
                    className={`
                      flex items-center px-4 py-2 cursor-pointer transition-colors
                      ${isExpanded && hasChildren ? 'bg-nav-active text-primary-foreground' : 'hover:bg-nav-hover'}
                    `}
                    onClick={() => {
                      if (hasChildren) {
                        toggleSection(index);
                      } else {
                        onSelectFile(item.file);   // pick the file
                        onClose();
                      }
                    }}
                  >
                    {hasChildren && (
                      <ChevronRight
                        size={16}
                        className={`
                          mr-2 transition-transform duration-200
                          ${isExpanded ? 'rotate-90 text-primary-foreground' : 'text-muted-foreground'}
                        `}
                      />
                    )}
                    <span className={`
                      text-sm font-medium
                      ${isExpanded && hasChildren ? 'text-primary-foreground' : 'text-foreground'}
                    `}>
                      {item.title}
                    </span>
                  </div>

                  {/* Children */}
                  {hasChildren && (
                    <ul
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      {item.children?.map((child, childIndex) => (
                        
                        <li key={childIndex}>
                          <a
                            href="#"
                            className={`block pl-10 pr-4 py-2 text-sm transition-colors ${
                              child.file === activeFile
                                ? 'bg-nav-hover'
                                : 'text-muted-foreground hover:bg-nav-hover hover:text-foreground'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectFile(child.file);
                              onClose();
                            }}
                          >
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DocumentationSidebar;