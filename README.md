# Yuki Sasai — Portfolio

Global AI Product Engineer のポートフォリオサイト。
AIとWeb技術で、世界で学び、地域へ価値を届ける。

## Links

- GitHub: https://github.com/yukisasai
- Portfolio: https://yukisasai-portfolio.vercel.app
- Zenn: https://zenn.dev/seamlessly
- LinkedIn: https://www.linkedin.com/in/%E8%A3%95%E5%B8%8C-%E4%BD%90%E3%80%85%E4%BA%95-031837235/

## Tech Stack

Next.js (App Router) / React / TypeScript / Tailwind CSS / Vercel

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

## Contact form (env)

お問い合わせフォーム（`/contact`）のメール送信は環境変数で管理します。
`.env.example` をコピーして `.env.local` を作成し、値を設定してください。

| 変数 | 用途 |
| --- | --- |
| `CONTACT_EMAIL` | 受信先メール（例: hello@yukisasai.com） |
| `CONTACT_FROM` | 送信元アドレス（Resend 検証済みドメイン） |
| `RESEND_API_KEY` | [Resend](https://resend.com) の API キー |

未設定の間はフォームが代替導線（GitHub / LinkedIn）を案内します。

## Structure

- `app/` … ページ・レイアウト・API（`app/api/contact`）・OGP 画像
- `components/` … Nav / Section / ProjectCard / ContactForm など
- `data/projects.ts` … Case Study データ
- `lib/site.ts` … 文章・リンクなどサイト全体のデータ
