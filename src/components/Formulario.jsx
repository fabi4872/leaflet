import { useEffect, useState } from 'react';
import { useForm } from '../hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputFormulario } from './InputFormulario';
import { endpointGetDirectionByDataGeoref } from '../endpoints';
import { SelectFormulario } from './SelectFormulario';
import { Mapa } from './Mapa';

const mapWidthHeightMobile = '25rem';
const mapWidthHeightDesktop = '43rem';
const widthFormMobile = 400;
const widthFormDesktop = 700;

export const Formulario = ({ provincias, ciudades }) => {
  const [ isMobileView, setIsMobileView ] = useState(false);
  const [ dataDirection, setDataDirection ] = useState([]);
  const [ direction, setDirection ] = useState({});
  const [ coordinatesCity, setCoordinatesCity ] = useState([ciudades[0].lng, ciudades[0].lat]);
  const [ coordinatesDirection, setCoordinatesDirection ] = useState([]);
    
  const { provincia, ciudad, codigoPostal, calle, altura, entreCalles, piso, unidad, observaciones, onChangeForm, onChangeFormMultiple } = useForm({
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

  async function onSearchDirection() {
    //Se setea dataDirection como colección vacía
    setDataDirection([]);

    //Endpoint para obtener la dirección a partir de los campos del formulario
    const address = `${ calle.trim() } ${ altura.trim() }`;
    const data = await endpointGetDirectionByDataGeoref(address, provincia, ciudad);
            
    //Condicional para descartar que data sea null
    if (data !== null) {
      if (data.direcciones.length > 0) {
        const existingNomenclaturas = {};
        const newDirections = [];

        //Recorre las direcciones encontradas y agrega las distintas, dentro de la misma ciudad, corroborando datos correctos
        for (let i = 0; i < data.direcciones.length; i++) {
          const properties = data.direcciones[i];
          const nomenclatura = ( properties.nomenclatura !== undefined && properties.nomenclatura !== null) ? properties.nomenclatura : '';   
          const state = ( properties.provincia.nombre !== undefined && properties.provincia.nombre !== null) ? properties.provincia.nombre : ''; 
          const city = ( properties.localidad_censal.nombre !== undefined && properties.localidad_censal.nombre !== null) ? properties.localidad_censal.nombre : ''; 
          const street = ( properties.calle.nombre !== undefined && properties.calle.nombre !== null) ? properties.calle.nombre : '';
          const houseNumber = ( properties.altura.valor !== undefined && properties.altura.valor !== null) ? properties.altura.valor : '';
          const latitud = ( properties.ubicacion.lat !== undefined && properties.ubicacion.lat !== null) ? properties.ubicacion.lat : '';
          const longitud = ( properties.ubicacion.lon !== undefined && properties.ubicacion.lon !== null) ? properties.ubicacion.lon : '';

          //Si no existe la dirección, la agrega
          if (state == provincia && city == ciudad && street !== '' && houseNumber !== '' && latitud !== '' && longitud !== '' && !existingNomenclaturas[nomenclatura]) {
            const newDirection = {
              id: i,
              calle: street,
              altura: houseNumber,
              provincia: state,
              ciudad: city,
              nomenclatura: ( nomenclatura !== '' ) ? nomenclatura : `${ street } ${ houseNumber }, ${ city }, ${ state }`,
              lat: latitud,
              lon: longitud
            };
            newDirections.push(newDirection);
            existingNomenclaturas[nomenclatura] = true;
          }
        }

        //Actualiza el estado dataDirection
        setDataDirection([...dataDirection, ...newDirections]);
      }
    }
  }

  const onDirectionSelection = () => {
    if (Object.keys(direction).length !== 0) {      
      //Seteo de dirección actualizada
      onChangeFormMultiple({
        provincia: direction.state,
        ciudad: direction.city,
        codigoPostal: altura,
        calle: direction.street,
        altura: direction.houseNumber,
        entreCalles,
        piso,
        unidad,
        observaciones
      });

      setCoordinatesCity([direction.longitud, direction.latitud]);
      setCoordinatesDirection([direction.longitud, direction.latitud]);
    }
  }

  //Actualiza el componente, por cambio de coordenadas de la dirección
  useEffect(() => {
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
        
        <SelectFormulario value={ provincia } currencies={ provincias } required={ true } label='Provincia' id='provincia' name='provincia' autoComplete='off' color='primary' xs={ 12 } md={ 5 } />
        <SelectFormulario value={ ciudad } setCoordinatesCity={ setCoordinatesCity } setCoordinatesDirection={ setCoordinatesDirection } onChangeFormMultiple={ onChangeFormMultiple } provincia={ provincia } currencies={ ciudades } required={ true } label='Ciudad' id='ciudad' name='ciudad' autoComplete='off' color='primary' xs={ 12 } md={ 5 } />
        <InputFormulario value={ codigoPostal } onChangeForm={ onChangeForm } required={ true } label='CP' id='codigoPostal' name='codigoPostal' autoComplete='off' color='primary' xs={ 12 } md={ 2 } />
        <InputFormulario value={ calle } onChangeForm={ onChangeForm } required={ true } label='Calle' id='calle' name='calle' autoComplete='off' color='primary' xs={ 12 } md={ 8 } />
        <InputFormulario value={ altura } onChangeForm={ onChangeForm } required={ true } label='Altura' id='altura' name='altura' autoComplete='off' color='primary' xs={ 12 } md={ 4 } />
        
        {
          ( dataDirection.length === 0 )
          ?
          (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              width='100%'
            >
              <Button 
                variant='contained' 
                onClick={ onSearchDirection }
                sx={{
                  margin:'2rem 0 1rem 0'
                }}
              >
                Buscar dirección
              </Button>
            </Box>
          )
          :
          null
        }
        
        {
          ( dataDirection.length > 0 )
          ? 
          (
            <Box
              display='flex'
              flexDirection='column'
              flexWrap='wrap'
              justifyContent='center'
              alignItems='flex-start'
              width='100%'
            >
              {
                dataDirection.map((direccion) => (
                  <Typography key={ direccion.id } variant='body2' color='primary'>{ direccion.nomenclatura }</Typography>
                ))
              }
            </Box>
          )
          : 
          null
        }
        
        {
          ( Object.keys(direction).length !== 0 )
          ?
          (
            <>
              <InputFormulario value={ entreCalles } onChangeForm={ onChangeForm } required={ false } label='Entre calles' id='entreCalles' name='entreCalles' autoComplete='off' color='primary' xs={ 12 } md={ 12 } />
              <InputFormulario value={ piso } onChangeForm={ onChangeForm } required={ false } label='Piso' id='piso' name='piso' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
              <InputFormulario value={ unidad } onChangeForm={ onChangeForm } required={ false } label='Unidad' id='unidad' name='unidad' autoComplete='off' color='primary' xs={ 12 } md={ 3 } />
              <InputFormulario value={ observaciones } onChangeForm={ onChangeForm } required={ false } label='Observaciones' id='observaciones' name='observaciones' autoComplete='off' color='primary' xs={ 12 } md={ 6 } paddingBottom={ 4 } />
            
              <Mapa 
                coordinatesCity={ coordinatesCity } 
                coordinatesDirection={ coordinatesDirection } 
                setCoordinatesCity={ setCoordinatesCity } 
                setCoordinatesDirection={ setCoordinatesDirection } 
                mapWidthHeight={ ( isMobileView ) ? mapWidthHeightMobile : mapWidthHeightDesktop } 
              />
            </>
          )
          :
          null
        }
        
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
