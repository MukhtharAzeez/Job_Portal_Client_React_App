import React, { useState } from 'react'
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { CompanyAndAdminSideBar, Header } from "../../components/Common";
import { ADMIN_SIDE_BAR_LINKS } from "../../constants/Admin_sideBar";
import { Link } from 'react-router-dom';
import { CompanyDetails } from '../../components/Admin';


function AdminCompanyDetails() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <CompanyAndAdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} links={ADMIN_SIDE_BAR_LINKS} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="border rounded-lg shadow bg-gray-200">
                        <Breadcrumbs aria-label="breadcrumb" className="p-5 pl-8 text-black">
                            <Link to="/admin" className='text-black  no-underline'>
                                <HomeIcon />  Home
                            </Link>
                            <Link className='text-black  no-underline' to="/admin/company"
                            >
                                companies
                            </Link>
                            <Link className='text-black  no-underline' to="/admin/company/company-details"
                            >
                                Company Details
                            </Link>
                        </Breadcrumbs>
                        <CompanyDetails />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminCompanyDetails
