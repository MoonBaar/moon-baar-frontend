import {footprintProps} from '@/assets/types/map';
import {create} from 'zustand';

interface InfoBoxState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useInfoBoxStore = create<InfoBoxState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({isOpen}),
}));

interface EventsInfoState {
  eventsInfo: footprintProps[];
  setEventsInfo: (eventsInfo: footprintProps[]) => void;
}

export const useEventsInfoStore = create<EventsInfoState>(set => ({
  eventsInfo: [],
  setEventsInfo: eventsInfo => set({eventsInfo}),
}));

interface MapState {
  latitude: number;
  longitude: number;
  level: number;
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;
  setLevel: (l: number) => void;
}

export const useMapStore = create<MapState>(set => ({
  latitude: 37.566826,
  longitude: 126.9786567,
  level: 9,
  setLatitude: lat => set({latitude: lat}),
  setLongitude: lng => set({longitude: lng}),
  setLevel: l => set({level: l}),
}));
