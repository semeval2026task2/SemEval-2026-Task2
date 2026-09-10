// components/DocumentationSidebar.tsx
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

/* ---------- Types ---------- */
export interface NavItem {
  title: string;
  file: string;
  slug: string;
  children?: NavItem[];
}

interface DocumentationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: string) => void;
  items: NavItem[];
  activeFile: string;
}

/* ---------- Nav tree ---------- */
export const navItems: NavItem[] = [
  { title: "Overview",    file: "/docs/overview/overview.md", slug: "overview" },
  { title: "Citation", file: "/docs/citation.md", slug: "citation" },
  { title: "Leaderboard", file: "/docs/leaderboard.md",       slug: "leaderboard" },

      { title: "Get Data", file: "/docs/data/get-data.md", slug: "get-data" },
      { title: "Get Models", file: "/docs/data/get-models.md", slug: "get-models" },
  {
    title: "SemEval2026 Participant Info",
    file: "",
    slug: "participant-info",
    children: [
      { title: "Getting Started",               file: "/docs/participate.md",                   slug: "getting-started" },
      { title: "Important Dates",               file: "/docs/important-dates.md",               slug: "important-dates" },
      { title: "Tasks",                         file: "/docs/tasks/tasks.md",                   slug: "tasks" },
      {
        title: "Data",
        file: "",
        slug: "data",
        children: [
          { title: "Training Data", file: "/docs/data/data-overview.md", slug: "training-data" },
          { title: "Test Data",     file: "/docs/data/test-data.md",     slug: "test-data" },
        ],
      },
      { title: "Submission Instructions",       file: "/docs/submission-instructions.md",       slug: "submission-instructions" },
      { title: "Paper Submission Instructions", file: "/docs/paper-submission-instructions.md", slug: "paper-submission-instructions" },
      {
        title: "Evaluation",
        file: "",
        slug: "evaluation",
        children: [
          { title: "Evaluation", file: "/docs/evaluation/evaluation.md", slug: "evaluation" },
          { title: "Baselines",  file: "/docs/data/baselines.md",        slug: "baselines" },
        ],
      },
      { title: "Resources",            file: "/docs/resources.md",            slug: "resources" },
      { title: "Terms and Conditions", file: "/docs/terms-and-conditions.md", slug: "terms-and-conditions" },
      
    ],
  },
  { title: "Organizers",           file: "/docs/organizers.md",           slug: "organizers" },
];

/* ---------- slugToFile: now handles all depths ---------- */
function flattenItems(items: NavItem[]): NavItem[] {
  return items.flatMap(item =>
    item.children ? [item, ...flattenItems(item.children)] : [item]
  );
}

export const slugToFile: Record<string, string> = Object.fromEntries(
  flattenItems(navItems).map(i => [i.slug, i.file])
);

/* ---------- Recursive child list ---------- */
interface ChildListProps {
  items: NavItem[];
  depth: number;
  currentSlug: string;
  navigate: (path: string) => void;
  onClose: () => void;
}
const depthPadding: Record<number, string> = {
  1: "pl-8",
  2: "pl-14",
  3: "pl-20",
};
const ChildList = ({ items, depth, currentSlug, navigate, onClose }: ChildListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const padding = depthPadding[depth] ?? "pl-20";

  return (
    <ul>
      {items.map((item, index) => {
        const hasChildren = !!item.children?.length;
        const isExpanded = expandedIndex === index;
        const isActive = !hasChildren && item.slug === currentSlug;

        return (
          <li key={item.slug}>
            <div
              className={`
                flex items-center pr-4 py-2.5 text-base cursor-pointer transition-colors
                ${padding}
                ${isActive
                  ? "bg-nav-hover font-medium text-foreground"
                  : "text-muted-foreground hover:bg-nav-hover hover:text-foreground"}
              `}
              onClick={e => {
                e.preventDefault();
                if (hasChildren) {
                  setExpandedIndex(prev => (prev === index ? null : index));
                } else {
                  navigate(`/${item.slug}`);
                  onClose();
                }
              }}
            >
              {hasChildren && (
                <ChevronRight
                  size={14}
                  className={`mr-2 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                />
              )}
              {item.title}
            </div>

            {hasChildren && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ChildList
                  items={item.children!}
                  depth={depth + 1}
                  currentSlug={currentSlug}
                  navigate={navigate}
                  onClose={onClose}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* ---------- Sidebar ---------- */
const DocumentationSidebar = ({ isOpen, onClose, items }: DocumentationSidebarProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { slug: currentSlug = "overview" } = useParams();

  const handleTopLevelClick = (index: number, item: NavItem) => {
    if (item.children?.length) {
      setExpandedIndex(prev => (prev === index ? null : index));
    } else {
      navigate(item.slug ? `/${item.slug}` : "/");
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-screen md:h-screen
          w-64 bg-sidebar border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="px-6 pt-6 pb-4 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt="EmoVAL affect grid logo"
              className="h-10 w-10 shrink-0"
            />
            <span className="font-extrabold text-xl md:text-2xl leading-tight tracking-tight">
              EmoVAL
            </span>
          </div>
          <span className="text-sm md:text-base font-semibold leading-snug py-8">
            SemEval 2026 Task 2: Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="py-0">
            {items.map((item, index) => {
              const hasChildren = !!item.children?.length;
              const isExpanded = expandedIndex === index;
              const isSelected = hasChildren ? isExpanded : item.slug === currentSlug;

              return (
                <li key={item.slug}>
                  <div
                    className={`
                      flex items-center px-4 py-2 cursor-pointer transition-colors
                      ${isSelected ? "bg-nav-active text-primary-foreground" : "hover:bg-nav-hover"}
                    `}
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
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ChildList
                        items={item.children!}
                        depth={1}
                        currentSlug={currentSlug}
                        navigate={navigate}
                        onClose={onClose}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 px-4 py-4">
          <a
            href="https://2026.aclweb.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="ACL 2026 — San Diego, July 2–7"
            className="block overflow-hidden rounded transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logos/acl-logo-2026.png`}
              alt="ACL 2026, San Diego, July 2–7"
              className="block h-auto w-full"
            />
          </a>
        </div>
      </aside>
    </>
  );
};

export default DocumentationSidebar;