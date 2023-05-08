import { useEffect, useState } from 'react';
import { useForm } from '../hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { endpointGetCoordinates } from '../endpoints';
import { SelectFormulario } from './SelectFormulario';

export const Formulario = ({ paises, provincias, ciudades }) => {
  const [ coordinates, setCoordinates ] = useState(null);
  const { pais, provincia, ciudad, codigoPostal, calle, altura, calle1, calle2, piso, unidad, observaciones, onChangeForm } = useForm({
    pais: paises[0].value,
    provincia: provincias[0].value,
    ciudad: ciudades[0].value,
    codigoPostal: '',
    calle: '',
    altura: '',
    calle1: '',
    calle2: '',
    piso: '',
    unidad: '',
    observaciones: ''
  });

  async function handleSearch(event) {
    event.preventDefault();
    const address = `${ calle }+${ altura },${ ciudad },${ codigoPostal },${ provincia },${ pais }`;
    const data = await endpointGetCoordinates(address);
    setCoordinates(data ? data.features[0].geometry.coordinates : null);
    console.log(data);
  }

  useEffect(() => {  
    return () => {
      
    }
  }, []);

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
        <SelectFormulario value={ pais } onChangeForm={ onChangeForm } currencies={ paises } required={ true } label='País' id='pais' name='pais' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ provincia } onChangeForm={ onChangeForm } currencies={ provincias } required={ true } label='Provincia' id='provincia' name='provincia' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ ciudad } onChangeForm={ onChangeForm } currencies={ ciudades } required={ true } label='Ciudad' id='ciudad' name='ciudad' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ codigoPostal } onChangeForm={ onChangeForm } required={ true } label='Código Postal' id='codigoPostal' name='codigoPostal' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle } onChangeForm={ onChangeForm } required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ altura } onChangeForm={ onChangeForm } required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle1 } onChangeForm={ onChangeForm } required={ false } label='Calle 1' id='calle1' name='calle1' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <InputFormulario value={ calle2 } onChangeForm={ onChangeForm } required={ false } label='Calle 2' id='calle2' name='calle2' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <InputFormulario value={ piso } onChangeForm={ onChangeForm } required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ unidad } onChangeForm={ onChangeForm } required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ observaciones } onChangeForm={ onChangeForm } required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        
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
