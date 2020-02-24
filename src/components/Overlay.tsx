import * as React from 'react';
import {useMapState} from "../context/MapContext";

interface IOverlayProps {
  longitude:number;
  latitude:number;
  content:string;
}

const Overlay: React.FC<IOverlayProps> = (props) => {
  const {kakao} = window;
  const {map} = useMapState();
  const [hasRendered, updateHasRendered] = React.useState(false);

  React.useEffect(()=>{
    if(!map || hasRendered){
      return;
    }

    const position = new kakao.maps.LatLng(props.latitude, props.longitude);
    const overlay = new kakao.maps.CustomOverlay({
      position,
      content:props.content,
    });

    overlay.setMap(map);
    updateHasRendered(true);

    return ()=>{
      overlay.setMap(null);
    }
  }, [
    map
  ]);

  return null;
};

export default Overlay;
