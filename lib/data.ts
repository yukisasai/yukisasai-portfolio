import techStackData from "@/data/tech-stack.json";
import careerData from "@/data/career.json";
import servicesData from "@/data/services.json";
import usesData from "@/data/uses.json";

type Localized = { ja: string; en: string };

function resolve(obj: Localized, locale: string): string {
  return (obj as Record<string, string>)[locale] ?? obj.ja;
}

// ---------------------------------------------------------------------------
// Tech Stack
// ---------------------------------------------------------------------------

export type TechGroup = {
  label: string;
  items: string[];
};

export function getTechStack(locale: string): TechGroup[] {
  return techStackData.groups.map((g) => ({
    label: resolve(g.label as unknown as Localized, locale),
    items: g.items,
  }));
}

// ---------------------------------------------------------------------------
// Career
// ---------------------------------------------------------------------------

export type CareerStep = {
  year: string | null;
  title: string;
};

export function getCareerSteps(locale: string): CareerStep[] {
  return careerData.steps.map((s) => ({
    year: s.year,
    title: resolve(s.title as unknown as Localized, locale),
  }));
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export type ServiceItem = {
  name: string;
  badge: string | null;
};

export function getServices(locale: string): ServiceItem[] {
  return servicesData.items.map((s) => ({
    name: resolve(s.name as unknown as Localized, locale),
    badge: s.badge,
  }));
}

// ---------------------------------------------------------------------------
// Uses
// ---------------------------------------------------------------------------

export type UsesItem = {
  name: string;
  category: string;
  description: string;
};

export function getUses(locale: string): UsesItem[] {
  return usesData.items.map((item) => ({
    name: item.name,
    category: resolve(item.category as unknown as Localized, locale),
    description: resolve(item.description as unknown as Localized, locale),
  }));
}
