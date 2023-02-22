import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { MobileBottom, NavBar, SideBar, SideBarWithoutText } from '../../components/Common'
import { USER_SIDEBAR_LINKS } from '../../constants/User-sideBar'
import { EditProfile } from "../../components/User";
import { Helmet } from "react-helmet";

function Edit() {
    return (
        <>
            <Helmet>
                <title>Edit-Profile</title>
            </Helmet>
            <Box className="bg-gray-200 min-h-[100vh]" color={"text.primary"}>
                <NavBar  type={'user'} />
                <div className="border ">
                    <div className="flex justify-around md:pr-20">
                        <div className="w-1/12 mt-10 ml-24 hidden lg:block">
                            <SideBar links={USER_SIDEBAR_LINKS} href={'/user/profile'} />
                        </div>
                        <div className="w-0 sm:w-1/12 mt-10 ml-5 xs:ml-0 sm:block lg:hidden">
                            <SideBarWithoutText links={USER_SIDEBAR_LINKS} href={'/user/profile'} />
                        </div>
                        <div className="w-full mt-24 md:ml-24 ">
                            <EditProfile />
                        </div>
                    </div>
                </div>
                <div className="sm:hidden">
                    <MobileBottom />
                </div>
            </Box>
        </>
    );
}

export default Edit;
