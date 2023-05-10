import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const Marcador = ({ coordinatesCenter }) => {
  const map = useMap();
  
  useEffect(() => {
    const latLng = L.latLng(coordinatesCenter[1], coordinatesCenter[0]);
    map.setView(latLng);
  }, [ coordinatesCenter, map ]);
 
  return (
    <Marker position={[coordinatesCenter[1], coordinatesCenter[0]]}>
      <Popup>
        Coordenadas: {coordinatesCenter[1]}, {coordinatesCenter[0]}
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
      
      <Marcador coordinatesCenter={ coordinatesCenter } />
    </MapContainer>
  );
};
