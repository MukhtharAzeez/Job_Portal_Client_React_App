import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { currentUser } from "../redux/user/userAuthSlicer";
import { currentCompany } from "../redux/company/companyAuthSlicer";
import { currentCompanyAdmin } from "../redux/company-admin/CompanyAdminAuthSlicer";

export const PublicRoute = ({ children }: any) => {
  const navigate = useNavigate();

  const user = useSelector(currentUser);
  const company = useSelector(currentCompany);
  const companyAdmin = useSelector(currentCompanyAdmin);

  useEffect(() => {
    const publicFu = () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        return navigate("/");
      }
      return null
    };
    publicFu();
  }, [user]);

  useEffect(() => {
    const publicFu = () => {
      const companyToken = localStorage.getItem("companyToken");
      if (companyToken) {
        return navigate("/company");
      }
      return null;
    };
    publicFu();
  }, [company]);

  useEffect(() => {
    const publicFu = () => {
      const companyAdminToken = localStorage.getItem("companyAdminToken");
      if (companyAdminToken) {
        return navigate("/company-admin");
      }
      return null;
    };
    publicFu();
  }, [companyAdmin]);

  if (user.userId == null) {
    return children;
  }
};

export default PublicRoute;
