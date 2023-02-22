import React from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import { NavBar, SideBar, SideBarWithoutText, RightBar, MobileBottom } from "../../components/Common";
import { AddJob } from "../../components/Company-admin";
import { COMPANY_ADMIN_SIDEBAR_LINKS } from "../../constants/Company-admin-sidebar";
import { CompanyAdminProtectRoute } from "../../protectRoutes";
import { Helmet } from "react-helmet";

export default function PostJob() {

    return (
        <CompanyAdminProtectRoute>
                <Helmet>
                    <title>Portal</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> */}
                </Helmet>
                <Box color={"text.primary"} className="bg-gray-200">
                    <NavBar  type={'company-admin'} />
                    <div className="border">
                        <div className="flex justify-around">
                            <div className="sm:w-2/12 mt-12">
                                <div className="hidden md:block">
                                    <SideBar links={COMPANY_ADMIN_SIDEBAR_LINKS} href={'/company-admin/create'} />
                                </div>
                                <div className="ml-6 md:hidden">
                                    <SideBarWithoutText links={COMPANY_ADMIN_SIDEBAR_LINKS} href={'/company-admin/create'} />
                                </div>
                            </div>
                            <div className="md:w-6/12 sm:w-9/12 w-full mt-32 mr-5 lg:ml-16">
                                <AddJob />
                            </div>
                            <div className="w-2/12 mt-8 hidden lg:block mr-20">
                                <RightBar />
                            </div>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <MobileBottom />
                    </div>
                </Box>
        </CompanyAdminProtectRoute>
    );
}