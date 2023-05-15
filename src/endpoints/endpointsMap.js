import axios from 'axios';

export async function endpointGetDirectionByData(address) {
  try {
    const url = `https://photon.komoot.io/api/?q=${ address }`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } 
    catch (error) {
    console.error(error);
    return null;
  }
}

export async function endpointGetDirectionByCoordinates(lat, lng) {
  try {
    const url = `https://photon.komoot.io/reverse?lon=${ lng }&lat=${ lat }`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } 
    catch (error) {
    console.error(error);
    return null;
  }
}

export async function endpointGetDirectionByDataGeoref(address, provincia, ciudad) {
  try {
    const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${ address }&provincia=${ provincia }&localidad=${ ciudad }&campos=estandar`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } 
    catch (error) {
    console.error(error);
    return null;
  }
}
