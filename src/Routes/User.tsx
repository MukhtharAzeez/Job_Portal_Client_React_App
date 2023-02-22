import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../pages/user/Home'
import { PublicRoute, UserProtectRouter } from '../protectRoutes';
import CompanyDetails from '../pages/user/Company-details';
import Inbox from '../pages/user/Inbox';
import Notifications from '../pages/user/Notifications';
import UserProfile from '../pages/user/UserProfile';
import UserAppliedJobs from '../pages/user/Applied-jobs';
import Company from '../pages/user/Company';
import Edit from '../pages/user/EditProfile';
import UserSchedules from '../pages/user/UserSchedules';
import UserSignup from '../pages/user/Signup';
import VisitUser from '../pages/user/VisitUser';
import UserLogin from '../pages/user/Login';

function User() {
  return (
    <>
      <Routes>
        <Route path="/user/signup" element={<PublicRoute><UserSignup /></PublicRoute>} />
      </Routes>
      <Routes>
        <Route path="/user/login" element={<PublicRoute><UserLogin/></PublicRoute>} />
      </Routes>
      <Routes>
        <Route path="/" element={<UserProtectRouter><Home /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/applied-jobs" element={<UserProtectRouter><UserAppliedJobs /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/company" element={<UserProtectRouter><Company /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/company/company-details" element={<UserProtectRouter><CompanyDetails /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/inbox" element={<UserProtectRouter><Inbox /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/notifications" element={<UserProtectRouter><Notifications /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/profile" element={<UserProtectRouter><UserProfile /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/profile/edit" element={<UserProtectRouter><Edit /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/schedules" element={<UserProtectRouter><UserSchedules /></UserProtectRouter>} />
      </Routes>
      <Routes>
        <Route path="/user/visit-user" element={<UserProtectRouter><VisitUser /></UserProtectRouter>} />
      </Routes>
    </>
  );
}

export default User;

