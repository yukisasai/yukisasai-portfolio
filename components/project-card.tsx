import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/projects";

// Case Study の1項目（ラベル + 本文）
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="label-mono mb-1">{label}</dt>
      <dd className="leading-relaxed">{children}</dd>
    </div>
  );
}

/**
 * Case Study 形式のプロジェクトカード。
 * Overview / Problem / Solution / Role / Outcome / Tech Stack / Link を表示。
 */
export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className="card">
      <h3 className="font-sans text-2xl font-bold">{project.name}</h3>
      <p className="mt-3 text-muted">{project.overview}</p>

      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field label="Problem">{project.problem}</Field>
        <Field label="Solution">{project.solution}</Field>
        <Field label="Role">{project.role}</Field>
        <Field label="Outcome">{project.outcome}</Field>
      </dl>

      <div className="mt-7">
        <p className="label-mono mb-2">Tech Stack</p>
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.link && (
        <div className="mt-7">
          <a
            href={project.link.href}
            className="label-mono link-underline"
            {...(project.link.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {project.link.label} →
          </a>
        </div>
      )}
    </article>
  );
}
