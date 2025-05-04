import {create} from 'zustand';

interface ModalData {
  type: string;
  height: number;
  img?: string | null;
  title: string;
  subtitle?: string;
  content?: string[];
}

interface ModalState {
  isOpen: boolean;
  data: ModalData | null;
  badgeQueue: ModalData[];
  openModal: (data: ModalData) => void;
  closeModal: () => void;
  enqueueBadge: (badge: ModalData) => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  data: null,
  badgeQueue: [],
  openModal: (data: ModalData) => {
    if (data.type === 'badge') return;
    set({
      isOpen: true,
      data,
    });
  },
  closeModal: () => {
    const current = get().data;
    set({isOpen: false, data: null});

    if (current?.type === 'badge') {
      const [, ...remaining] = get().badgeQueue;
      set({badgeQueue: remaining});

      if (remaining.length > 0) {
        set({
          data: remaining[0],
          isOpen: true,
        });
      }
    }
  },
  enqueueBadge: (badge: ModalData) => {
    const newQueue = [...get().badgeQueue, badge];
    set({badgeQueue: newQueue});

    if (!get().isOpen) {
      set({
        data: newQueue[0],
        isOpen: true,
      });
    }
  },
}));
