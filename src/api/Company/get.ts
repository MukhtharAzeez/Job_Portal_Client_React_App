import instance from "../../axios/axios";

export const getAllCompanyAdmins = async (companyId:any,skip:number,limit:number) => {
  const result = await instance.get(
    `/company/getAllCompanyAdmins?companyId=${companyId}&skip=${skip}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
      },
    }
  );
  return result;
};

export const getCountCompanyAdmins = async (
  companyId: any
) => {
  const result = await instance.get(
    `/company/getCountCompanyAdmins?companyId=${companyId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
      },
    }
  );
  return result;
};

export const getCompanyDetails = async (companyId:string) => {
  const result = await instance.get(
    `/admin/getCompanyDetails?companyId=${companyId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
      },
    }
  );
  return result.data;
};

export const getAllRequests = async (companyId: any) => {
  const result = await instance.get(
    `/company/getAllRequests?companyId=${companyId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
      },
    }
  );
  return result.data;
};