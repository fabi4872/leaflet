import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ value, onChangeForm = undefined, setChangeCPCalleAltura = undefined, required, label, id, name, autoComplete, color, xs, md, paddingBottom = 2 }) => {
  const onChange = ({ target }) => {
    if (onChangeForm != undefined) {
      onChangeForm( target );
    }
    else { 
      setChangeCPCalleAltura( target.value );
    }
  }

  useEffect(() => {  
    
    return () => {
      
    }
  }, [  ]);

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
