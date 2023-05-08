import { Grid, MenuItem, TextField } from '@mui/material';

export const SelectFormulario = ({ currencies, required, label, id, name, autoComplete, color, xs, md }) => {
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
