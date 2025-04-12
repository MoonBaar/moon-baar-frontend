export interface EventProps {
  id: number;
  title: string;
  category: string;
  district: string;
  place: string;
  startDate: string;
  endDate: string;
  isFree: boolean;
  imageUrl: string;
  latitude: number;
  longitude: number;
  isLiked: boolean;
}

export interface EventListProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  events: EventProps[];
}
