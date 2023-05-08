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
    value: 'Avellaneda'
  },
  {
    id: '1',
    value: 'La Plata'
  },
  {
    id: '2',
    value: 'Mar del Plata'
  }
];

const App = () => {
  return (
    <Formulario paises={ paises } provincias={ provincias } ciudades={ ciudades } />
  )
}

export default App;
