import React from "react";
import { ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../redux/user/userAuthSlicer";
import { logoutCompanyAdmin } from "../../../redux/company-admin/CompanyAdminAuthSlicer";
import { useDispatch } from "react-redux";

interface Link {
  href: string,
  title: string,
  icon: any,
}

interface Props {
  links: Array<Link>
  href: string
}


export function SideBar({ links, href }: Props) {
  const dispatch = useDispatch()

  function handleLogout() {
    localStorage.clear()
    dispatch(logoutUser())
    dispatch(logoutCompanyAdmin())
  }
  return (
    <div className="fixed w-1/5 mt-20  hidden sm:block">
      <div className="w-full py-4 px-2 text-gray-900 bg-white rounded-lg text-left capitalize font-medium shadow-2xl">
        <img
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
          alt="alt placeholder"
          className="w-8 h-8 mx-auto mb-5 "
        />
        {
          links.map(function (link: Link) {
            const Icon = link.icon
            return (
              <Link to={link.href} key={link.title} onClick={() => { link.title == 'Logout' && handleLogout() }} className={`cursor-pointer px-2 ${link.href === href ? 'bg-gray-800' : 'bg-white hover:bg-gray-200 hover:text-gray-700'}  rounded flex`}>
                <span className="w-8 my-5 relative">
                  <ListItemIcon className={`${link.href === href ? 'text-gray-100' : 'text-gray-500 group-hover:text-gray-800'} mx-4 `}>
                    <Icon className={`${link.href === href ? 'text-gray-200' : 'text-black'}`} />
                  </ListItemIcon>
                  {/* <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
                    3
                  </span> */}
                </span>
                <span className={`mx-5 my-5 ${link.href === href ? 'text-gray-200' : 'text-black'}`}>{link.title}</span>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}