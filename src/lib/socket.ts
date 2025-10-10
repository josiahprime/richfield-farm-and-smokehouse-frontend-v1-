// src/socket.js
import { io } from 'socket.io-client';


const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  withCredentials: true, // if you're using cookies/sessions
  autoConnect: false,
});

export default socket;
