import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ required, label, id, name, autoComplete, xs, md }) => {
  return (
    <Grid
        item
        xs={ xs }
        md={ md }
      >
        <TextField
          required={ required }
          label={ label }
          id={ id }
          name={ name }
          autoComplete={ autoComplete }
          color='primary'
          fullWidth
        />
      </Grid>
  )
}
