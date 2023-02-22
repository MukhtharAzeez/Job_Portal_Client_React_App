import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { MobileBottom, NavBar, RightBar, SideBar, SideBarWithoutText } from "../../components/Common";
import { USER_SIDEBAR_LINKS } from "../../constants/User-sideBar";
import { Feed } from "../../components/User";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function Home() {

  useEffect(() => {

    // (async () => {
    //   const session = await getSession({ req });
    //   console.log("github", session);
    //   if (session) {

    //     const chars =
    //       "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //     const passwordLength = 12;
    //     let password = "";

    //     for (let i = 0; i < passwordLength; i++) {
    //       const randomNumber = Math.floor(Math.random() * chars.length);
    //       password += chars.substring(randomNumber, randomNumber + 1);
    //     }

    //     const data = new FormData();
    //     data.append("firstName", session.user.name);
    //     data.append("lastName", "");
    //     data.append("email", session.user.email);
    //     data.append("image", session.user.image);
    //     data.append("password", password);
    //     data.append("confirmPassword", password);
    //     data.append("signInWith", "google");
    //     try {
    //       const user = await instance.post("/auth/user/registerWithProviders", data, {
    //         withCredentials: true,
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });
    //       localStorage.setItem(
    //         "userName",
    //         user.data.result.firstName + " " + user.data.result.lastName
    //       );
    //       localStorage.setItem("email", user.data.result.email);
    //       localStorage.setItem("userId", user.data.result._id);
    //       localStorage.setItem("userToken", user.data.accessToken.access_token);
    //       dispatch(addUserDetails(user.data.result));
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // })();
  }, []);

  return (
    // <UserProtectRouter>
    <div className="bg-gray-200 min-h-[100vh]">
      <NavBar  type={'user'}/>
      <div className="border ">
        <div className="flex justify-around md:pr-20">
          <div className="w-2/12 mt-8 hidden sm:block md:ml-24 lg:ml-0">
            {/* <SideBar links={USER_SIDEBAR_LINKS} /> */}
            <div className="sm:w-2/12">
              <div className="hidden md:block">
                <SideBar links={USER_SIDEBAR_LINKS}  href={'/'}/>
              </div>
              <div className="ml-6 md:hidden">
                {/* <SideBarWithoutText links={USER_SIDEBAR_LINKS} href={'/'}/> */}
              </div>
            </div>
          </div>
          <div className="lg:w-5/12 sm:w-full xs:w-2/12 md:pl-44 lg:pl-16 mt-5 flex justify-center">
            <Feed/>
          </div>
          <div className=" md:w-2/12 md:pr-10  mt-4">
            <RightBar />
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <MobileBottom />
      </div>
    </div>
  );
}
