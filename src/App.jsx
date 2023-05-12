import { Formulario } from './components';

const paises = [
  {
    id: '0',
    value: 'Argentina'
  }
];

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
    lat: -34.6625,
    lng: -58.365
  },
  {
    id: '1',
    value: 'La Plata',
    lat: -34.92145,
    lng: -57.95453 
  },
  {
    id: '2',
    value: 'Mar del Plata',
    lat: -38.00042,
    lng: -57.5562 
  }
];

const App = () => {
  return (
    <Formulario paises={ paises } provincias={ provincias } ciudades={ ciudades } />
  )
}

export default App;
