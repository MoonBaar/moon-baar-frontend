import {create} from 'zustand';

interface ScrollState {
  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useScrollStore = create<ScrollState>(set => ({
  scrollY: 0,
  setScrollY: y => set({scrollY: y}),
}));

interface OpenState {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export const useIsOpenStore = create<OpenState>(set => ({
  isOpen: false,
  toggleIsOpen: () => set(state => ({isOpen: !state.isOpen})),
}));

interface FilterState {
  query: string | null;
  categoryFilter: {id: number; value: string} | null;
  isFreeFilter: {id: number; value: string} | null;
  districtFilter: {id: number; value: string} | null;
  startDate: string | null;
  setQuery: (val: string | null) => void;
  setCategoryFilter: (val: {id: number; value: string} | null) => void;
  setIsFreeFilter: (val: {id: number; value: string} | null) => void;
  setDistrictFilter: (val: {id: number; value: string} | null) => void;
  setStartDate: (date: string | null) => void;
  resetCategoryFilter: () => void;
  resetIsFreeFilter: () => void;
  resetDistrictFilter: () => void;
  resetStartDate: () => void;
  resetAllFilters: () => void;
}

export const useEventFilterStore = create<FilterState>(set => ({
  query: null,
  categoryFilter: null,
  isFreeFilter: null,
  districtFilter: null,
  startDate: null,
  setQuery: val => set({query: val}),
  setCategoryFilter: val => set({categoryFilter: val}),
  setIsFreeFilter: val => set({isFreeFilter: val}),
  setDistrictFilter: val => set({districtFilter: val}),
  setStartDate: val => set({startDate: val}),
  resetCategoryFilter: () => set({categoryFilter: null}),
  resetIsFreeFilter: () => set({isFreeFilter: null}),
  resetDistrictFilter: () => set({districtFilter: null}),
  resetStartDate: () => set({startDate: null}),
  resetAllFilters: () =>
    set({
      categoryFilter: null,
      isFreeFilter: null,
      districtFilter: null,
      startDate: null,
    }),
}));
