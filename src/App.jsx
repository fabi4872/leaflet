import { Formulario } from './components';

const paises = [
  {
    id: '0',
    codigoPais: 'AR',
    value: 'Argentina'
  },
  {
    id: '1',
    codigoPais: 'BR',
    value: 'Brasil'
  },
  {
    id: '2',
    codigoPais: 'CO',
    value: 'Colombia'
  }
];

const provincias = [
  {
    id: '0',
    value: 'Buenos Aires'
  },
  {
    id: '1',
    value: 'Córdoba'
  },
  {
    id: '2',
    value: 'Corrientes'
  }
];

const ciudades = [
  {
    id: '0',
    value: 'Avellaneda',
    coordenadas: [ -34.6625, -58.365 ]
  },
  {
    id: '1',
    value: 'La Plata',
    coordenadas: [ -34.92145, -57.95453 ] 
  },
  {
    id: '2',
    value: 'Mar del Plata',
    coordenadas: [ -38.00042, -57.5562 ] 
  }
];

const App = () => {
  return (
    <Formulario paises={ paises } provincias={ provincias } ciudades={ ciudades } />
  )
}

export default App;
