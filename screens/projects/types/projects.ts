export type ProjectImageItem = {
  src: string;
  alt?: string;
};

export type ProjectItem = {
  id: string;
  number?: string;
  category?: string;
  title: string;
  locationLabel?: string;
  location: string;
  scopeSummary: string;
  details: string[];
  totalImages?: number;
  thumbnailUrl?: string;
  images: ProjectImageItem[];
};

export type ServiceMetric = {
  value: string;
  label: string;
};

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
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    imageUrl: string;
    backHref?: string;
    backLabel?: string;
    showBackBar?: boolean;
  };
  introduction: {
    eyebrow?: string;
    title: string;
    description?: string;
    projects?: ProjectItem[];
  };
  serviceOverview: {
    eyebrow?: string;
    title?: string;
    description: string;
    ctaLabel: string;
    ctaHref?: string;
    metrics?: ServiceMetric[];
    projects?: ProjectItem[];
  };
  selectedProjects: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    backToTopLabel?: string;
    projects?: ProjectItem[];
  };
  areas: ProjectArea[];
  stats: ProjectStat[];
};
