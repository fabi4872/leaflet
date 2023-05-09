import axios from 'axios';

export async function endpointGetCoordinates(address) {
  try {
    const url = `https://photon.komoot.io/api/?q=${address}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
