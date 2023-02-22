import React, { useEffect, useState } from 'react'
import { getUserChat } from '../../api/User/Get/user';
import { AllChats } from './AllChats';

interface OnlineUsers {
    userId: string
    socketId: string
}
interface Props {
    setChat: any
    onlineUsers: Array<OnlineUsers>
    id: string
    type: string
}

export function Friends({ setChat, onlineUsers, id, type }: Props) {
    const [data, setData] = useState([])
    const fetcher = async () => {
        const friends = await getUserChat(id, 'user');
        setData(friends)
    };
    useEffect(() => {
        fetcher();
    }, [])
    return (
        <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
                <span className="hidden sm:block font-bold">Active Conversations</span>
                <span className="block sm:hidden font-bold">Friends</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {data.length}
                </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 max-h-48 overflow-y-scroll">
                {
                    data.map(function (chat: any) {
                        return (
                            <AllChats setChat={setChat} key={chat._id} data={chat} currentUser={id} onlineUsers={onlineUsers} type={type} />
                        )
                    })
                }
            </div>
        </div>
    )
}