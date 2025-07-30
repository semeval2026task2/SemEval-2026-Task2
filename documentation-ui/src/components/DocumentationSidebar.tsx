import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

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

/* ----------------- YOUR NAV TREE ----------------- */
export const navItems: NavItem[] = [
  { title: 'Overview', file: '/docs/overview/overview.md' },
  { title: 'Getting Started', file: '/docs/participate.md' },
  {
    title: 'Tasks',
    file: '/docs/tasks/tasks.md',
  },
  {
    title: 'Data',
    file: '/docs/data/data-overview.md',
  },
  {
    title: 'Evaluation',
    file: '/docs/evaluation/evaluation.md',
  },
  {
    title: 'Important Dates',
    file: '/docs/important-dates.md',
  },
  { title: 'Task Organizers', file: '/docs/organizers.md' },
];

/* -------------- SIDEBAR COMPONENT ---------------- */
const DocumentationSidebar = ({
  isOpen,
  onClose,
  onSelectFile,
  items,
  activeFile,
}: DocumentationSidebarProps) => {
  /**
   * At most ONE top‑level section is “expanded”.
   * Store its index (or null for none).
   */
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // default: first section open

  /* --------------------------------------------- */
  const handleTopLevelClick = (index: number, item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      // Toggle this section and collapse all others
      setExpandedIndex(prev => (prev === index ? null : index));
    } else {
      // Leaf: select the file, collapse every section
      setExpandedIndex(null);
      onSelectFile(item.file);
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen md:h-screen
          w-64 bg-sidebar border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
      <div className="px-6 pt-6 pb-4 flex flex-col gap-1 select-none">
        {/* leaf logo — replace with your own SVG or image if you like */}

        <span className="font-extrabold text-2xl leading-tight tracking-tight">
          SemEval 2026
        </span>
        <span className="text-xs font-bold leading-tight text-foreground/70">
          Task 2: Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays
        </span>
      </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-0">
            {items.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedIndex === index;

              // Highlight rule:
              // • expanded parent OR
              // • leaf whose file === activeFile
              const isActiveLeaf =
                !hasChildren && item.file === activeFile;

              const containerClasses = `
                flex items-center px-4 py-2 cursor-pointer transition-colors
                ${
                  isExpanded || isActiveLeaf
                    ? 'bg-nav-active text-primary-foreground'
                    : 'hover:bg-nav-hover'
                }
              `;

              return (
                <li key={index}>
                  <div
                    className={containerClasses}
                    onClick={() => handleTopLevelClick(index, item)}
                  >
                    {hasChildren && (
                      <ChevronRight
                        size={16}
                        className={`
                          mr-2 transition-transform duration-200
                          ${
                            isExpanded
                              ? 'rotate-90 text-primary-foreground'
                              : 'text-muted-foreground'
                          }
                        `}
                      />
                    )}
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>

                  {/* Children list */}
                  {hasChildren && (
                    <ul
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      {item.children!.map((child, childIdx) => (
                        <li key={childIdx}>
                          <a
                            href="#"
                            className={`
                              block pl-10 pr-4 py-2 text-sm transition-colors
                              ${
                                child.file === activeFile
                                  ? 'bg-nav-hover'
                                  : 'text-muted-foreground hover:bg-nav-hover hover:text-foreground'
                              }
                            `}
                            onClick={e => {
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
