import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { MobileBottom, NavBar, RightBar, SideBar, SideBarWithoutText } from '../../components/Common'
import { Profile } from "../../components/User";
import { USER_SIDEBAR_LINKS } from '../../constants/User-sideBar'
import { Helmet } from 'react-helmet';

function VisitUser() {
    const location = useLocation();
    const {friend} = location.state

    return (
        <>
            <Helmet>
                <title>Friend-Profile</title>
            </Helmet>
            <Box className="bg-gray-200" color={"text.primary"}>
                <NavBar type={'user'} />
                <div className="border ">
                    <div className="flex justify-around md:pr-20">
                        <div className="w-2/12 mt-8 hidden md:block">
                            <SideBar links={USER_SIDEBAR_LINKS} href={'/user/visit-user'} />
                        </div>
                        <div className="lg:w-5/12 sm:w-full xs:w-2/12 md:pl-44 lg:pl-16 mt-5 flex justify-center">
                            <Profile userId={friend} user={null} />
                        </div>
                        <div className=" md:w-2/12 md:pr-10  mt-4">
                            <RightBar />
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

export default VisitUser;
