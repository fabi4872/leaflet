import { Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { useState } from 'react';

export const Formulario = () => {
  const [ coloresForm, setColoresForm ] = useState({
    colorCalle:'primary',
    colorAltura:'primary',
    colorCalle1:'primary',
    colorCalle2:'primary',
    colorPiso:'primary',
    colorUnidad:'primary',
    colorObservaciones:'primary'
  })

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
        <InputFormulario required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color={ coloresForm.colorCalle } xs={ 12 } md={ 8 } />
        <InputFormulario required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color={ coloresForm.colorAltura } xs={ 12 } md={ 4 } />
        <InputFormulario required={ false } label='Calle 1' id='calle1' name='calle1' autoComplete='off' color={ coloresForm.colorCalle1 } xs={ 12 } md={ 6 } />
        <InputFormulario required={ false } label='Calle 2' id='calle2' name='calle2' autoComplete='off' color={ coloresForm.colorCalle2 } xs={ 12 } md={ 6 } />
        <InputFormulario required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color={ coloresForm.colorPiso } xs={ 12 } md={ 3 } />
        <InputFormulario required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color={ coloresForm.colorUnidad } xs={ 12 } md={ 3 } />
        <InputFormulario required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color={ coloresForm.colorObservaciones } xs={ 12 } md={ 6 } />
      </Grid>
    </>
  )
}
