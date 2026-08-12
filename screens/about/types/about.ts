export type AboutContent = {
  hero: { eyebrow: string; title: string; imageUrl: string };
  introduction: { lead: string; paragraphs: string[]; brochureHref: string };
  founders: { imageUrl: string; people: Array<{ name: string; role: string }>; stats: Array<{ value: string; label: string }>; paragraphs: string[] };
  interviews: Array<{ index: string; title: string; eyebrow: string; paragraphs: string[]; videoLabel: string; videoPosition: "left" | "right" | "full" }>;
  legacy: { index: string; title: string; paragraphs: string[] };
};
