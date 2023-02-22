import React from "react";
import { NavBar, MobileBottom } from "../../components/Common";
import { UserMessage } from "../../components/Message";
import { CompanyAdminProtectRoute } from "../../protectRoutes";

function Inbox() {
    return (
        <CompanyAdminProtectRoute>
            <div>
                <NavBar type={'company-admin'} />
                <UserMessage type={'companyAdmin'} />
                <div className="sm:hidden">
                    <MobileBottom />
                </div>
            </div>
        </CompanyAdminProtectRoute>
    );
}

export default Inbox;
