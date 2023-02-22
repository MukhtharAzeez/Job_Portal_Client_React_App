import instance from "../../axios/axios";

export const createABusinessPage = async (formData:any) => {
  const result = await instance.post(`/company/create`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
    },
  });
  return result;
};

export const addAdmin = async (formData: any) => {
  const result = await instance.post(`/company/addAdmin`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
    },
  });
  return result;
};

export const acceptSchedule = async (formData: any) => {
  const result = await instance.patch(`/company/acceptSchedule`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
    },
  });
  return result;
};

export const rejectSchedule = async (formData: any) => {
  const result = await instance.patch(`/company/rejectSchedule`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
    },
  });
  return result;
};