export interface EventProps {
  id: number;
  title: string;
  category?: string;
  district?: string;
  place: string;
  startDate: string;
  endDate: string;
  isFree?: boolean;
  mainImg: string;
  latitude?: number;
  longitude?: number;
  isVisited?: boolean;
}

export interface EventDetailProps extends EventProps {
  useFee: string;
  useTarget: string;
  program: string;
  etcDesc: string;
  orgName: string;
  orgLink: string;
  isLiked: boolean;
  visitCount?: number;
  likeCount?: number;
  category: string;
}

export interface EventListProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  events: EventProps[];
}
