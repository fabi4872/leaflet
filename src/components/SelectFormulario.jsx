import { useEffect } from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';

export const SelectFormulario = ({ value, onChangeForm, currencies, required, label, id, name, autoComplete, color, xs, md }) => {
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
    >
      <TextField
        select
        required={ required }
        label={ label }
        id={ id }
        name={ name }
        autoComplete={ autoComplete }
        color={ color }
        defaultValue={ currencies[0].value }
        value={ value }
        onChange={ onChange }
        fullWidth
      >
        {currencies.map((option) => (
          <MenuItem key={ option.id } value={ option.value }>
            { option.value }
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )
}
