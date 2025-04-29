import {create} from 'zustand';
import {persist} from 'zustand/middleware';
export interface User {
  id: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updateAt: string;
}

interface AuthState {
  user: User | null;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setIsGuest: (isGuest: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      user: null,
      isGuest: false,
      setUser: user => set({user}),
      setIsGuest: isGuest => set({isGuest}),
    }),
    {
      name: 'authStorage',
    },
  ),
);
