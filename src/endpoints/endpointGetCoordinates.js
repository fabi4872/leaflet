import axios from 'axios';

export async function endpointGetCoordinates(address) {
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`;
    const response = await axios.get(url);
    const data = response.data;
    // hacer algo con el objeto JSON de respuesta (por ejemplo, mostrar un marcador en el mapa)
    return data;
  } catch (error) {
    // manejar el error
    console.error(error);
    return null;
  }
}
