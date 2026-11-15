"use client";
import { useMemo, useState } from "react";
import type { CaseStudyItem } from "@/components/case-study";
import { ProjectCard } from "./project-card";

export function ProjectList({
  projects,
  locale,
  allLabel,
  countLabel,
}: {
  projects: CaseStudyItem[];
  locale: string;
  allLabel: string;
  countLabel: string;
}) {
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))).sort(),
    [projects]
  );
  const [cat, setCat] = useState<string>(allLabel);
  const list = useMemo(
    () => projects.filter((p) => cat === allLabel || p.category === cat),
    [projects, cat, allLabel]
  );

  const btn = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-[12px] tracking-wider transition ${
      active ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[allLabel, ...categories].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={btn(cat === c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="mt-6 display text-lg text-mute">
        {list.length} {countLabel}
      </p>
      <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} project={p} locale={locale} color={i} />
        ))}
      </div>
    </div>
  );
}
