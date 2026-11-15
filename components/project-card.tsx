import Link from "next/link";
import type { CaseStudyItem } from "@/components/case-study";
import { ProjectCover } from "./project-cover";

/** 実績カードの差し色（順に巡回させる） */
const POP = ["text-[#0071E3]", "text-[#5856D6]", "text-[#8944AB]", "text-[#00827F]", "text-[#C7357A]", "text-[#B25000]", "text-[#C4302B]"];

/** 表示用に http(s):// と末尾のスラッシュを落とす */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function ProjectCard({
  project,
  locale,
  index,
  total,
  color = 0,
}: {
  project: CaseStudyItem;
  locale: string;
  index?: number;
  total?: number;
  color?: number;
}) {
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="group reveal block">
      <ProjectCover project={project} />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-wider text-mute">{project.category}</p>
          <h3 className="mt-1 text-[15px] font-medium leading-relaxed md:text-base">{project.name}</h3>
          <p className="mt-2 text-[11px] tracking-wider">
            {project.techStack.slice(0, 3).map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="text-line"> / </span>}
                <span className={POP[(color + i) % POP.length]}>{t}</span>
              </span>
            ))}
          </p>
          {project.url && (
            <p className="mt-1 text-[11px] tracking-wide text-blue-link">↗ {displayUrl(project.url)}</p>
          )}
        </div>
        {index !== undefined && total !== undefined && (
          <span className="shrink-0 display text-lg text-mute">
            {String(index + 1).padStart(2, "0")}
            <span className="text-line">/</span>
            {String(total).padStart(2, "0")}
          </span>
        )}
      </div>
    </Link>
  );
}
