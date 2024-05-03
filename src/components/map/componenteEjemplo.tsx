import React from 'react';
import { useEffect } from 'react';
import useLocationStore from '@/store/useLocationStore'

const ComponenteEjemplo = () => {

  const { latitude, longitude } = useLocationStore(state => state);
  useEffect(() => {
    console.log('Ubicación del usuario:', latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div>
      h1
    </div>
  );
};
export default ComponenteEjemplo;