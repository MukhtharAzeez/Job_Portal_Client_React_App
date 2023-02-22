import React, { useEffect, useState } from 'react'
import { getCompanyAdminDetails } from '../../api/Company-Admin/get';
import { getCurrentUserDetails } from '../../api/User/Get/user';

interface Data {
    _id: string
    members: Array<string>
    type: string
    createdAt: Date
    updatedAt: Date
}
interface OnlineUsers {
    userId: string
    socketId: string
}
interface Props {
    data: Data
    currentUser: string
    setChat: any
    onlineUsers: Array<OnlineUsers>
    type: string
}

export function AllChats({ data, currentUser, setChat, onlineUsers, type }: Props) {
    const [idToFetch] = useState(data.members.find((id: string) => id != currentUser))
    const [userData, setUserData] = useState<any>([])
    const [companyAdminData, setCompanyAdminData] = useState<any>([])
    useEffect(() => {
        if (data.type == 'user' && type == 'user') {
            const getUserData = async () => {
                const data = await getCurrentUserDetails(idToFetch!);
                setUserData(data);
                setCompanyAdminData(null);
            };
            getUserData();
        }
        if (data.type == 'user' && type == 'companyAdmin') {
            const getUserData = async () => {
                const data = await getCurrentUserDetails(idToFetch!);
                setUserData(data);
                setCompanyAdminData(null);
            };
            getUserData();
        }
        if (data.type == 'company' && type == 'companyAdmin') {
            const getCompanyAdminData = async () => {
                const data = await getCurrentUserDetails(idToFetch!);
                setUserData(data);
                setCompanyAdminData(null);
            };
            getCompanyAdminData();
        }
        if (data.type == 'company' && type == 'user') {
            const getCompanyAdminData = async () => {
                const data = await getCompanyAdminDetails(idToFetch!);
                setCompanyAdminData(data);
                setUserData(null);
            };
            getCompanyAdminData();
        }
    }, []);

    return (
        currentUser ?
            <>
                {
                    userData &&
                    <div className="cursor-pointer hover:bg-gray-200 p-2 break-words" onClick={() => setChat(data)}>
                        <div className='relative'>
                            {
                                userData?.image?.length ? (
                                    <div className="flex items-center justify-center w-8 h-8 mx-2 overflow-hidden rounded-full">
                                        <img src={userData?.image} />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center mx-2 h-8 w-8 bg-indigo-200 rounded-full">
                                        {userData?.firstName && userData?.firstName[0]}
                                    </div>
                                )
                            }
                            {
                                onlineUsers && onlineUsers.map((item: any) => {
                                    return (
                                        item.userId == idToFetch ? (
                                            <div className="absolute bottom-0 left-8 w-3 h-3 mr-1 rounded-full bg-green-500 border-2 border-white"></div>
                                        ) : (
                                            <div className="absolute bottom-0 left-8 w-3 h-3 mr-1 rounded-full bg-red-500 border-2 border-white"></div>
                                        )
                                    )
                                })
                            }
                            <div className="hidden sm:block absolute ml-2 top-0 left-10  text-sm font-semibold p-2">{userData?.firstName + " " + userData?.lastName}</div>
                        </div>
                        <div className="block sm:hidden text-sm font-semibold pl-2">{userData?.firstName}</div>
                    </div>
                }
                {
                    companyAdminData &&
                    <div className="relative cursor-pointer hover:bg-gray-200 p-2 break-words" onClick={() => setChat(data)}>
                        <div className="relative">
                            {
                                companyAdminData?.image?.length ? (
                                    <div className="flex items-center justify-center w-8 h-8 mx-2 overflow-hidden rounded-full">
                                        <img src={companyAdminData?.image} />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center mx-2 h-8 w-8 bg-indigo-200 rounded-full">
                                        {companyAdminData?.name && companyAdminData?.name[0]}
                                    </div>
                                )
                            }
                            {
                                onlineUsers && onlineUsers.map((item: any) => {
                                    return (
                                        item.userId == idToFetch ? (
                                            <div className="absolute bottom-0 left-8 w-3 h-3 mr-1 rounded-full bg-green-500 border-2 border-white"></div>
                                        ) : (
                                            <div className="absolute bottom-0 left-8 w-3 h-3 mr-1 rounded-full bg-red-500 border-2 border-white"></div>
                                        )
                                    )
                                })
                            }
                            <div className="hidden sm:block absolute ml-2 top-0 left-10  text-sm font-semibold p-2"> {companyAdminData?.name}</div>
                        </div>
                        <div className="block sm:hidden text-sm font-semibold pl-2">{companyAdminData?.name}</div>
                    </div>
                }
            </> : null
    )
}