import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Mapa = () => {
  const position = [-34.92145, -57.95453];
      
  return (
    <MapContainer 
      center={ position } 
      zoom={ 13 } 
      style={{ width: '29.3rem', height: '29.3rem' }} 
      className='leaflet-container'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    </MapContainer>
  );
}
