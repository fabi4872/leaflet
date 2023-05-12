import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

export const InputFormulario = ({ value, onChangeForm, setOnBlurDirection, required, label, id, name, autoComplete, color, xs, md, paddingBottom = 2 }) => {
  const onChange = ({ target }) => {
    onChangeForm( target );
    if (target.name === 'codigoPostal' || target.name === 'calle' || target.name === 'altura') {
      setOnBlurDirection(false);
    }
    else {
      setOnBlurDirection(true);
    }
  }

  const handleKeyDown = (event) => {
    if (event.target.name === 'altura' || event.target.name === 'calle1' || event.target.name === 'calle2') {
      if (event.key === "Tab") {
        setOnBlurDirection(true);
      }
      else {
        setOnBlurDirection(false);
      }
    }
  };

  const handleOnClick = ({ target }) => {
    if (target.name === 'codigoPostal' || target.name === 'calle' || target.name === 'altura') {
      target.value = '';
      onChangeForm( target );
      setOnBlurDirection(false);
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
        onClick={ handleOnClick }
        onKeyDown={ handleKeyDown }
        fullWidth
      />
    </Grid>
  )
}
