export interface boundsProps {
  maxLat: number | null;
  minLat: number | null;
  maxLng: number | null;
  minLng: number | null;
}

export interface footprintProps {
  id: number;
  latitude: number;
  longitude: number;
  mainImg: string;
  place: string;
  title: string;
  visitedAt: string;
}

export interface footprintListProps {
  events: footprintProps[];
}
