export type ProjectArea = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
};

export type ProjectStat = {
  value: number;
  suffix?: string;
  label: string;
};

export type ProjectsContent = {
  hero: { eyebrow: string; title: string; description: string; imageUrl: string };
  introduction: { eyebrow: string; title: string; description: string };
  areas: ProjectArea[];
  stats: ProjectStat[];
};
