export type ProjectDetailStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type ProjectDetailContent = {
  breadcrumb: string[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  introduction: {
    eyebrow: string;
    explorationTitle: string;
    explorationDescription: string;
    filters: string[];
    description: string;
    ctaLabel: string;
    ctaHref: string;
    stats: ProjectDetailStat[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    projects: Array<{
      id: string;
      eyebrow: string;
      title: string;
      location: string;
      scope: string;
      description: string;
      images: Array<{ src: string; alt: string }>;
    }>;
  };
};
