export interface EventProps {
  id: number;
  title: string;
  category: string;
  district: string;
  place: string;
  startDate: string;
  endDate: string;
  isFree: boolean;
  useFee?: string;
  useTarget?: string;
  program?: string;
  etcDesc?: string;
  mainImg: string;
  orgName?: string;
  orgLink?: string;
  latitude: number;
  longitude: number;
  isLiked: boolean;
  isVisited?: boolean;
  visitCount?: number;
  likeCount?: number;
}

export interface EventListProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  events: EventProps[];
}
