import {io} from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
//http://43.206.229.222
export const socket = io("43.206.229.222:3000");

//export const socket = io("localhost:3000");
