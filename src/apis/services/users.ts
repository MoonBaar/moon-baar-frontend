import {BadgeProps} from '@/assets/types/badge';
import {badgeImg} from '@/assets/data/badgeImg';

export const getBadgeListWithImg = (data: BadgeProps[]) => {
  data.forEach(item => {
    const findImg = badgeImg.find(img => img.code === item.code.toLowerCase());
    if (findImg) {
      item.imgUrl = findImg.imgUrl;
    } else {
      item.imgUrl = null;
    }
  });
  return data;
};
