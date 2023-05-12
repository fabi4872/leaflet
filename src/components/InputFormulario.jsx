import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ value, onChangeForm, setOnBlurDirection, required, label, id, name, autoComplete, color, xs, md, paddingBottom = 2 }) => {
  const onChange = ({ target }) => {
    if (target.name === 'codigoPostal' || target.name === 'calle' || target.name === 'altura') {
      setOnBlurDirection(false);
    }
    else {
      setOnBlurDirection(true);
    }
    onChangeForm( target );
  }

  const onFocus = ({ target }) => {
    if (target.name === 'codigoPostal' || target.name === 'calle' || target.name === 'altura') {
      target.value = '';
      setOnBlurDirection(false);
      onChangeForm( target );
    }
    else {
      setOnBlurDirection(true);
    }
  }

  useEffect(() => {  
    return () => {
      
    }
  }, []);

  return (
    <Grid
      item
      xs={ xs }
      md={ md }
      paddingY={ 2 }
      paddingX={ 1 }
      paddingBottom={ paddingBottom }
    >
      <TextField
        required={ required }
        label={ label }
        id={ id }
        name={ name }
        autoComplete={ autoComplete }
        color={ color }
        value={ value }
        onChange={ onChange }
        onFocus={ onFocus }
        fullWidth
      />
    </Grid>
  )
}
