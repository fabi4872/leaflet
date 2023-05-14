import { useEffect, useState } from 'react';
import { useForm } from '../hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { endpointGetDirectionByData, endpointGetDirectionByCoordinates } from '../endpoints';
import { SelectFormulario } from './SelectFormulario';
import { Mapa } from './Mapa';

const mapWidthHeightMobile = '25rem';
const mapWidthHeightDesktop = '43rem';
const widthFormMobile = 400;
const widthFormDesktop = 700;

export const Formulario = ({ paises, provincias, ciudades }) => {
  const [ isMobileView, setIsMobileView ] = useState(false);
  const [ isHouseNumberEmptyFromEndpoint, setIsHouseNumberEmptyFromEndpoint ] = useState(false);
  const [ coordinatesCity, setCoordinatesCity ] = useState([ciudades[0].lng, ciudades[0].lat]);
  const [ coordinatesDirection, setCoordinatesDirection ] = useState([]);
    
  const { pais, provincia, ciudad, codigoPostal, calle, altura, entreCalles, piso, unidad, observaciones, onChangeForm, onChangeFormMultiple } = useForm({
    pais: paises[0].value,
    provincia: provincias[0].value,
    ciudad: ciudades[0].value,
    codigoPostal: '',
    calle: '',
    altura: '',
    entreCalles: '',
    piso: '',
    unidad: '',
    observaciones: ''
  });

  async function onChangeHouseNumber() {
    //Condicional para accionar búsqueda, sólo si la altura fue vacía la primera vez
    if (!isHouseNumberEmptyFromEndpoint) {
      //Endpoint para obtener la dirección a partir de los campos del formulario
      const address = `${ calle.trim() } ${ altura.trim() },${ ciudad.trim() },${ codigoPostal.trim() },${ provincia.trim() },${ pais.trim() }`;
      const data = await endpointGetDirectionByData(address);
        
      //Condicional para descartar que data sea null
      if (data !== null) {
        //Find para encontrar la dirección definitiva
        const result = data.features.find(({ properties }) => {
          return properties && 
          'postcode' in properties && properties.postcode == codigoPostal.trim() &&
          'street' in properties && properties.street == calle.trim() &&
          'housenumber' in properties && properties.housenumber == altura.trim()
        });

        //Actualización de nuevas coordenadas, a partir de la dirección definitiva
        if (result !== undefined) {
          const { geometry } = result;
          setCoordinatesCity(geometry.coordinates);
          setCoordinatesDirection(geometry.coordinates); 
        }
      }
    }
  }

  async function onChangeCoordinates() {
    if (coordinatesDirection.length !== 0) {  
      //Endpoint para obtener la dirección a partir de las coordenadas
      const dataDirectionWithCoordinates = await endpointGetDirectionByCoordinates(coordinatesDirection[1], coordinatesDirection[0]);
      
      if (dataDirectionWithCoordinates !== null) {  
        //Recuperación de propiedades de la dirección
        const { properties } = dataDirectionWithCoordinates.features[0];

        //Cambio de estado para indicar si la altura fue vacía o no, luego del endpoint
        ( properties.housenumber === undefined ) ? setIsHouseNumberEmptyFromEndpoint(true) : setIsHouseNumberEmptyFromEndpoint(false);
        
        //Seteo de dirección actualizada
        onChangeFormMultiple({
          pais: properties.country,
          provincia: properties.state,
          ciudad,
          codigoPostal: ( properties.postcode !== undefined ) ? properties.postcode : '',
          calle: ( properties.street !== undefined ) ? properties.street : '',
          altura: ( properties.housenumber !== undefined ) ? properties.housenumber : '',
          entreCalles,
          piso,
          unidad,
          observaciones
        });
      }
    }
  }

  //Actualiza el componente, por cambio de altura
  useEffect(() => {  
    onChangeHouseNumber();
    return () => {
    
    }
  }, [ altura ]);

  //Actualiza el componente, por cambio de coordenadas de la dirección
  useEffect(() => {
    onChangeCoordinates();
    return () => {
        
    }
  }, [ coordinatesDirection ]);

  //Monta el componente, detectando el ancho de pantalla adecuado para el dispositivo
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Grid
        container
        direction='row'
        padding={ 2 }
        width={ ( isMobileView ) ? widthFormMobile : widthFormDesktop }
        paddingTop={ 1 }
        boxShadow='0 0.5rem 0.5rem 0 #CCCCCC'
        borderTop='0.3rem solid #1976D2'
        sx={{
          marginY: '2rem'
        }}
      >
        <Typography variant='h5' color='primary' width='100%' paddingX={ 1 } paddingY={ 3 }>Dirección</Typography>
        
        <SelectFormulario value={ pais } currencies={ paises } required={ true } label='País' id='pais' name='pais' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ provincia } currencies={ provincias } required={ true } label='Provincia' id='provincia' name='provincia' autoComplete='off' color='primary' xs={ 12 } md={ 6 } />
        <SelectFormulario value={ ciudad } setCoordinatesCity={ setCoordinatesCity } setCoordinatesDirection={ setCoordinatesDirection } onChangeFormMultiple={ onChangeFormMultiple } pais={ pais } provincia={ provincia } currencies={ ciudades } required={ true } label='Ciudad' id='ciudad' name='ciudad' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ codigoPostal } onChangeForm={ onChangeForm } required={ true } label='Código Postal' id='codigoPostal' name='codigoPostal' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ calle } onChangeForm={ onChangeForm } required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ altura } onChangeForm={ onChangeForm } required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        <InputFormulario value={ entreCalles } onChangeForm={ onChangeForm } required={ false } label='Entre calles' id='entreCalles' name='entreCalles' autoComplete='off' color='primary' xs={ 12 } md={ 12 } />
        <InputFormulario value={ piso } onChangeForm={ onChangeForm } required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ unidad } onChangeForm={ onChangeForm } required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
        <InputFormulario value={ observaciones } onChangeForm={ onChangeForm } required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color='primary' xs={ 12 } md={ 6 } paddingBottom={ 4 } />
        
        <Mapa 
          coordinatesCity={ coordinatesCity } 
          coordinatesDirection={ coordinatesDirection } 
          setCoordinatesCity={ setCoordinatesCity } 
          setCoordinatesDirection={ setCoordinatesDirection } 
          mapWidthHeight={ ( isMobileView ) ? mapWidthHeightMobile : mapWidthHeightDesktop } />
        
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
