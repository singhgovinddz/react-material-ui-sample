import React from 'react'
import { AzureMapsProvider,
  AzureMap,
  IAzureMapOptions
  } from 'react-azure-maps';
import {AuthenticationType} from 'azure-maps-control'
import RoomIcon from '@mui/icons-material/Room';
import { CommonService } from '../../services';

const DefaultMap: React.FC = ({center = [], onChange = () => {}, height}: any) =>  {
  
  const [position, setPosition] = React.useState(center);
  const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: process.env.REACT_APP_MAPS_SUBSCRIPTION // Your subscription key
    },
    center: center,
    zoom: 15
}

React.useEffect(() => {
  if(!center.length) {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      console.log(coords);
      setPosition([coords.longitude, coords.latitude]);
      CommonService.getLocationsResult(`${coords.latitude},${coords.longitude}`, 'coords')
        .then((res) => {
          console.log(res);
          onChange(res);
        }).catch(err=>{
          console.error(err)
        })
    });
  }
  
}, [])

  const onDrag = (e: any) => {
    const _center = e.map.getCamera().center
    CommonService.getLocationsResult(`${_center[1]},${_center[0]}`, 'coords')
      .then((res) => {
        console.log(res);
        onChange(res);
      }).catch(err=>{
        console.error(err)
      })
    console.log(_center);
  }

  const styles = {
    map: {
      height: height
    },
  };

  return <AzureMapsProvider>
          <div style={{...styles.map, position: 'relative'}}>
            <div style={{position: 'absolute', top:'50%', transform:'translate(-50%,-50%)', left: '50%', zIndex: 1}}>
              <RoomIcon color="primary" sx={{ fontSize: 40 }}/>
            </div>
            {center.length ? <AzureMap options={option} events={{ dragend: onDrag }}> 
            </AzureMap> : null }
          </div>
        </AzureMapsProvider>
};



export default DefaultMap