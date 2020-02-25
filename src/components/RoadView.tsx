import * as React from 'react';

interface IRoadViewProps{
  id:number;
  longitude:number;
  latitude:number;
  [key:string]:any;
}

const RoadView : React.FC<IRoadViewProps> = (props)=>{
    const {id, longitude, latitude, ...rest} = props;
    const trueId = id ? id : 'road-view-container';
    const {kakao} = window;

    React.useEffect(()=>{
      const container = document.getElementById(trueId.toString());
      const roadView = new kakao.maps.Roadview(container);
      const client = new kakao.maps.RoadviewClient();

      const position = new kakao.maps.LatLng(latitude, longitude);

      client.getNearestPanoId(position, 50, (panoId:any)=>{
        roadView.setPanoId(panoId, position);
      })
    });

    return (
        <div id={trueId.toString()} {...rest}/>
    )
};

export default RoadView;
