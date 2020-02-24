import * as React from 'react';
import {MapProvider, useMapState, useMapDispatch} from "context/MapContext";

interface IMapProps {
  id: string;
  kakaoApiKey: string;
  initialPosition:{
    latitude:number;
    longitude:number;
    level:number;
  }
  latitude:number;
  longitude:number;
  level:number;
}

const Map: React.FC<IMapProps> = (props) => {
  const {id} = props;
  const {kakao} = window;
  const mapId = id ? id : 'kakao-map-react';
  const {map} = useMapState();
  const dispatch = useMapDispatch();

  React.useEffect(()=>{
    if(!map){
      const mapContainer = document.getElementById(mapId);
      const mapOptions = {
        center: new kakao.maps.LatLng(props.initialPosition.latitude, props.initialPosition.longitude),
        level: props.level,
      };

      const newMap = new kakao.maps.Map(mapContainer, mapOptions);

      dispatch({
        type:'SET_MAP',
        payload:newMap,
      })
    }
  },[]);

  return (
      <div id={mapId} style={{
        height: '100%'
      }}>
        {props.children}
      </div>
  )
};

const Container: React.FC<IMapProps> = (props) => {
  return (
    <MapProvider>
      <Map {...props}/>
    </MapProvider>
  )
};

export default Container;
