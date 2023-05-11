import { useEffect, useState } from 'react';
import { useForm } from '../hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { endpointGetDirectionByData, endpointGetDirectionByCoordinates } from '../endpoints';
import { SelectFormulario } from './SelectFormulario';
import { Mapa } from './Mapa';

export const Formulario = ({ paises, provincias, ciudades }) => {
  const [ data, setData ] = useState(undefined);
  const [ coordinatesCity, setCoordinatesCity ] = useState([ciudades[0].lat, ciudades[0].lng]);
  const [ coordinatesDirection, setCoordinatesDirection ] = useState(undefined);
    
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
    if (pais !== '' && provincia !== '' && ciudad !== '' && codigoPostal !== '' && calle !== '' && altura !== '') {
      const address = `${ calle } ${ altura },${ ciudad },${ codigoPostal },${ provincia },${ pais }`;
      setData(await endpointGetDirectionByData(address));
    }
  }

  async function handleSearchDirectionByCoordinates() {
    if (coordinatesDirection !== undefined) {
      const data2 = await endpointGetDirectionByCoordinates(coordinatesDirection[1], coordinatesDirection[0]);
      
      if (data2 != undefined) {        
        const { properties } = data2.features[0];
        
        if (properties.postcode == undefined || properties.street == undefined || properties.housenumber == undefined) {
          onChangeFormMultiple({
            pais,
            provincia,
            ciudad,
            codigoPostal: '',
            calle: '',
            altura: '',
            calle1,
            calle2,
            piso,
            unidad,
            observaciones
          })
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
          })
        }
      }
    }
  }

  const handleData = () => {   
    const paisResult = ciudades.find(({ value }) => value === ciudad);
    const coordinatesCityResult = [paisResult.lng, paisResult.lat];

    if (data != undefined) {
      const resultWithFilter = data.features.filter(item => item.properties.postcode === codigoPostal && item.properties.housenumber === altura);
      if (resultWithFilter.length > 0) {
        setCoordinatesCity(resultWithFilter[0].geometry.coordinates);
        setCoordinatesDirection(resultWithFilter[0].geometry.coordinates);
      }
      else {
        setCoordinatesCity(coordinatesCityResult);
        setCoordinatesDirection(undefined);
      }   
    }
    else {
      setCoordinatesCity(coordinatesCityResult);
      setCoordinatesDirection(undefined);
    }
  }

  useEffect(() => {  
    handleSearchDirection();
    return () => {
        
    }
  }, [ codigoPostal, calle, altura ]);

  useEffect(() => {
    handleData();
    return () => {
        
    }
  }, [ data ]);

  useEffect(() => {
    handleSearchDirectionByCoordinates();
    return () => {
        
    }
  }, [ coordinatesCity ]);

  return (
    <>
      <Grid
        container
        direction='row'
        padding={ 2 }
        width={ 500 }
        paddingTop={ 1 }
        boxShadow='0 0.5rem 0.5rem 0 #CCCCCC'
        borderTop='0.3rem solid #1976D2'
        sx={{
          marginY: '2rem'
        }}
      >
        <Typography variant='h5' color='primary' width='100%' paddingX={ 1 } paddingY={ 3 }>Dirección</Typography>
        
        <SelectFormulario value={ pais } onChangeForm={ onChangeForm } currencies={ paises } required={ true } label='País' id='pais' name='pais' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ provincia } onChangeForm={ onChangeForm } currencies={ provincias } required={ true } label='Provincia' id='provincia' name='provincia' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ ciudad } onChangeForm={ onChangeForm } currencies={ ciudades } required={ true } label='Ciudad' id='ciudad' name='ciudad' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ codigoPostal } onChangeForm={ onChangeForm } setData={ setData } required={ true } label='Código Postal' id='codigoPostal' name='codigoPostal' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle } onChangeForm={ onChangeForm } setData={ setData } required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ altura } onChangeForm={ onChangeForm } setData={ setData } required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle1 } onChangeForm={ onChangeForm } required={ false } label='Calle 1' id='calle1' name='calle1' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <InputFormulario value={ calle2 } onChangeForm={ onChangeForm } required={ false } label='Calle 2' id='calle2' name='calle2' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <InputFormulario value={ piso } onChangeForm={ onChangeForm } required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ unidad } onChangeForm={ onChangeForm } required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ observaciones } onChangeForm={ onChangeForm } required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color='primary' xs={ 12 } md={ 6 } paddingBottom={ 4 } />
        
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
