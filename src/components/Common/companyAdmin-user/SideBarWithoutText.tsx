import React from "react";
import { ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

interface Link {
  href: string,
  title: string,
  icon: any,
}

interface Props {
  links: Array<Link>
  href: string
}

export function SideBarWithoutText({links,href}:Props) {
  return (
    <div className="fixed w-1/10 mt-20 xs:w-0 hidden sm:block">
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
              <Link key={link.title} to={link.href}>
                <span className={`cursor-pointer  pt-0 ${link.href == href ? 'bg-gray-800' : 'bg-white hover:bg-gray-200 hover:text-gray-700'} rounded flex mb-5`}>
                  <ListItemIcon className='flex justify-center'>
                    <Icon className={`${link.href === href ? 'text-gray-200' : 'text-black'} my-2`} />
                  </ListItemIcon>
                </span>
              </Link>
            )
          })
        }  
      </div>
    </div>
  );
}