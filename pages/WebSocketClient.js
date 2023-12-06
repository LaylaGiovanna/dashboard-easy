// pages/WebSocketClient.js

import React, { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketClient = () => {
  useEffect(() => {
    const socket = io('http://localhost:9000', {
      transports: ['websocket', 'polling'],
    });

    // Adicione lógica para manipular eventos do socket, se necessário

    return () => {
      // Lógica para limpar recursos quando o componente é desmontado
      socket.disconnect();
    };
  }, []);

  return <div>WebSocketClient Page</div>;
};

export default WebSocketClient;
