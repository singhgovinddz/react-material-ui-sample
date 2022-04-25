import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureDataSourceChildren,
  IAzureMapFeature,
  IAzureMapLayerType,
  IAzureMapOptions,
  AzureMapPopup
} from 'react-azure-maps';
import { AuthenticationType, data, SymbolLayerOptions,MapMouseEvent,PopupOptions } from 'azure-maps-control';

const memoizedOptions: SymbolLayerOptions = {
  textOptions: {
    textField: ['get', 'title'], //Specify the property name that contains the text you want to appear with the symbol.
    offset: [0, 1.2],
  },
};

const colorValue = () =>
'#000000'.replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16);
});
const markersStandardImages = [
  `marker-black`,
  `marker-blue`,
  `marker-darkblue`,
  `marker-red`,
  `marker-yellow`,
  `pin-blue`,
  `pin-darkblue`,
  `pin-red`,
  `pin-round-blue`,
  `pin-round-darkblue`,
  `pin-round-red`,
];

const rand = () => markersStandardImages[Math.floor(Math.random() * markersStandardImages.length)];
const Markers: React.FC = ({center=[],MapAddress=''}:any) => {
  const [markers, setMarkers] = useState([center]);
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({});
  const [markersLayer] = useState<IAzureMapLayerType>('SymbolLayer');
  const [layerOptions, setLayerOptions] = useState<SymbolLayerOptions>(memoizedOptions);
  const renderPoint = (coordinates: data.Position): IAzureMapFeature => {
    const rendId = Math.random();
    return (
      <AzureMapFeature
      key={rendId}
      id={rendId.toString()}
      type="Point"
      coordinate={coordinates}
      />
      );
    };
    useEffect(()=>{
      setMarkers((prev) => {
        return [center]
      })
    },[center])
    
    
    const option:IAzureMapOptions = useMemo(() => {
      return {
        authOptions: {
          authType: AuthenticationType.subscriptionKey,
          subscriptionKey: process.env.REACT_APP_MAPS_SUBSCRIPTION // Your subscription key,
        },
        center:center,
        zoom: 15,
        // view: 'Auto',
      };
    }, [center]);
    const memoizedMarkerRender: IAzureDataSourceChildren[] = useMemo(
      (): any => markers.map((marker) => renderPoint(marker)),
      [markers],
      );
      return (
        <>
      <div style={styles.buttonContainer}>
      </div>
      <AzureMapsProvider>
        <div style={styles.map}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id={'markersExample AzureMapDataSourceProvider'} options={{ cluster: true, clusterRadius: 2 }}>
              <AzureMapLayerProvider id={'markersExample AzureMapLayerProvider'} options={layerOptions} 
              events={{
                click: (e: MapMouseEvent) => {
                  if (e.shapes && e.shapes.length > 0) {
                    const prop: any = e.shapes[0];
                    // Set popup options
                    setPopupOptions({
                      ...popupOptions,
                      position: new data.Position(
                        prop.data.geometry.coordinates[0],
                        prop.data.geometry.coordinates[1],
                      ),
                      pixelOffset: [0, -18],
                    });
                    // if (prop.data.properties)
                      // Set popup properties from Feature Properties that are declared on create Feature
                      
                  }
                },
              }}
              type={markersLayer}/>
              {center?memoizedMarkerRender:null}
            </AzureMapDataSourceProvider>
            <AzureMapPopup
              isVisible={true}
              options={popupOptions}
              popupContent={
                <div style={styles.popupStyles}>{MapAddress}</div> // Inject your JSX
              }
            />
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </>
  );
};

const styles = {
  map: {
    height: 300,
  },
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
    alignItems: 'center',
  },
  button: {
    height: 35,
    width: 80,
    backgroundColor: '#68aba3',
    'text-align': 'center',
  },
  popupStyles: {
    padding: '10px ',
    color: 'black',
  },
};

export default memo(Markers);