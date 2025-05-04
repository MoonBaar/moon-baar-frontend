export interface EventProps {
  id: number;
  title: string;
  category: string;
  district?: string;
  place: string;
  startDate: string;
  endDate: string;
  isFree: boolean;
  mainImg: string;
  isVisited: boolean;
  visitedAt?: string;
}

export interface EventDetailProps extends EventProps {
  useFee: string;
  useTarget: string;
  program: string;
  etcDesc: string;
  orgName: string;
  orgLink: string;
  latitude: number;
  longitude: number;
  visitCount: number;
  likeCount: number;
  isLiked: boolean;
}

export interface EventListProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  events: EventProps[];
}
