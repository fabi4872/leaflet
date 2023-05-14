import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ value, onChangeForm, required, label, id, name, autoComplete, color, xs, md, paddingBottom = 2 }) => {
  const onChange = ({ target }) => {
    onChangeForm( target );
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
        fullWidth
      />
    </Grid>
  )
}
