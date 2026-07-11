import { XMLParser } from "fast-xml-parser";

// ── 型定義 ──────────────────────────────────────────────
// 外部に公開する、記事1件ぶんの型。
// 呼び出し側はこの型だけ知っていれば OK。
export type ZennArticle = {
  title: string;
  url: string;
  publishedAt: string; // ISO 8601 形式の日付文字列
};

// RSS XML をパースしたときの内部型。
// Zenn の RSS は <item> の中に <title>, <link>, <pubDate> を持つ。
type RssItem = {
  title: string;
  link: string;
  pubDate: string;
};

// ── 定数 ─────────────────────────────────────────────────
const ZENN_FEED_URL = "https://zenn.dev/yukisasai/feed";
const MAX_ARTICLES = 5;

// ── 本体 ─────────────────────────────────────────────────
/**
 * Zenn の RSS フィードをサーバー側で取得し、
 * 最新記事の配列を返す。取得に失敗した場合は null を返す。
 */
export async function getZennArticles(): Promise<ZennArticle[] | null> {
  try {
    const res = await fetch(ZENN_FEED_URL, {
      next: { revalidate: 3600 }, // 1 時間キャッシュ（ISR）
    });

    if (!res.ok) return null;

    const xml = await res.text();

    // fast-xml-parser でXMLをJSオブジェクトに変換
    const parser = new XMLParser();
    const feed = parser.parse(xml);

    // RSS 2.0 の構造: rss > channel > item
    // item が1件だけだと fast-xml-parser は配列ではなくオブジェクトを返すため正規化する
    const raw = feed?.rss?.channel?.item;
    const items: RssItem[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
    if (items.length === 0) return null;

    return items.slice(0, MAX_ARTICLES).map((item) => ({
      title: item.title,
      url: item.link,
      publishedAt: new Date(item.pubDate).toISOString(),
    }));
  } catch {
    return null;
  }
}
