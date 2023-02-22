import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { findChat } from "../../api/chat/get";
import { COMPANY_ADMIN_SIDEBAR_LINKS } from "../../constants/Company-admin-sidebar";
import { USER_SIDEBAR_LINKS } from "../../constants/User-sideBar";
import { messageStore } from "../../zustand";
import { SideBarWithoutText } from "../Common";
import { ChatScreen } from "./ChatScreen";
import { LargeScreenSideBar } from "./LargeScreenSideBar";

export function UserMessage({type}:{type:string}) {
  const socket = messageStore((state:any) => state.socket);
  const chat = messageStore((state:any) => state.chat);
  const setChat = messageStore((state:any) => state.setChat); 
  const onlineUsers = messageStore((state:any) => state.onlineUsers);
  const sendMessage = messageStore((state:any) => state.sendMessage);
  const setSendMessage = messageStore((state:any) => state.setSendMessage);
  const receiveMessages = messageStore((state:any) => state.receiveMessages);
  const setReceiveMessages = messageStore((state:any) => state.setReceiveMessages);
  const location = useLocation()
  
  async function getChat() {
    if(location.state){
      const { senderId, receiverId } = location.state
      if(senderId && receiverId){
        const result = await findChat(senderId.toString(), receiverId.toString())
        setChat(result[0])
      }
    }
  }
  useEffect(()=>{
    getChat()
  },[])
  useEffect(() => {
    if (sendMessage !== null && socket) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage, socket]);

  useEffect(() => {
    if(socket){
      socket.on("receive-message", (data:any) => {
        setReceiveMessages(data);
      });
    }
  }, [socket]);

  return (
    socket && 
    <div className="pt-20  mb-14 fixed w-full">
      <div className="flex  antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="md:mr-14 sm:ml-2 sm:mr-20">
            <SideBarWithoutText links={type == 'user' ? USER_SIDEBAR_LINKS : COMPANY_ADMIN_SIDEBAR_LINKS} href={'/user/inbox'} />
          </div>
          <LargeScreenSideBar setChat={setChat} onlineUsers={onlineUsers} />
          {chat ? (
            <ChatScreen chat={chat} setSentMessage={setSendMessage}
              receiveMessages={receiveMessages} />
          ) :
            (
              <div className="w-full min-h-[100vh] p-8">
                <div className='flex w-full items-center justify-center h-[84vh] rounded-lg from-purple-500 via-indigo-500 to-pink-400 bg-gradient-to-br'>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
