import React, {Component} from 'react'

import {Map} from 'kakao-map-react'

export default class App extends Component {
  render() {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Map kakaoApiKey="9fc5e722edebd54d420181eb4b67567c"
             initialPosition={{
               longitude:"127.02770621963765",
               latitude:"37.498004414546934",
               level:3,
             }}/>
      </div>
    )
  }
}
