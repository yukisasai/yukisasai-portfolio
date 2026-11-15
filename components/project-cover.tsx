import Image from "next/image";
import type { CaseStudyItem } from "@/components/case-study";

/** 実績のアイキャッチ。画像が無いときは淡いグレー面にタイトルを置く */
export function ProjectCover({
  project,
  priority = false,
  className = "",
}: {
  project: CaseStudyItem;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[18px] bg-cream ${className}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width:768px) 50vw, 100vw"
          className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          priority={priority}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream to-[#E3E3E8]">
          <span className="display text-xl text-mute">{project.name}</span>
        </div>
      )}
    </div>
  );
}
