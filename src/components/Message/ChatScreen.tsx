import { Box } from '@mui/material';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMessages, sendMessageToReceiver } from '../../api/User/Get/user';
import { currentCompanyAdmin } from '../../redux/company-admin/CompanyAdminAuthSlicer';
import { currentUser } from '../../redux/user/userAuthSlicer';

export function ChatScreen({ chat, setSentMessage, receiveMessages }: any) {
    const scroll = useRef<any>();
    const [sendMessage, setSendMessage] = useState("")
    const [ID, setID] = useState('')
    const { userId } = useSelector(currentUser)
    const { companyAdminId } = useSelector(currentCompanyAdmin)
    const [messages, setMessages] = useState<any>([])
    const [emojiPicker, setEmojiPicker] = React.useState(false);
    useEffect(() => {
        if (userId) {
            setID(userId)
        }
        if (companyAdminId) {
            setID(companyAdminId)
        }
    }, [])
    useEffect(() => {
        if (receiveMessages !== null && receiveMessages.chatId === chat?._id) {
            setMessages([...messages, receiveMessages]);
        }
    }, [receiveMessages]);
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const data = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessage();
    }, [chat, ID]);
    useEffect(() => {
        scroll.current!.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    function handleEnterKey(e: any) {
        if (e.keyCode == 13) {
            sendMessages();
            setEmojiPicker(false)
        }
    }
    async function sendMessages() {
        if (sendMessage.trim().length == 0) return setSendMessage("");
        const messageAdd = {
            ID,
            chatId: chat._id,
            text: sendMessage,
        };
        setSendMessage("")
        const data = await sendMessageToReceiver(ID, chat._id, sendMessage);
        setMessages([...messages, data])
        const receiverId = chat.members.find((id: string) => id !== ID);
        setSentMessage({ ...messageAdd, receiverId });
    }
    return (
        <div className="flex flex-col flex-auto h-full md:p-6">
            <div className=" relative flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 md:mt-4 min-h-[82vh]  max-h-[82vh] " >
                <div className="" >
                    <div className="flex flex-col max-h-[82vh] " >
                        <div className="grid grid-cols-12 gap-y-2  mb-14 overflow-y-scroll" >
                            {
                                messages.map(function (message: any) {
                                    return (
                                        <>
                                            {message.senderId == ID ? (
                                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                    <div className="flex items-center justify-start flex-row-reverse">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        </div>
                                                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                            <div className='max-w-[200px] lg:max-w-md'>
                                                                <p className="break-words">{message.text}</p>
                                                            </div>
                                                            <div className="text-xs flex justify-end">
                                                                <p className='text-xs text-gray-600'>{moment(message.createdAt).format("DD MMM YYYY")}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                    <div className="flex flex-row items-center">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 flex-shrink-0">
                                                        </div>
                                                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                            <div className='max-w-[200px] lg:max-w-md'>
                                                                <p className=" break-words">{message.text}</p>
                                                            </div>
                                                            <div className="text-xs flex justify-end">
                                                                <p className='text-xs text-gray-600'>{moment(message.createdAt).format("DD MMM YYYY")}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                                })
                            }
                            <div ref={scroll}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row absolute items-center h-16 rounded-xl bg-white w-full px-4 bottom-0 border shadow-lg">
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                onKeyDown={handleEnterKey}
                                onChange={(e) => {
                                    setEmojiPicker(false)
                                    setSendMessage(e.target.value)
                                }}
                                value={sendMessage}
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            <button onClick={() => setEmojiPicker(true)} className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="ml-4">
                        <button onClick={() => {
                            sendMessages()
                            setEmojiPicker(false)
                        }}
                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                            <span>Send</span>
                            <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Box
                className={
                    emojiPicker ? "absolute z-50 block justify-center" : "hidden"
                }
            >
                <Picker
                    data={data}
                    previewPosition="none"
                    onEmojiSelect={(e: any) => {
                        setSendMessage(sendMessage + e.native)
                    }}
                />
            </Box>
        </div>
    )
}