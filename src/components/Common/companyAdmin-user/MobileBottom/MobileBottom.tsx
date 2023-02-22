import React, { useEffect, useState } from 'react';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"; import HomeIcon from '@mui/icons-material/HomeSharp';
import LoginIcon from '@mui/icons-material/LoginSharp';
import EventNoteIcon from '@mui/icons-material/EventNoteSharp';
import { useSelector } from 'react-redux';
import { currentCompanyAdmin } from '../../../../redux/company-admin/CompanyAdminAuthSlicer';
import { currentUser } from '../../../../redux/user/userAuthSlicer';
import { Link } from 'react-router-dom';

export function MobileBottom() {
  const { userId } = useSelector(currentUser)
  const { companyAdminId } = useSelector(currentCompanyAdmin)
  const [userType, setUserType] = useState("")
  useEffect(() => {
    if (userId) {
      setUserType("user")
    }
    if (companyAdminId) {
      setUserType("company-admin")
    }
  })
  const Menus = [
    { title: "Home", icon: HomeIcon, href: `${userType == 'user' ? '/' : '/company-admin'}` },
    { title: "Schedules ", icon: EventNoteIcon, href: `/${userType}/schedules` },
    { title: "Messages", icon: ChatBubbleOutlineOutlinedIcon, href: `/${userType}/inbox` },
    { title: "Notifications", icon: NotificationsNoneOutlinedIcon, href: `/${userType}/notifications` },
    { title: "Logout", icon: LoginIcon, href: `/${userType}/login` },
  ];

  return (
    userType ? <>
      <div className="fixed bottom-0 w-full border-t-2 flex px-4 py-2 justify-between border-slate-700 bg-white h-14">
        {Menus.map((menu) => (
          <Link
            to={menu?.href}
            key={menu?.title}
            onClick={() => { menu.title == "Logout" && localStorage.clear() }}
          >
            <div className={`hover:bg-[#bbc0c7] rounded-md p-2 text-black`}><menu.icon /></div>
          </Link>
        ))}
      </div>
    </> : null
  )
}