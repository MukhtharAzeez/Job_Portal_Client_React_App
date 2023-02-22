import React, { useState } from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { CompanyAndAdminSideBar, Header } from '../../components/Common';
import { AddCompanyAdmins } from '../../components/Company';
import { COMPANY_SIDE_BAR_LINKS } from '../../constants/Company-sideBar';
import { CompanyProtectRoute } from '../../protectRoutes';
function AddAdmin() {

    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
        <CompanyProtectRoute>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <CompanyAndAdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} links={COMPANY_SIDE_BAR_LINKS} />
                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        {/* <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-gray-200"> */}
                        <div className="border rounded-lg shadow bg-gray-200">
                            <Breadcrumbs aria-label="breadcrumb" className="p-5 pl-8 text-black">
                                <Link href="/company">
                                    <HomeIcon />  Home
                                </Link>
                                <Link href="/company/admins"
                                >
                                    Admins
                                </Link>
                                <Link href="/company/admins/add-admin"
                                >
                                    Add Admin
                                </Link>
                            </Breadcrumbs>
                            <AddCompanyAdmins />
                        </div>
                        {/* </div> */}
                    </main>
                </div>
            </div>
        </CompanyProtectRoute>
    )
}

export default AddAdmin
