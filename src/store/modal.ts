import {create} from 'zustand';

interface ModalData {
  type: string;
  height: number;
  img?: string;
  title: string;
  subtitle?: string;
  content?: string[];
}

interface ModalState {
  isOpen: boolean;
  data: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  data: null,
  openModal: (data: ModalData) =>
    set({
      isOpen: true,
      data,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      data: null,
    }),
}));
