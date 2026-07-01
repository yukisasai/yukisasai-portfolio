// =============================================================
// Projects / Case Studies のデータ。
// 単なる作品集ではなく「設計して作れる」ことを伝える Case Study 形式。
// まずはダミー。実案件が出たらここを差し替え。
// =============================================================

export type CaseStudy = {
  slug: string;
  name: string;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  role: string;
  outcome: string;
  // 詳細・リポジトリ・デモへのリンク（後で差し替え）
  link?: { label: string; href: string };
};

export const projects: CaseStudy[] = [
  {
    slug: "towada-premium-coupon",
    name: "Towada Premium Coupon System",
    overview:
      "地域のプレミアム付きクーポンの申込から抽選・当選通知・管理までを一気通貫で扱う行政向けWebシステム。",
    problem: "申込・抽選・当選通知・管理を効率化する必要があった。",
    solution:
      "Next.js / Supabase / Resend / Vercel を使い、申込フォーム・管理画面・メール通知を構築。",
    techStack: ["Next.js", "TypeScript", "Supabase", "Resend", "Vercel"],
    role: "Requirement definition, database design, frontend, backend, deployment.",
    outcome: "申込〜通知の手作業を自動化し、運用工数を削減。抽選の透明性も確保。",
    // TODO: /projects/[slug] の詳細ページを作ったら link を追加する。
  },
  {
    slug: "docs-ai-assistant",
    name: "Docs AI Assistant",
    overview:
      "社内ドキュメントを横断検索して根拠つきで回答する RAG ベースの AI アシスタント。",
    problem: "情報が複数ツールに散在し、必要な答えを見つけるのに時間がかかっていた。",
    solution:
      "ドキュメントをベクトル化し、Next.js + OpenAI API で出典つき回答を返すチャットUIを構築。",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Supabase", "Vercel"],
    role: "Architecture, RAG pipeline, frontend, backend, deployment.",
    outcome: "問い合わせの一次回答を自動化し、情報検索の時間を短縮。",
  },
  {
    slug: "ai-writing-workbench",
    name: "AI Writing Workbench",
    overview: "下書きから推敲までを支援する AI 文章エディタ。",
    problem: "文章作成の試行錯誤に時間がかかり、複数モデルの比較もしづらかった。",
    solution:
      "ストリーミング応答と差分編集を備えたエディタを実装し、執筆フローを高速化。",
    techStack: ["Next.js", "TypeScript", "Anthropic API", "Tailwind CSS"],
    role: "Product design, frontend, LLM integration.",
    outcome: "推敲のイテレーションを短縮し、執筆体験を改善。",
  },
];
