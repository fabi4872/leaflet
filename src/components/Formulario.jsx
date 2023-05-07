import { Grid } from '@mui/material';
import { InputFormulario } from './InputFormulario';

export const Formulario = () => {
  return (
    <Grid
      container
      direction='row'
      spacing={ 5 }
      padding={ 2 }
      width={ 500 }
    >
      <InputFormulario required={ true } label='Calle' id='calle' name='calle' autoComplete='off' xs={ 12 } md={ 8 } />
      <InputFormulario required={ true } label='Altura' id='altura' name='altura' autoComplete='off' xs={ 12 } md={ 4 } />
      <InputFormulario required={ false } label='Calle 1' id='calle1' name='calle1' autoComplete='off' xs={ 12 } md={ 6 } />
      <InputFormulario required={ false } label='Calle 2' id='calle2' name='calle2' autoComplete='off' xs={ 12 } md={ 6 } />
      <InputFormulario required={ false } label='Piso' id='piso' name='piso' autoComplete='off' xs={ 12 } md={ 3 } />
      <InputFormulario required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' xs={ 12 } md={ 3 } />
      <InputFormulario required={ false } label='Extra' id='extra' name='extra' autoComplete='off' xs={ 12 } md={ 6 } />
    </Grid> 
  )
}
