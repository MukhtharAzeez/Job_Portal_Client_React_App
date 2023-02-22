import instance from "../../../axios/axios";

export const getCurrentUserDetails = async (userId: any) => {  
  const { data } = await instance.get(
    `/user/profile?userId=${userId}`,
    {
      withCredentials: true,
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const sendFriendRequest = async (userId: string,friendId:string) => {
  const { data } = await instance.get(
    `/user/sendFriendRequest?userId=${userId}&friendId=${friendId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getFriendsList = async (userId: string) => {
  const { data } = await instance.get(`/user/userFriends?userId=${userId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
};

export const getUserChat = async (userId: string, type: string) => {
  const { data } = await instance.get(`/chat/user/${userId}/${type}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
};


export const getMessages = async (chatId: string) => {
  const { data } = await instance.get(`/chat/getMessages?chatId=${chatId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
};

export const sendMessageToReceiver = async (
  senderId: string,
  chatId: string,
  text: string
) => {
  const { data } = await instance.post(
    `/chat/sendMessage`,
    { senderId, chatId, text },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getUserNotifications = async (userId: string) => {
  const { data } = await instance.get(
    `/user/getUserNotifications?userId=${userId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const userAcceptSchedule = async (requestId: any) => {
  const { data } = await instance.get(
    `/user/userAcceptSchedule?requestId=${requestId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const userRejectSchedule = async (requestId: any) => {
  const { data } = await instance.get(
    `/user/userRejectSchedule?requestId=${requestId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const userRequestToChangeTime = async (requestId: any) => {
  const { data } = await instance.get(
    `/user/userRequestToChangeTime?requestId=${requestId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getUserSchedules = async (userId: string,date:Date) => {
  const { data } = await instance.get(
    `/user/getUserSchedules?userId=${userId}&date=${date}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getCountAppliedJobs = async () => {
  const { data } = await instance.get(
    `/jobApplicant/getCountAppliedJobs`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getAllAppliedJobs = async (userId: string, skip: number , limit: number) => {
  const { data } = await instance.get(
    `/jobApplicant/getAllAppliedJobs?userId=${userId}&skip=${skip}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getARandomCompany = async () => {
  const { data } = await instance.get(
    `/user/getRandomCompany`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};

export const getUsersBySearching = async (name:string) => {
  const { data } = await instance.get(
    `/user/getUsersBySearching/${name}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return data;
};