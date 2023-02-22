import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/user/userAuthSlicer";
import { MobileBottom, NavBar, RightBar, SideBar, SideBarWithoutText } from '../../components/Common'
import { USER_SIDEBAR_LINKS } from '../../constants/User-sideBar'
import { Profile } from "../../components/User";

function UserProfile() {
    const { userId } = useSelector(currentUser)

    return (
        <>
            <Box className="bg-gray-200 min-h-[100vh]" color={"text.primary"}>
                <NavBar  type={'user'} />
                <div className="border ">
                    <div className="flex justify-around md:pr-20">
                        <div className="w-2/12 mt-8 hidden md:block">
                            <SideBar links={USER_SIDEBAR_LINKS} href={'/user/profile'} />
                        </div>
                        <div className="lg:w-5/12 sm:w-full xs:w-2/12 md:pl-44 lg:pl-16 mt-5 flex justify-center">
                            <Profile userId={userId} user={true} />
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

export default UserProfile;
