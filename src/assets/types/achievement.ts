export interface AchievedProps {
  name: string;
  count: number;
  percentage: number;
}

export interface AchievementProps {
  subtitle?: string;
  total?: number;
  type?: string;
  color: string;
  data: AchievedProps | null;
}

export interface StatProps {
  summary: {
    totalVisits: number;
    thisMonthVisits: number;
  };
  categories: {
    top: AchievedProps;
    all: string[];
  };
  districts: {
    top: AchievedProps;
    all: string[];
  };
}
