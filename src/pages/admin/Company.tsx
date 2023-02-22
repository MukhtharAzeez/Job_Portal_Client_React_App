import React, { useState } from "react";
import { Companies } from "../../components/Admin";
import { CompanyAndAdminSideBar, Header } from "../../components/Common";
import { ADMIN_SIDE_BAR_LINKS } from "../../constants/Admin_sideBar";


function Company() {
    console.log("Here we go")
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <CompanyAndAdminSideBar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                links={ADMIN_SIDE_BAR_LINKS}
            />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-gray-200 min-h-[100vh]">
                        <div className="border rounded-lg shadow">
                            <Companies url={"/admin/company/company-details"} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Company;
