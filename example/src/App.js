import React, {Component} from 'react'

import {
  Map,
  Marker,
  Overlay,
} from 'kakao-map-react'

const App = () => {
  const [pos, updatePos] = React.useState([127.02770621963765, 37.498004414546934]);
  const [map, updateMap] = React.useState();

  return (
    <React.Fragment>
      <button onClick={() => updatePos([128.02770621963765, 36.498004414546934])} style={{
        height: 100,
      }}>
        move
      </button>
      <div style={{
        height: '100vh'
      }}>
        <Map kakaoApiKey="9fc5e722edebd54d420181eb4b67567c"
             initialPosition={{
               longitude: 127.02770621963765,
               latitude: 37.498004414546934,
               level: 3,
             }}
             onBoundsChanged={(map) => {
               console.log(map);
             }}
             center={{
               longitude:pos[0],
               latitude:pos[1]
             }}>
          {/*<Marker longitude={pos[0]} latitude={pos[1]}/>*/}
          <Overlay longitude={pos[0]} latitude={pos[1]} content={`
          <div style="background-color: black; color: white; font-size: 24px;">
          test
</div>`}/>
        </Map>

      </div>
    </React.Fragment>
  )
};

export default App;
