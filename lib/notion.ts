import { Client } from "@notionhq/client";

export type ContactEntry = {
  name: string;
  email: string;
  category: string;
  message: string;
  companyName?: string;
  companyUrl?: string;
  budget?: string;
  deadline?: string;
  referral?: string;
};

export async function saveToNotion(entry: ContactEntry): Promise<void> {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_CONTACT_DB_ID;

  if (!apiKey || !dbId) {
    console.warn("[notion] NOTION_API_KEY or NOTION_CONTACT_DB_ID not set — skipping.");
    return;
  }

  const notion = new Client({ auth: apiKey });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const properties: Record<string, any> = {
    "お名前": { title: [{ text: { content: entry.name } }] },
    "メールアドレス": { email: entry.email },
    "お問い合わせ種別": { select: { name: entry.category } },
    "お問い合わせ内容": { rich_text: [{ text: { content: entry.message.slice(0, 2000) } }] },
  };

  if (entry.companyName) {
    properties["会社名"] = { rich_text: [{ text: { content: entry.companyName } }] };
  }
  if (entry.companyUrl) {
    properties["会社URL"] = { url: entry.companyUrl };
  }
  if (entry.budget) {
    properties["予算"] = { select: { name: entry.budget } };
  }
  if (entry.deadline) {
    properties["希望納期"] = { select: { name: entry.deadline } };
  }
  if (entry.referral) {
    properties["流入元"] = { select: { name: entry.referral } };
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  await notion.pages.create({
    parent: { database_id: dbId },
    properties,
  });
}
