import { Route, Routes } from 'react-router-dom';
import React from 'react';
import CreatePage from '../pages/company/CreatePage';
import CompanyLogin from '../pages/company/CompanyLogin';
import AdminsList from '../pages/company/Admins';
import AddAdmin from '../pages/company/AddAdmin';
import CompanyAdminProfile from '../pages/company/CompanyAdminProfile';
import NotificationAndRequests from '../pages/company/NotificationAndRequests';
import Home from '../pages/company/Home';

function CompanyRoutes() {
    return (
        <>
            <Routes>
                <Route path="/create" element={<CreatePage />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<CompanyLogin />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/admins" element={<AdminsList />} />
            </Routes>
            <Routes>
                <Route path="/admins/add-admin" element={<AddAdmin />} />
            </Routes>
            <Routes>
                <Route path="/admins/company-admin-profile" element={<CompanyAdminProfile />} />
            </Routes>
            <Routes>
                <Route path="/requests" element={<NotificationAndRequests />} />
            </Routes>
        </>
    );
}

export default CompanyRoutes;

