import * as React from 'react';
import {MapProvider, useMapState, useMapDispatch} from "context/MapContext";

interface IMapEvent {
  target: any;
  type: string;
  handler: any;
}

interface IMapProps {
  id: string;
  initialPosition: {
    latitude: number;
    longitude: number;
    level: number;
  };
  center:{
    latitude?: number;
    longitude?: number;
    token?: number;
  }
  level?: number;
  onMapLoaded?: {
    (map: any): void;
  };
  onCenterChanged?: {
    (map: any): void;
  };
  onZoomStart?: {
    (map: any): void;
  };
  onZoomChanged?: {
    (map: any): void;
  };
  onBoundsChanged?: {
    (map: any): void;
  },
  onClick?: {
    (map: any, mouseEvent: any): void;
  },
  onDbClick?: {
    (map: any, mouseEvent: any): void;
  },
  onRightClick?: {
    (map: any, mouseEvent: any): void;
  },
  onMouseMove?: {
    (map: any, mouseEvent: any): void;
  },
  onDragStart?: {
    (map: any): void;
  },
  onDrag?: {
    (map: any): void;
  },
  onDragEnd?: {
    (map: any): void;
  },
  onIdle?: {
    (map: any): void;
  },
  onTilesLoaded?: {
    (map: any): void;
  },
  onMapTypeIdChanged?: {
    (map: any): void;
  }
}

const eventsArr = [
  {
    key: 'onCenterChanged',
    event: 'center_changed',
    hasMouseEvent: false,
  },
  {
    key: 'onZoomStart',
    event: 'zoom_start',
    hasMouseEvent: false,
  },
  {
    key: 'onZoomChanged',
    event: 'zoom_changed',
    hasMouseEvent: false,
  },
  {
    key: 'onBoundsChanged',
    event: 'bounds_changed',
    hasMouseEvent: false,
  },
  {
    key: 'onClick',
    event: 'click',
    hasMouseEvent: true,
  },
  {
    key: 'onDbClick',
    event: 'dbclick',
    hasMouseEvent: true,
  },
  {
    key: 'onRightClick',
    event: 'rightclick',
    hasMouseEvent: true,
  },
  {
    key: 'onMouseMove',
    event: 'mousemove',
    hasMouseEvent: true,
  },
  {
    key: 'onDragStart',
    event: 'dragstart',
    hasMouseEvent: false,
  },
  {
    key: 'onDrag',
    event: 'drag',
    hasMouseEvent: false,
  },
  {
    key: 'onDragEnd',
    event: 'dragend',
    hasMouseEvent: false,
  },
  {
    key: 'onIdle',
    event: 'idle',
    hasMouseEvent: false,
  },
  {
    key: 'onTilesLoaded',
    event: 'tilesloaded',
    hasMouseEvent: false,
  },
  {
    key: 'onMapTypeIdChanged',
    event: 'maptypeid_changed',
    hasMouseEvent: false,
  }
];

const Map: React.FC<IMapProps> = (props) => {
  const {id} = props;
  const {kakao} = window;
  const mapId = id ? id : 'kakao-map-react';
  const {map} = useMapState();
  const dispatch = useMapDispatch();

  React.useEffect(() => {
    if (!map) {
      const events: IMapEvent[] = [];

      const mapContainer = document.getElementById(mapId);
      const mapOptions = {
        center: new kakao.maps.LatLng(props.initialPosition.latitude, props.initialPosition.longitude),
        level: props.level,
      };

      const newMap = new kakao.maps.Map(mapContainer, mapOptions);

      if (props.onMapLoaded) {
        props.onMapLoaded(newMap);
      }

      for (let event of eventsArr) {
        if (props[event.key]) {
          kakao.maps.event.addListener(newMap, event.event, (mouseEvent: any) => {
            if (props[event.key]) {
              if (event.hasMouseEvent) {
                const handler = props[event.key](newMap, mouseEvent);

                events.push({
                  target: newMap,
                  type: event.event,
                  handler,
                })
              } else {
                const handler = props[event.key](newMap);

                events.push({
                  target: newMap,
                  type: event.event,
                  handler,
                })
              }
            }
          })
        }
      }

      dispatch({
        type: 'SET_MAP',
        payload: newMap,
      });

      return () => {
        for (let event of events) {
          kakao.maps.event.removeListener(event.target, event.type, event.handler);
        }
      }
    } else {
      return () => {
      };
    }
  }, []);

  /*
  * Set new center if long lat changes
  * */
  React.useEffect(() => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(props.center.latitude, props.center.longitude));
    }
  }, [
    props.center.latitude,
    props.center.longitude,
    props.center.token,
  ]);

  /*
  * Set new level if props.level changes
  * */
  React.useEffect(() => {
    if (map) {
      map.setLevel(props.level);
    }
  }, [
    props.level
  ]);

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
