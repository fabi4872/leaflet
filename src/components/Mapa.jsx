import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const Marcador = ({ coordinates }) => {
  const map = useMap();
  
  useEffect(() => {
    const latLng = L.latLng(coordinates[1], coordinates[0]);
    map.setView(latLng);
  }, [coordinates, map]);
 
  return (
    <Marker position={[coordinates[1], coordinates[0]]}>
      <Popup>
        Coordenadas: {coordinates[1]}, {coordinates[0]}
      </Popup>
    </Marker>
  );
};

export const Mapa = ({ coordinatesCenter }) => {
  return (
    <MapContainer 
      center={ coordinatesCenter } 
      zoom={ 13 } 
      style={{ width: '32rem', height: '32rem' }} 
      className='leaflet-container'
      throttleInterval={ 50 }
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marcador coordinates={coordinatesCenter} />
    </MapContainer>
  );
};
