import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ required, label, id, name, autoComplete, color, xs, md }) => {
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
        fullWidth
      />
    </Grid>
  )
}
