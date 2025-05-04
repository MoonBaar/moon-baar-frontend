import {getEventDetail, getEventDetailStatus} from '../api/event';

export const getEventDetailWithStatus = (id: number) => {
  const detail = getEventDetail(id);
  const status = getEventDetailStatus(id);

  return Promise.all([detail, status]).then(([detail, status]) => {
    return {
      ...detail,
      ...status,
    };
  });
};
