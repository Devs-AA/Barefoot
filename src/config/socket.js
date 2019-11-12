import socketIo from 'socket.io';

export let io = null;


export const socket = (server) => {
  io = socketIo(server);
  return io;
};
