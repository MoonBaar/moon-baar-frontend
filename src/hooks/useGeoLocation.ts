import {GeocodeProps} from '@/assets/types/map';
import {useEffect, useState} from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState<GeocodeProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (position: GeolocationPosition) => {
    const {latitude, longitude} = position.coords;
    setLocation({latitude, longitude});
  };

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return {location, error};
};
