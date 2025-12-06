// components/DocumentationSidebar.tsx
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

/* ---------- Types ---------- */
export interface NavItem {
  title: string;
  file: string;   // markdown path
  slug: string;   // url path segment
  children?: NavItem[];
}

interface DocumentationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: string) => void; // kept for compatibility; unused
  items: NavItem[];
  activeFile: string;                   // kept for compatibility; unused
}

/* ---------- Your nav tree ---------- */
export const navItems: NavItem[] = [
  { title: "Overview",            file: "/docs/overview/overview.md",     slug: "overview" },
  { title: "Getting Started",     file: "/docs/participate.md",           slug: "getting-started" },
  { title: "Tasks",               file: "/docs/tasks/tasks.md",           slug: "tasks" },
  { title: "Data",                file: "/docs/data/data-overview.md",    slug: "data" },
  { title: "Important Dates",     file: "/docs/important-dates.md",       slug: "important-dates" },
  { title: "Submission Instructions", file: "/docs/submission-instructions.md", slug: "submission-instructions" },
  { title: "Evaluation",          file: "/docs/evaluation/evaluation.md", slug: "evaluation" },
  { title: "Resources",           file: "/docs/resources.md",             slug: "resources" },
  { title: "Terms and Conditions",file: "/docs/terms-and-conditions.md",  slug: "terms-and-conditions" },
  { title: "Organizers",          file: "/docs/organizers.md",            slug: "organizers" },
];

export const slugToFile: Record<string, string> =
  Object.fromEntries(navItems.map(i => [i.slug, i.file]));

/* ---------- Sidebar component ---------- */
const DocumentationSidebar = ({
  isOpen,
  onClose,
  items,
}: DocumentationSidebarProps) => {
  // If you later add collapsible parents, this controls which parent is open.
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const { slug: currentSlug = "overview" } = useParams(); // exact route slug (basename handled by Router)

  const handleTopLevelClick = (index: number, item: NavItem) => {
    const hasChildren = !!item.children?.length;
    if (hasChildren) {
      setExpandedIndex(prev => (prev === index ? null : index));
    } else {
      navigate(item.slug ? `/${item.slug}` : "/");
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
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="px-6 pt-6 pb-4 flex flex-col gap-1 select-none">
          <span className="font-extrabold text-xl md:text-2xl leading-tight tracking-tight">
            SemEval&nbsp;2026 Task 2
          </span>
          <span className="text-sm md:text-base font-semibold leading-snug py-8">
            Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-0">
            {items.map((item, index) => {
              const hasChildren = !!item.children?.length;
              const isExpanded = expandedIndex === index;

              // ✅ Leaves: active when their slug matches the current route slug
              // ✅ Parents: show "active" style only when expanded
              const isSelected = hasChildren
                ? isExpanded
                : item.slug === currentSlug;

              const containerClasses = `
                flex items-center px-4 py-2 cursor-pointer transition-colors
                ${isSelected ? "bg-nav-active text-primary-foreground" : "hover:bg-nav-hover"}
              `;

              return (
                <li key={item.slug}>
                  <div
                    className={containerClasses}
                    onClick={() => handleTopLevelClick(index, item)}
                  >
                    {hasChildren && (
                      <ChevronRight
                        size={16}
                        className={`mr-2 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                      />
                    )}
                    <span className="text-base">{item.title}</span>
                  </div>

                  {hasChildren && (
                    <ul
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                      `}
                    >
                      {item.children!.map(child => {
                        const childActive = child.slug === currentSlug; // slug-based
                        return (
                          <li key={child.slug}>
                            <a
                              href={`/${child.slug}`}
                              className={`block pl-10 pr-4 py-2.5 text-base transition-colors ${
                                childActive
                                  ? "bg-nav-hover"
                                  : "text-muted-foreground hover:bg-nav-hover hover:text-foreground"
                              }`}
                              onClick={e => {
                                e.preventDefault();
                                navigate(`/${child.slug}`);
                                onClose();
                              }}
                            >
                              {child.title}
                            </a>
                          </li>
                        );
                      })}
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
