import {create} from 'zustand';

export interface User {
  id: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updateAt: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: user => set({user}),
}));
