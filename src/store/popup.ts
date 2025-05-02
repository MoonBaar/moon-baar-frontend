import {create} from 'zustand';

interface PopupData {
  name: string;
  imgUrl: string;
  description: string;
}

interface PopupState {
  isOpen: boolean;
  data: PopupData | null;
  openPopup: (data: PopupData) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>(set => ({
  isOpen: false,
  data: null,
  openPopup: (data: PopupData) =>
    set({
      isOpen: true,
      data,
    }),
  closePopup: () =>
    set({
      isOpen: false,
      data: null,
    }),
}));
