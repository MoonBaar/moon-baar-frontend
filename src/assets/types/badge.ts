export interface BadgeProps {
  id: number;
  badgeType: boolean;
  code: string;
  name: string;
  description: string;
  imgUrl: string | null;
  owned: boolean;
}

export interface BadgeImgProps {
  code: string;
  imgUrl: string;
}

export interface NextBadgeProps {
  id: number;
  code: string;
  name: string;
  description: string;
  progress: number;
  target: number;
}
