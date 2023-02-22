import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/user/userAuthSlicer";
import { getCurrentUserDetails } from "../../api/User/Get/user";
import { currentCompanyAdmin } from "../../redux/company-admin/CompanyAdminAuthSlicer";
import { getCompanyAdminDetails } from "../../api/Company-Admin/get";
import { FriendsList } from "./FriendsList";

interface OnlineUsers {
  userId: string
  socketId: string
}
interface Props {
  setChat: any
  onlineUsers: Array<OnlineUsers>
}
interface Data {
  image : string
  firstName: string
  lastName: string
  name: string
}

export function LargeScreenSideBar({setChat, onlineUsers}:Props) {
  const { userId } = useSelector(currentUser)
  const { companyAdminId } = useSelector(currentCompanyAdmin)
  const [data, setData] = useState<Data>({image:"", firstName: "", lastName: "", name: ""})
  const fetcher = async (id:string) => {
    const user = await getCurrentUserDetails(id);
    setData(user)
  };

  const adminFetcher = async (id: string) => {
    const user = await getCompanyAdminDetails(id);
    setData(user)
  };
  
  useEffect(()=>{
    if(userId){
      fetcher(userId)
    }else if(companyAdminId){
      adminFetcher(companyAdminId)
    }
  },[])

  return (
    data && 
    <>
      <div className="flex flex-col sm:py-8 sm:pl-6 sm:pr-2 w-16 sm:w-64 bg-white flex-shrink-0">
        <div className="hidden sm:flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="hidden sm:flex ml-2 font-bold text-2xl">QuickChat</div>
        </div>
        <div className="hidden sm:flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full  py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={data.image ? data.image : 'https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png'}
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="xs:hidden md:block text-sm font-semibold mt-2">{userId ? data.firstName + " " + data.lastName : data.name}</div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div>
        <FriendsList setChat={setChat} onlineUsers={onlineUsers} />
      </div>
    </>
  );
}