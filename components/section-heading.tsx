/**
 * セクションの見出し。
 * 大きな英語見出し＋日本語の補足＋差し色の罫線。
 * 暗い背景のセクションでは dark を渡す。
 */
export function SectionHeading({
  en,
  ja,
  id,
  count,
  dark = false,
}: {
  en: string;
  ja?: string;
  id?: string;
  count?: string;
  dark?: boolean;
}) {
  return (
    <div id={id} className="reveal scroll-mt-28">
      <div className="flex items-end justify-between gap-6">
        <h2 className="display text-4xl leading-none sm:text-5xl md:text-7xl">{en}</h2>
        {count && (
          <span className={`display text-xl md:text-2xl ${dark ? "text-white/60" : "text-mute"}`}>
            {count}
          </span>
        )}
      </div>
      {ja && (
        <p className={`mt-4 text-sm tracking-wider ${dark ? "text-white/60" : "text-mute"}`}>{ja}</p>
      )}
      <div className="accent-rule mt-8" />
    </div>
  );
}
