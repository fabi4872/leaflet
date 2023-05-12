import { useEffect, useState } from 'react';
import { useForm } from '../hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { endpointGetDirectionByData, endpointGetDirectionByCoordinates } from '../endpoints';
import { SelectFormulario } from './SelectFormulario';
import { Mapa } from './Mapa';

export const Formulario = ({ paises, provincias, ciudades }) => {
  const [ data, setData ] = useState({});
  const [ onBlurDirection, setOnBlurDirection ] = useState(true);
  const [ coordinatesCity, setCoordinatesCity ] = useState([ciudades[0].lng, ciudades[0].lat]);
  const [ coordinatesDirection, setCoordinatesDirection ] = useState([]);
    
  const { pais, provincia, ciudad, codigoPostal, calle, altura, calle1, calle2, piso, unidad, observaciones, onChangeForm, onChangeFormMultiple } = useForm({
    pais: paises[0].value,
    provincia: provincias[0].value,
    ciudad: ciudades[0].value,
    codigoPostal: '',
    calle: '',
    altura: '',
    calle1: '',
    calle2: '',
    piso: '',
    unidad: '',
    observaciones: ''
  });

  async function handleSearchDirection() {
    const address = `${ calle.trim() } ${ altura.trim() },${ ciudad.trim() },${ codigoPostal.trim() },${ provincia.trim() },${ pais.trim() }`;
    const newData = await endpointGetDirectionByData(address);
    if (newData != null) {
      setData(newData);
    }
    else {
      setData({});
    }
  }

  async function handleSearchDirectionByCoordinates() {
    if (coordinatesDirection.length != 0) {
      const dataDirectionWithCoordinates = await endpointGetDirectionByCoordinates(coordinatesDirection[1], coordinatesDirection[0]);
      
      if (dataDirectionWithCoordinates != null) {        
        const { properties } = dataDirectionWithCoordinates.features[0];
        
        if (properties.postcode == undefined || properties.street == undefined || properties.housenumber == undefined) {
          onChangeFormMultiple({
            pais,
            provincia,
            ciudad,
            codigoPostal: '',
            calle: '',
            altura: '',
            calle1: '',
            calle2: '',
            piso: '',
            unidad: '',
            observaciones: ''
          });
        }
        else {
          onChangeFormMultiple({
            pais,
            provincia,
            ciudad,
            codigoPostal: properties.postcode,
            calle: properties.street,
            altura: properties.housenumber,
            calle1,
            calle2,
            piso,
            unidad,
            observaciones
          });
        }
      }
    }
  }

  async function handleData() {
    const ciudadResult = ciudades.find(({ value }) => value == ciudad);
    const coordinatesCityResult = [ciudadResult.lng, ciudadResult.lat];
        
    if (Object.keys(data).length != 0 && onBlurDirection) {    
      const result = data.features.find(({ properties }) => {
        return properties && 'postcode' in properties && properties.postcode == codigoPostal.trim() &&
          'housenumber' in properties && properties.housenumber == altura.trim() &&
          'street' in properties && properties.street != undefined;
      });
      if (result != undefined) {
        const { geometry } = result;
        setCoordinatesCity(geometry.coordinates);
        setCoordinatesDirection(geometry.coordinates); 
      }
      else {
        setCoordinatesCity(coordinatesCityResult);
        setCoordinatesDirection([]);
      }   
    }
    else {
      setCoordinatesCity(coordinatesCityResult);
      setCoordinatesDirection([]);
    }
  }

  useEffect(() => {  
    if (pais.trim() != '' && provincia.trim() != '' && ciudad.trim() != '' && codigoPostal.trim() != '' && calle.trim() != '' && altura.trim() != '') {
      handleSearchDirection();
    }
    else {
      setData({});
    }
    return () => {
        
    }
  }, [ codigoPostal, calle, altura ]);

  useEffect(() => {
    handleSearchDirectionByCoordinates();
    return () => {
        
    }
  }, [ coordinatesCity ]);

  useEffect(() => {
    handleData();
    return () => {
        
    }
  }, [ onBlurDirection ]);

  useEffect(() => {
    return () => {
        
    }
  }, [ data ]);

  return (
    <>
      <Grid
        container
        direction='row'
        padding={ 2 }
        width={ 700 }
        paddingTop={ 1 }
        boxShadow='0 0.5rem 0.5rem 0 #CCCCCC'
        borderTop='0.3rem solid #1976D2'
        onClick={ handleClick }
        sx={{
          marginY: '2rem'
        }}
      >
        <Typography variant='h5' color='primary' width='100%' paddingX={ 1 } paddingY={ 3 }>Dirección</Typography>
        
        <SelectFormulario value={ pais } currencies={ paises } required={ true } label='País' id='pais' name='pais' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ provincia } currencies={ provincias } required={ true } label='Provincia' id='provincia' name='provincia' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ ciudad } setCoordinatesCity={ setCoordinatesCity } setCoordinatesDirection={ setCoordinatesDirection } onChangeFormMultiple={ onChangeFormMultiple } pais={ pais } provincia={ provincia } currencies={ ciudades } required={ true } label='Ciudad' id='ciudad' name='ciudad' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ codigoPostal } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ true } label='Código Postal' id='codigoPostal' name='codigoPostal' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ altura } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle1 } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ false } label='Calle 1' id='calle1' name='calle1' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <InputFormulario value={ calle2 } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ false } label='Calle 2' id='calle2' name='calle2' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <InputFormulario value={ piso } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ unidad } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ observaciones } onChangeForm={ onChangeForm } setOnBlurDirection={ setOnBlurDirection } required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color='primary' xs={ 12 } md={ 6 } paddingBottom={ 4 } />
        
        <Mapa 
          coordinatesCity={ coordinatesCity } 
          coordinatesDirection={ coordinatesDirection } 
          setCoordinatesCity={ setCoordinatesCity } 
          setCoordinatesDirection={ setCoordinatesDirection } />
        
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
        >
          <Button 
            variant='contained' 
            sx={{
              margin:'2rem 0 1rem 0'
            }}
          >
            Finalizar
          </Button>
        </Box>
      </Grid>
    </>
  )
}
