const TableOfContents = () => {
  const tocItems = [
    "1. Overview",
    "Subtask 1—Longitudinal Affect Assessment",
    "Subtask 2—Forecasting (future) Variation in Affect",
    "Referenced Figures"
  ];

  return (
    <aside className="hidden xl:block w-64 pl-6">
      <div className="sticky top-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Table of contents
        </h3>
        <nav>
          <ul className="space-y-2">
            {tocItems.map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContents;