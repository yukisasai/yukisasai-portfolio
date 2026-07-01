"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/site";

// ナビのリンク（セクション id と対応）
const items = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#system-design", label: "System Design" },
  { href: "#skills", label: "Skills" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

/**
 * 追従ナビ（上部固定）＋スマホ用メニュー。
 * - PC: 横並びリンク
 * - スマホ: ハンバーガー → 全画面メニュー
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  // メニューを開いている間は背面スクロールを止める
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc キーで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="font-sans text-sm font-bold tracking-tight">
          {profile.name}
        </a>

        {/* PC 用リンク */}
        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="label-mono link-underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* スマホ用：開閉ボタン */}
        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="label-mono md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* スマホ用：全画面メニュー */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-paper md:hidden">
          <ul className="container-content flex flex-col gap-2 py-8">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-2xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
