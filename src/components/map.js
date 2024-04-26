import React from 'react'
import GoogleMapReact from 'google-map-react'
import useLocationStore from '@/store/useLocationStore'

const Marker = () => {
  return (
    <div>
        <h1>A</h1>
    </div>
  )
}

const SimpleMap = () => {

  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const setLocation = useLocationStore(state => state.setLocation);

  useEffect(() => {
    // Alerta para ingresar la latitud y longitud
    const userCoordinates = prompt('Por favor, ingrese la latitud y longitud (formato: latitud, longitud):');
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
  }, []);

  const defaultMarkers = [
    { lat: -31.372509606166734, lng: -64.2254951310065, text: 'A' },
    { lat: -31.395991420841263, lng: -64.20362173274664, text: 'B' },
    { lat: -31.356331464415337, lng: -64.29891745648752, text: 'C' }
  ];

  const initUserSearch = {
    center: {
      lat: userLocation.latitude || -31.4201,
      lng: userLocation.longitude || -64.1888
    },
    zoom: 13,
    km: 5
  };

  const key = process.env.NEXT_PUBLIC_GMAPS_KEY

  return (
  // Important! Always set the container height explicitly
    <div className='w-full h-[calc(100vh-200px)] p-4 overflow-hidden rounded-lg'>
            <GoogleMapReact
              bootstrapURLKeys={{ key: key, language: 'es', region: 'es' }}
              defaultCenter={{
                lat: -31.4201,
                lng: -64.1888
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
            text="Usuario"
          />
        )}
            </GoogleMapReact>
    </div>
  )
}
export default SimpleMap