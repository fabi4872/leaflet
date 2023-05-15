import { Formulario } from './components';

const provincias = [
  {
    id: '0',
    value: 'Buenos Aires'
  }
];

const ciudades = [
  {
    id: '0',
    value: 'Avellaneda',
    postcode: '1870',
    lat: -34.6625,
    lng: -58.365
  },
  {
    id: '1',
    value: 'City Bell',
    postcode: '1896',
    lat: -34.85889,
    lng: -58.05417
  },
  {
    id: '2',
    value: 'La Plata',
    postcode: '1900',
    lat: -34.92145,
    lng: -57.95453 
  },
  {
    id: '3',
    value: 'Mar del Plata',
    postcode: '7600',
    lat: -38.00042,
    lng: -57.5562 
  }
];

const App = () => {
  return (
    <Formulario provincias={ provincias } ciudades={ ciudades } />
  )
}

export default App;
