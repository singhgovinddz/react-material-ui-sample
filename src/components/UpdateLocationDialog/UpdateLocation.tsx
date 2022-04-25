import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from "@mui/icons-material/Close";
import { CommonService } from '../../services';
import { Typography } from '@mui/material';
import Item from "@mui/material/Grid";
import { Button, Autocomplete, TextField, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from 'axios';

interface UpdateLocationProps {
  show?: any;
  onClose?: any;
  onChange?: any;
  loading?:any;
  handleChangeLocation?:any;
  lat?: any;
  lon?: any;
  newAddress?:any;
  
}
let source: any;
let selected: any;

const UpdateLocationDialog: React.FC<UpdateLocationProps> = ({ show, onClose, loading, onChange, lat, lon ,
  newAddress}) => {
  const [latLong, setLatLong] = useState([0, 0])
  const [currentLocation,setCurrentLocation]=useState('')
  const [locationList, setLocationList] = React.useState([]);
  const [loader, setloader] = React.useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const [address, setAddress] = useState({lat: null, lon: null});
  const [isError, setIsError] = useState(false);

  React.useEffect(() => {
    selected = false
    setIsError(false)
  }, [show])

  React.useEffect(() => {
      if(lat!==null && lon !==null){
        CommonService.getLocationsResult(`${lat},${lon}`, 'coords')
        .then((res) => {
          setCurrentLocation(res?.address?.freeformAddress)
        }).catch(err=>{
          console.error(err)
        })
      }
  }, [lat,lon])

  const loadCurrentLocation = () =>{
    setloader(true)
    navigator.geolocation.getCurrentPosition((l) => {
     const coordinate={latitude:l.coords.latitude,longitude:l.coords.longitude}
     localStorage.setItem('coordinates', JSON.stringify(coordinate));
      onChange({lat: coordinate.latitude, lon: coordinate.longitude})
    // setAddress({lat: coordinate.latitude, lon: coordinate.longitude});
     setloader(false)
     
  });
  }

  const _onClose=()=>{
    onClose()
    selected = true
    setIsError(false)
  }

  const onAddressChange = async (e: any) => {
    if (e.type && e.type === "click") {
      // setAddress()
      return
    } else {
      const value = e.target.value;
      if (value) {
        selected=false
        setIsError(true)
        setloader(true)
         if(typeof source != typeof undefined) {
           source.cancel('operation cancelled due to new request');
         }
        source = axios.CancelToken.source();
        const locations = await CommonService.getLocationsResult(value, 'address', source);
        setLocationList(locations);
        setloader(false)
      } else {
        setloader(false)
      }
    }
  };

  const __onChange=(e:any)=>{
    onChange(e)
    selected=false
  }

  return (
    <div>
      <Dialog open={show} onClose={() => onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title" onClick={_onClose}>
          <span style={{ display: 'flex' }}><CloseIcon sx={{ cursor: "pointer" }} /><Typography sx={{ color: 'black', fontWeight: 'bold', pl: 3 }}> Current Location</Typography></span>
        </DialogTitle>
        <DialogContent sx={{ mb: 2 }}>
          <DialogContentText id="alert-dialog-description">
            <Item sx={{ display: 'flex', color: '#333333', fontFamily: 'Arial', pb: 3, pt: 2 }}>
              <Item>Currently using:</Item>
              <Item sx={{ display: 'flex', flexDirection: 'column', ml:1 }}>
                <Item style={{ fontWeight: 'bold' }}>Device Location</Item>
                <Item>{currentLocation || ''}</Item></Item>
            </Item>
            <Button              
              className={'location_button'}
              style={{
                borderRadius: "50px",
                background: '#333',
                marginTop: '10px',
                width: '100%',                
              }}
              variant="contained"
              onClick={() => loadCurrentLocation()}
            >
              {loading ? <CircularProgress size={20} /> : <>
                <LocationOnIcon style={{ color: '#73bf39' }} className={'location_icon'} />
                <Typography sx={{ color: 'white', fontSize:'medium', textTransform: 'none' }}>{t("home.buttons.location")}</Typography></>}
            </Button>
            <Typography sx={{ mt: 3, mb: 3, textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)' }}>or</Typography>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.87)', textAlign: 'center', mb: 2 }}>Enter Zipcode or Address</Typography>
            <Autocomplete
              className={'enter_zip_code'}
              id="free-solo-demo"
              freeSolo
                filterOptions ={(x) => {
                  return x;
                }}
              onInputChange={(e) => onAddressChange(e)}
              style={{
                borderRadius: 6, fontSize: '10px !important', backgroundColor: 'white',
              }}
              value={newAddress}
              onChange={(event, newValue) => {
                if (newValue) {
                  selected=true
                  setIsError(false)
                  setAddress(newValue?.position)
                } else if (newValue === null) {
                    selected=false
                    setAddress({lat: null, lon: null});
                    setLocationList([])
                    setIsError(true)
                }
              }}
              options={locationList}
              getOptionLabel={(option) => option.address.freeformAddress}
              renderInput={(params) => {
                return <TextField  className={'zip_code'} placeholder={t('home.inputs.address')} 
                sx={{ 
                  '& input': { textAlign:'center'},
                  fontSize: '10px !important',
                  mb:1
                }}  
                {...params}
                size="small" 
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loader ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />;
              }}
            />
            {!selected && isError ? <Typography sx={{ mt: 1, color: "#c00", fontWeight: "bold", fontSize: '11px' }}>
                                Select valid address
                            </Typography> : null}
            <Button style={{ borderRadius: "50px", background: '#333', marginTop: '10px', width: '100%' }}
              variant="contained" onClick={()=>{__onChange(address)}} disabled={!selected}>
              Save
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateLocationDialog;