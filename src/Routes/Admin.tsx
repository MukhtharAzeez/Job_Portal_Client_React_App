import { Route, Routes } from 'react-router-dom';
import React from 'react';
import UserSignup from '../pages/user/Signup';
import AdminLogin from '../pages/admin/Login';
import Home from '../pages/admin/Home';
import Company from '../pages/admin/Company';
import AdminCompanyDetails from '../pages/admin/CompanyDetails';

function Admin() {
    return (
        <>
            {/* <Routes>
                <Route path="/admin/signup" element={<UserSignup />} />
            </Routes> */}
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/company" element={<Company />} />
            </Routes>
            <Routes>
                <Route path="/company/company-details" element={<AdminCompanyDetails />} />
            </Routes>
        </>
    );
}

export default Admin;

