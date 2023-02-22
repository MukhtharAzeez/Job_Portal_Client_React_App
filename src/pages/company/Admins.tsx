import React, { useState } from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { CompanyAndAdminSideBar, Header } from '../../components/Common';
import { Admins } from '../../components/Company';
import { COMPANY_SIDE_BAR_LINKS } from '../../constants/Company-sideBar';
import { CompanyProtectRoute } from '../../protectRoutes';

function AdminsList() {
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
                        <div className="px-4 sm:px-6 lg:px-8 pb-8 w-full max-w-9xl mx-auto bg-gray-200 min-h-[100vh]">
                            <div className="rounded-t bg-transparent mb-0 px-1 pb-4">
                                <Breadcrumbs aria-label="breadcrumb" className="pt-5 text-black">
                                    <Link href="/company">
                                        <HomeIcon />  Home
                                    </Link>
                                    <Link href="/company/admins">
                                        Admins
                                    </Link>
                                </Breadcrumbs>
                                <Link href="/company/admins/add-admin" className="text-center flex justify-end">
                                    <button className="bg-[#1e293b] text-gray-400 active:bg-[#1e293b] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-400 hover:text-black outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                        Add Admin
                                    </button>
                                </Link>
                            </div>
                            <div className="border rounded-lg shadow mx-8">
                                <Admins />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </CompanyProtectRoute>
    )
}

export default AdminsList
