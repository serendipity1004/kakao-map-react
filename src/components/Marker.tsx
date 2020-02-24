import * as React from 'react';
import {useMapState} from "context/MapContext";

interface IMarkerProps {
  longitude: number;
  latitude: number;
}

const allEvents = [
  {
    key: 'onClick',
    event: 'click',
  },
  {
    key: 'onMouseOver',
    event: 'mouseover',
  },
  {
    key: 'onMouseOut',
    event: 'mouseout',
  },
  {
    key: 'onRightClick',
    event: 'rightclick',
  },
  {
    key: 'onDragStart',
    event: 'dragstart',
  },
  {
    key: 'onDragEnd',
    event: 'dragend',
  }
];

interface IMarkerEvent {
  target: any;
  type: string;
  handler:any;
}

const Marker: React.FC<IMarkerProps> = (props) => {
  const {map} = useMapState();
  const [isDrawn, updateIsDrawn] = React.useState(false);
  const {kakao} = window;

  React.useEffect(() => {
    const position = new kakao.maps.LatLng(props.latitude, props.longitude);

    const marker = new kakao.maps.Marker({
      map,
      position,
    });

    const events : IMarkerEvent[] = [];

    if (map && !isDrawn) {
      updateIsDrawn(true);

      marker.setMap(map);

      for (let event of allEvents) {
        if (props[event.key]) {
          kakao.maps.event.addListener(marker, event.event, () => {
            if (props[event.key]) {
              const handler = props[event.key](map);

              events.push({
                target: map,
                type: event.event,
                handler,
              })
            }
          })
        }
      }

      return () => {
        marker.setMap(null);

        for (let event of events) {
          kakao.maps.event.removeListener(event.target, event.type, event.handler);
        }
      }
    }

    return () => {
    }

  }, [
    map
  ]);

  return null;
};

export default Marker;
