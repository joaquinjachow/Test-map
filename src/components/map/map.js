import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import useLocationStore from '@/store/useLocationStore'
import { FaMapMarkerAlt } from "react-icons/fa";

const Marker = () => {
  return (
    <div>
      <FaMapMarkerAlt size={20} color='red' />
    </div>
  )
}

const SimpleMap = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const setLocation = useLocationStore(state => state.setLocation);
  
  useEffect(() => {
      setLocation(-31.38548258926638, -64.21893709421742);
    }, []);	
  /*   useEffect(() => {
      // Alerta para ingresar la latitud y longitud dentro de los límites de Córdoba capital
      const userCoordinates = prompt('Por favor, ingrese la latitud y longitud dentro de los límites de Córdoba capital (latitud: -31.4886 a -31.3530, longitud: -64.2320 a -64.1430, formato: latitud, longitud):');
      if (userCoordinates) {
        const [latitude, longitude] = userCoordinates.split(',').map(coord => parseFloat(coord.trim()));
        if (!isNaN(latitude) && !isNaN(longitude)) {
          // Validar que la coordenada esté dentro de los límites de Córdoba capital
          const isWithinBounds = latitude >= -31.4886 && latitude <= -31.3530 && longitude >= -64.2320 && longitude <= -64.1430;
          if (isWithinBounds) {
            setUserLocation({ latitude, longitude });
            setLocation(latitude, longitude);
          } else {
            alert('La ubicación ingresada está fuera de los límites de Córdoba capital. Por favor, inténtelo de nuevo.');
          }
        } else {
          alert('Formato de coordenadas inválido. Por favor, inténtelo de nuevo.');
        }
      }
    }, []); */

  const defaultMarkers = [
    { lat: -31.372509606166734, lng: -64.2254951310065 },
    { lat: -31.395991420841263, lng: -64.20362173274664 },
    { lat: -31.356331464415337, lng: -64.29891745648752 }
  ];

  const initUserSearch = {
    center: {
      lat: userLocation.latitude || -31.38548258926638,
      lng: userLocation.longitude || -64.21893709421742
    },
    zoom: 13,
    km: 3,
  };

  const key = process.env.NEXT_PUBLIC_GMAPS_KEY

  return (
    // Important! Always set the container height explicitly
    <div className='w-full h-[calc(100vh-200px)] p-4 overflow-hidden rounded-lg'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key, language: 'es', region: 'es' }}
        defaultCenter={{
          lat: -31.38548258926638,
          lng: -64.21893709421742
        }}
        defaultZoom={initUserSearch.zoom}
        center={initUserSearch.center}
      >
        {defaultMarkers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.lat}
            lng={marker.lng}
          />
        ))}
        {userLocation.latitude && userLocation.longitude && (
          <Marker
            lat={userLocation.latitude}
            lng={userLocation.longitude}
          />
        )}
      </GoogleMapReact>
    </div>
  )
}
export default SimpleMap