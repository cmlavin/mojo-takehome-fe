import React from 'react';
import polygonWebSocketClient from './api/websocket'

const App = () => {

  polygonWebSocketClient()

  return (
    <div>
      Placeholder text
    </div>
  );
}

export default App;
