import { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ value, onChangeForm, required, label, id, name, autoComplete, color, xs, md }) => {
  const [ inputValue, setInputValue ] = useState('');

  const onChange = ({ target }) => {
    setInputValue( target.value );
    onChangeForm( target );
  }

  useEffect(() => {  
    return () => {
      
    }
  }, [ inputValue ]);

  return (
    <Grid
      item
      xs={ xs }
      md={ md }
      paddingY={ 2 }
      paddingX={ 1 }
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
