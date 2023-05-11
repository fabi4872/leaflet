import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ value, onChangeForm, setData = undefined, required, label, id, name, autoComplete, color, xs, md, paddingBottom = 2 }) => {
  const onChange = ({ target }) => {
    onChangeForm( target );
  }

  const onFocus = (event) => {
    event.target.value = '';
    if (setData != undefined) {
      onChangeForm(event.target);
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
