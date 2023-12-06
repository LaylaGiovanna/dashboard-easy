import io from "socket.io-client";
//const socket = io("http://10.107.144.05:9000", {
const socket = io("http://localhost:9000", {
//const socket = io("http://socket-easy4u.azurewebsites.net", {

  transports: ["websocket", "polling"]
});

export default socket;
