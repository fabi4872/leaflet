import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export const Mapa = ({ coordinatesCenter }) => {
  return (
    <MapContainer 
      center={ coordinatesCenter } 
      zoom={ 13 } 
      style={{ width: '29.3rem', height: '29.3rem' }} 
      className='leaflet-container'
      throttleInterval={ 50 }
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    </MapContainer>
  );
}
