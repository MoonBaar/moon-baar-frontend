import {create} from 'zustand';

interface ScrollState {
  scrollY: number;
  setScrollY: (y: number) => void;
}

interface FilterState {
  query: string | null;
  category: string | null;
  isFree: string | null;
  district: string | null;
  setQuery: (val: string | null) => void;
  setCategory: (val: string | null) => void;
  setIsFree: (val: string | null) => void;
  setDistrict: (val: string | null) => void;
  resetCategory: () => void;
  resetIsFree: () => void;
  resetDistrict: () => void;
  resetAllFilters: () => void;
}

export const useScrollStore = create<ScrollState>(set => ({
  scrollY: 0,
  setScrollY: y => set({scrollY: y}),
}));

export const useEventFilterStore = create<FilterState>(set => ({
  query: null,
  category: null,
  isFree: null,
  district: null,
  setQuery: val => set({query: val}),
  setCategory: val => set({category: val}),
  setIsFree: val => set({isFree: val}),
  setDistrict: val => set({district: val}),
  resetCategory: () => set({category: null}),
  resetIsFree: () => set({isFree: null}),
  resetDistrict: () => set({district: null}),
  resetAllFilters: () =>
    set({
      category: null,
      isFree: null,
      district: null,
    }),
}));
