import {useEffect, useState} from 'react';

interface LocationProps {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationProps | null>(null);
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
