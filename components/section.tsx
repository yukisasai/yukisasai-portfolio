import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** モノスペースの小見出しラベル */
  eyebrow?: string;
  /** 英語の大見出し */
  title: string;
  /** 補足説明（任意） */
  description?: string;
  children?: ReactNode;
};

/**
 * セクション共通の枠。
 * 上ヘアライン + eyebrow + 大きな見出し + 説明 + 中身。
 * 各セクションはこれを使って統一感を出す。
 */
export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="container-content">
        <header className="max-w-2xl reveal">
          {eyebrow && <p className="eyebrow mb-3 sm:mb-4">{eyebrow}</p>}
          <h2 id={`${id}-heading`} className="font-sans text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-lg text-muted">{description}</p>
          )}
        </header>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
