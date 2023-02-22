import instance from "../../axios/axios";

export const getAllCompanies = async (skip: number, limit: number) => {
  const result = await instance.get(`/admin/getAllCompanies?limit=${limit}&skip=${skip}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const getCountCompanies = async () => {
  const result = await instance.get(`/admin/getCountCompanies`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const approveCompany = async (companyId: string) => {
  const result = await instance.patch(
    `/admin/approveCompany?companyId=${companyId}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result;
};
