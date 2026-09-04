"use client";

import { useState } from "react";

export interface TableOfContentsItem {
  id: string;
  label: string;
  level: 2 | 3;
}

interface BlogTableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 3);
  const hasMore = items.length > 3;

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <div className="blog-toc-heading">
        <div>
          <span className="blog-toc-kicker">In this guide</span>
          <h2>Table of contents</h2>
        </div>
        <span className="blog-toc-count">{items.length} sections</span>
      </div>

      <ol className="blog-toc-list">
        {visibleItems.map((item, index) => (
          <li key={`${item.id}-${index}`} className={item.level === 3 ? "is-nested" : undefined}>
            <a href={`#${item.id}`}>
              <span className="blog-toc-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>

      {hasMore && (
        <button
          type="button"
          className="blog-toc-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show fewer sections" : `View all ${items.length} sections`}
          <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      )}
    </nav>
  );
}
