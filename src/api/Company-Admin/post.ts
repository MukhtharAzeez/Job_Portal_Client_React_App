import instance from "../../axios/axios";

export const addAJobPost = async (formData: any) => {
  const result = await instance.post(`/companyAdmin/postJob`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("companyAdminToken")}`,
    },
  });
  return result;
};
export const editAPost = async (formData: any) => {
  const result = await instance.patch(`/companyAdmin/editAJob`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("companyAdminToken")}`,
    },
  });
  return result;
};    

export const acceptApplicant = async (
  formData: any,
  jobId: any,
  applicantId: any,
  adminId: any,
  companyId: any
) => {
  const result = await instance.patch(
    `/jobApplicant/acceptApplicant?jobId=${jobId}&applicantId=${applicantId}&adminId=${adminId}&companyId=${companyId}`,
    formData,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("companyAdminToken")}`,
      },
    }
  );
  return result;
};
