import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { endpointGetCoordinates } from '../endpoints';
import { SelectFormulario } from './SelectFormulario';

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

export const Formulario = () => {
  const [ selectPais, setSelectPais ] = useState(paises[0].value);
  const [ selectProvincia, setSelectProvincia ] = useState(provincias[0].value);
  const [ selectCiudad, setSelectCiudad ] = useState(ciudades[0].value);
  const [ coordinates, setCoordinates ] = useState(null);
  const [ coloresForm, setColoresForm ] = useState({
    colorPais: 'primary',
    colorProvincia: 'primary',
    colorCiudad: 'primary',
    colorCodigoPostal: 'primary',
    colorCalle:'primary',
    colorAltura:'primary',
    colorCalle1:'primary',
    colorCalle2:'primary',
    colorPiso:'primary',
    colorUnidad:'primary',
    colorObservaciones:'primary'
  });

  async function handleSearch(event) {
    event.preventDefault();
    const codigoPostal = document.getElementById('codigoPostal').value;
    const calle = document.getElementById('calle').value;
    const altura = document.getElementById('altura').value;
    const address = `${ calle }+${ altura },${ selectCiudad },${ codigoPostal },${ selectProvincia },${ selectPais }`;
    const data = await endpointGetCoordinates(address);
    setCoordinates(data ? data.features[0].geometry.coordinates : null);
    console.log(data);
  }

  const handleSelectChangePais = (event) => {
    setSelectPais(event.target.value);
  }

  const handleSelectChangeProvincia = (event) => {
    setSelectProvincia(event.target.value);
  }

  const handleSelectChangeCiudad = (event) => {
    setSelectCiudad(event.target.value);
  }

  return (
    <>
      <Grid
        container
        direction='row'
        padding={ 2 }
        width={ 500 }
        boxShadow='0 0.5rem 0.5rem 0 #CCCCCC'
        borderTop='0.3rem solid #1976D2'
      >
        <Typography variant='h5' color='primary' width='100%' paddingX={ 1 } paddingY={ 2 }>Dirección</Typography>
        <SelectFormulario value={ selectPais } onChangeSelect={ handleSelectChangePais } currencies={ paises } required={ true } label='País' id='pais' name='pais' autoComplete='off' color={ coloresForm.colorPais } xs={ 12 } md={ 6 } />
        <SelectFormulario value={ selectProvincia } onChangeSelect={ handleSelectChangeProvincia } currencies={ provincias } required={ true } label='Provincia' id='provincia' name='provincia' autoComplete='off' color={ coloresForm.colorProvincia } xs={ 12 } md={ 6 } />
        <SelectFormulario value={ selectCiudad } onChangeSelect={ handleSelectChangeCiudad } currencies={ ciudades } required={ true } label='Ciudad' id='ciudad' name='ciudad' autoComplete='off' color={ coloresForm.colorCiudad } xs={ 12 } md={ 8 } />
        <InputFormulario required={ true } label='Código Postal' id='codigoPostal' name='codigoPostal' autoComplete='off' color={ coloresForm.colorCodigoPostal } xs={ 12 } md={ 4 } />
        <InputFormulario required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color={ coloresForm.colorCalle } xs={ 12 } md={ 8 } />
        <InputFormulario required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color={ coloresForm.colorAltura } xs={ 12 } md={ 4 } />
        <InputFormulario required={ false } label='Calle 1' id='calle1' name='calle1' autoComplete='off' color={ coloresForm.colorCalle1 } xs={ 12 } md={ 6 } />
        <InputFormulario required={ false } label='Calle 2' id='calle2' name='calle2' autoComplete='off' color={ coloresForm.colorCalle2 } xs={ 12 } md={ 6 } />
        <InputFormulario required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color={ coloresForm.colorPiso } xs={ 12 } md={ 3 } />
        <InputFormulario required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color={ coloresForm.colorUnidad } xs={ 12 } md={ 3 } />
        <InputFormulario required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color={ coloresForm.colorObservaciones } xs={ 12 } md={ 6 } />
        
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
        >
          <Button 
            variant='contained'
            onClick={ handleSearch } 
            sx={{
              margin:'1.5rem'
            }}
          >
            Enviar
          </Button>
        </Box>
      </Grid>
    </>
  )
}
