import { Socket } from "socket.io-client";
import { create } from "zustand";

interface State {
  socket: Socket | null;
  setSocket: any;
  chat: {};
  setChat: any;
  onlineUsers: [];
  setOnlineUsers: any;
  sendMessage: [];
  setSendMessage: any;
  receiveMessages: [];
  setReceiveMessages: any;
}

export const messageStore = create<State>((set:any) => ({
  socket: null,
  setSocket: (socket: Socket) => set(() => ({ socket })),
  chat: {},
  setChat: (chat: any) => set(() => ({ chat })),
  onlineUsers: [],
  setOnlineUsers: (users: any) => set(() => ({ onlineUsers: users })),
  sendMessage: [],
  setSendMessage: (msg: any) => set(() => ({ sendMessage: msg })),
  receiveMessages: [],
  setReceiveMessages: (msg: any) => set(() => ({ receiveMessages: msg })),
}));
