import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostJob from '../pages/company-admin/PostJob';
import Inbox from '../pages/company-admin/Inbox';
import JobsDetails from '../pages/company-admin/JobsDetails';
import ApplicantProfile from '../pages/company-admin/ApplicantProfile';
import UserSchedules from '../pages/company-admin/UserSchedules';
import CompanyAdminLogin from '../pages/company-admin/CompanyAdminLogin';
import CompanyAdminNotifications from '../pages/company-admin/Notifications';
import Schedules from '../pages/company-admin/Schedules';
import UserPage from '../pages/company-admin/User';
import Home from '../pages/company-admin/Home';
import Jobs from '../pages/company-admin/Jobs';



function CompanyAdminRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<CompanyAdminLogin />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/create" element={<PostJob />} / >
            </Routes>
            <Routes>
                <Route path="/inbox" element={<Inbox />} / >
            </Routes>
            <Routes>
                <Route path="/jobs" element={<Jobs />} / >
            </Routes>
            <Routes>
                <Route path="/jobs/jobs-details" element={<JobsDetails />} / >
            </Routes>
            <Routes>
                <Route path="/jobs/jobs-details/applicant-profile" element={<ApplicantProfile />} / >
            </Routes>
            <Routes>
                <Route path="/jobs/jobs-details/user-schedules" element={<UserSchedules />} / >
            </Routes>
            <Routes>
                <Route path="/notifications" element={<CompanyAdminNotifications />} / >
            </Routes>
            <Routes>
                <Route path="/schedules" element={<Schedules />} / >
            </Routes>
            <Routes>
                <Route path="/user" element={<UserPage />} / >
            </Routes>
        </>
    );
}

export default CompanyAdminRoutes;

