import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const Marcador = ({ coordinatesCity, coordinatesDirection, setCoordinatesCity, setCoordinatesDirection }) => {
  const map = useMap();
  
  useEffect(() => {
    const latLng = L.latLng(coordinatesCity[1], coordinatesCity[0]);
    map.setView(latLng);
  }, [ coordinatesCity, map ]);

  const handleDragEnd = (event) => {
    const marker = event.target;
    const position = marker.getLatLng();
    setCoordinatesCity([position.lng, position.lat]);
    setCoordinatesDirection([position.lng, position.lat]);
  };
 
  if (coordinatesDirection !== undefined) {
    return (
      <Marker 
        position={[coordinatesCity[1], coordinatesCity[0]]}
        draggable={ true } 
        eventHandlers={{ dragend: handleDragEnd }}
      >
        <Popup>
          Coordenadas: {coordinatesCity[1]}, {coordinatesCity[0]}
        </Popup>
      </Marker>
    );
  }
  else {
    return null;
  }
};

export const Mapa = ({ coordinatesCity, coordinatesDirection, setCoordinatesCity, setCoordinatesDirection }) => {
  return (
    <MapContainer 
      center={ coordinatesCity } 
      zoom={ 13 } 
      style={{ width: '25rem', height: '25rem' }} 
      className='leaflet-container'
      throttleInterval={ 50 }
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      
      <Marcador 
        coordinatesCity={ coordinatesCity }
        coordinatesDirection={ coordinatesDirection }  
        setCoordinatesCity={ setCoordinatesCity } 
        setCoordinatesDirection={ setCoordinatesDirection } />
    </MapContainer>
  );
};
