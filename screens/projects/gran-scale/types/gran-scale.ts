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
    description: string;
    ctaLabel: string;
    ctaHref: string;
    stats: ProjectDetailStat[];
  };
  gallery: {
    eyebrow: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
};
