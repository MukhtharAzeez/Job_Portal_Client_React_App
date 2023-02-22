import { allUsersIdStore } from './../zustand/allUsersIdStore';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompanyAdminDetails, currentCompanyAdmin } from "../redux/company-admin/CompanyAdminAuthSlicer";
import { useNavigate } from 'react-router-dom';

export const CompanyAdminProtectRoute = ({ children }: any) => {
  const dispatch = useDispatch();
  const setId = allUsersIdStore((state:any)=>state.setId)
  const navigate = useNavigate();
  const companyAdmin = useSelector(currentCompanyAdmin);

  useEffect(() => {
    const publicFu = () => {
      const companyAdminToken = localStorage.getItem("companyAdminToken");
      if (!companyAdminToken) {
        navigate("/company-admin/login");
      }
      const adminName = localStorage.getItem("adminName");
      const email = localStorage.getItem("email");
      const companyId = localStorage.getItem("companyId");
      const companyAdminId = localStorage.getItem("companyAdminId");
      dispatch(
        addCompanyAdminDetails({
          result: {
            email,
            _id: companyAdminId,
            company: companyId,
            name: adminName,
          },
          accessToken: { access_token: companyAdminToken },
        })
      );
      setId(companyAdminId);
    };
    publicFu();
  }, [companyAdmin]);
  if (companyAdmin.companyAdminId != null) {
    return children;
  }
};
