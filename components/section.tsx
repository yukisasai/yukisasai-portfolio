import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** 小さなラベル（大文字・字間広め） */
  eyebrow?: string;
  /** 英語の大見出し */
  title: string;
  /** 補足説明（任意） */
  description?: string;
  children?: ReactNode;
};

/**
 * セクション共通の枠。
 * 上ヘアライン + eyebrow + 大きな見出し + 説明 + 差し色の罫線 + 中身。
 * 各セクションはこれを使って統一感を出す。
 */
export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="section scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <div className="container-content">
        <header className="reveal">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2
            id={`${id}-heading`}
            className="mt-4 display text-4xl leading-[1.08] sm:text-5xl md:text-6xl md:leading-[1.08]"
          >
            {title.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          {description && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mute">{description}</p>
          )}
          <div className="accent-rule mt-8" />
        </header>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
