import Image from "next/image";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import TakePhoto from "../components/icons/images/take-photo.png";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";
import socket from "./WebSocketClient"; // Importe o cliente WebSocket
import { sendData,getData } from "../utils/api"
export default function QrCode() {

  const [scanResult, setScanResult] = useState(null);
  const [idFromWebSocket, setIdFromWebSocket] = useState(null);
 // const dispatch = useDispatch();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 'max-content',
        height: 'max-content',
      },
      fps: 5,
    });
    scanner.render(success);

    function success(result) {
    // scanner.clear();
      setScanResult(result);
      console.log('result é ' + result);

      const data = {
        qrCodeData: result,
      };
      const jsonStr = JSON.stringify(data);
      console.log(jsonStr);
      socket.emit("send", data);
    }
    socket.on("message", (data) => {
      console.log("Dados recebidos do servidor:", data);
      // Faça o que for necessário com os dados recebidos do servidor

     
//   if (data && data.text) {
//     console.log('Valor da propriedade "text":', data.text);
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVjYXMgVmluaWNpdXMiLCJpZCI6MiwiaWF0IjoxNjk5MzU4Mjc1LCJleHAiOjE2OTkzNjgyNzV9.CRksayOTCu0ltVr0kf_Z5tz4ACyLxDkFpGy4hPLeGiE'
// const parsedText = parseInt(data.text.qrCodeData, 10);
// console.log('Número: ' + parsedText);
// fetch(`http://10.107.144.05:3000/carts-by-user/${parsedText}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         // Aqui você pode lidar com a resposta do servidor, se necessário
//         console.log('Resposta do servidor: certo', responseData);
//         dispatch(addQRCodeData(responseData));
//         console.log(addQRCodeData(responseData))

//       })
//       .catch((error) => {
//         // Lidar com erros, se houver algum
//         console.error('Erro ao fazer a solicitação POST:', error);
//       });
    
//   } else {
//     console.log('A propriedade "text" não está presente em data');
//   }
    });
    // return () => {
    //   socket.disconnect(); // Desconectar o socket ao desmontar o componente
    // };
  }, []);

  return (
    <Layout>
      <div className="text-text">
        {scanResult
          ? <div>success <a href={"http://" + scanResult}>{scanResult}</a></div>
          : <div id="reader"></div>
        }
      </div>
    </Layout>
  )
};