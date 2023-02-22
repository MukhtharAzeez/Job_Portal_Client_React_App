import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2Icon from "@mui/icons-material/Person2";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FindInPageIcon from '@mui/icons-material/FindInPage';
// import searchUsers from '../../../../assets/image/searchUsers.png'
// import noSearchResults from '../../../../assets/image/noSearchResults.webp'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getUsersBySearching } from "../../../../api/User/Get/user";
import { sendMessageToFriend } from "../../../../api/User/Post/user";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/LoginSharp';
import { DebounceInput } from "react-debounce-input";
import { currentUser, logoutUser } from "../../../../redux/user/userAuthSlicer";
import { currentCompanyAdmin, logoutCompanyAdmin } from "../../../../redux/company-admin/CompanyAdminAuthSlicer";
import Avatar from "@mui/material/Avatar";
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';


interface Props {
  type: string;
}

export function NavBar({type}:Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = React.useState(false);
  const [userSearchResult, setUserSearchResult] = useState<any>([])
  const { userId } = useSelector(currentUser)
  const { companyAdminId } = useSelector(currentCompanyAdmin)
  const [searched, setSearched] = useState(false)
  
  async function handleInputChange(e: any) {
    if (e.target.value.length === 0) {
      setUserSearchResult([])
      setSearched(false)
      return
    }
    const result = await getUsersBySearching(e.target.value)
    setUserSearchResult(result)
    setSearched(true)
  }

  async function messageUser(searchUserId: string) {
    if(userId){
      await sendMessageToFriend(userId, searchUserId, 'user')
      navigate("/user/inbox",{state:{senderId:userId,receiverId:searchUserId}})
      setShowModal(false)
      return 
    }
    if(companyAdminId){
      await sendMessageToFriend(searchUserId, companyAdminId, 'company')
      navigate("/company-admin/inbox", { state: { senderId: searchUserId, receiverId: companyAdminId } })
    }
    setShowModal(false)
  }

  function handleLogout(){
    localStorage.clear()
    if(type==='user'){
      dispatch(logoutUser())
    }
    if(type==='companyAdmin'){
      dispatch(logoutCompanyAdmin())
    } 
  }

  return (
    <>
      <Helmet>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <div className="p-4 fixed z-10 w-full top-0 text-gray-900 bg-white shadow-lg ">
        <div className="flex p-2">
          <div className="w-full flex gap-3">
            <span className="px-2 mr-2 border-r border-gray-800">Portal</span>
            <Link to={type === 'user' ? '/' : `/${type}`}>
              <span className="px-1 cursor-pointer hover:text-gray-700 hidden md:block">
                <HomeIcon />
              </span>
            </Link>
            <PersonSearchIcon className="cursor-pointer" onClick={() => setShowModal(true)} />
            {type === 'user' && <FindInPageIcon className="cursor-pointer" onClick={() => setShowModal(true)} />}
            <Link to={`/${type}/schedules`}>
              <span className="px-1 w-8 relative cursor-pointer hover:text-gray-700 hidden md:block">
                <EventNoteIcon />
              </span>
            </Link>
            <Link to={`/${type}/inbox`}>
              <span className="px-1 w-8 relative cursor-pointer hover:text-gray-700 hidden md:block">
                <ChatBubbleIcon className="w-8" />
              </span>
            </Link>
            <Link to={`/${type}/notifications`}>
              <span className="px-1 w-8 relative cursor-pointer hover:text-gray-700 hidden md:block">
                <NotificationsIcon />
                <span className="absolute right-0 top-0 -mt-1 -mr-4 text-xs bg-red-400 text-black font-medium px-2 rounded-full">
                  3
                </span>
              </span>
            </Link>
          </div>
          <Link to={`/${type}/profile`}>
            <span className="w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700">
              <Person2Icon />
            </span>
          </Link>
          <Link to={`/${type}/login`} onClick={handleLogout}>
            <span className="w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700">
              <LoginIcon />
            </span>
          </Link>
        </div>
      </div>

      {
        showModal &&
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-w-3xl mx-auto my-6 "
          >
            <div className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ${searched ? 'bg-[#f1f1f1]' : 'bg-white'}`}>
              <div className="flex items-start justify-between p-5  rounded-t">
                <div className="flex rounded-l-xl w-full">
                  <DebounceInput
                    placeholder={'Enter username...'}
                    className="w-full p-2 border-2 rounded-md focus:outline-0"
                    minLength={1}
                    debounceTimeout={1000}
                    onChange={handleInputChange} />
                </div>
                <button
                  className="py-2 pl-1 "
                  onClick={() => setShowModal(false)}
                >
                  <span className="">
                    <p className="text-black">Close</p>
                  </span>
                </button>
              </div>
              {
                userSearchResult.length ? (
                  <div className="w-full h-full px-4 xl:px-8 pt-3 pb-5 max-h-[400px]  min-h-[400px] overflow-scroll">
                    {
                      userSearchResult.map((user:any) => {
                        return (
                          <div key={user._id} className="flex justify-between items-center py-2">
                            <div className="flex">
                              <Avatar onClick={() => navigate("/user/visit-user", { state: { friend: user._id } })}
                                alt="User Profile" src={user.image} className="cursor-pointer" />
                              <div className="flex items-center pl-4">
                                <div>
                                  <h3 className="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4">{user.firstName + " " + user.lastName}</h3>
                                  <p className="text-gray-600 text-xs leading-3">{user.email}</p>
                                </div>
                              </div>
                            </div>
                            {userId !== user._id && 
                              <div onClick={() => messageUser(user._id)} className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600 cursor-pointer" >
                                <div className="border p-2 rounded-md text-gray-400 bg-gray-800 hover:bg-transparent hover:text-gray-800 hover:border-gray-800 ">
                                  Message
                                </div>
                              </div>
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div className="flex justify-center py-20">
                    {
                      searched ? (<img width={320} height={320} src={""} alt="" />) : (<img width={240} height={240} src={""} alt="" />)
                    }
                  </div>
                )
              }
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      }
    </>
  );
}