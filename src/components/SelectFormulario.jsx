import { useEffect } from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';

export const SelectFormulario = ({ value, setCoordinatesCity = undefined, setCoordinatesDirection = undefined, onChangeFormMultiple = undefined, provincia = undefined, currencies, required, label, id, name, autoComplete, color, xs, md }) => {
  const onChange = ({ target }) => {
    if (onChangeFormMultiple) {
      onChangeFormMultiple({
        provincia: ( provincia !== undefined ) ? provincia : '',
        ciudad: target.value,
        codigoPostal: '',
        calle: '',
        altura: '',
        entreCalles: '',
        piso: '',
        unidad: '',
        observaciones: ''
      });

      if (setCoordinatesCity !== undefined && setCoordinatesDirection !== undefined) {
        const ciudadResult = currencies.find(({ value }) => value == target.value);
        const coordinatesCityResult = [ciudadResult.lng, ciudadResult.lat];
        setCoordinatesCity(coordinatesCityResult);
        setCoordinatesDirection([]);
      }
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
