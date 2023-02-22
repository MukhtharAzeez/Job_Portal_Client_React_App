import { allUsersIdStore } from './../zustand/allUsersIdStore';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, currentUser } from "../redux/user/userAuthSlicer";
import { useNavigate } from 'react-router-dom';

export const UserProtectRouter = ({ children }:any) => {
  const dispatch = useDispatch();
  const setId = allUsersIdStore((state:any)=>state.setId)
  const navigate = useNavigate();
  const user = useSelector(currentUser);

  useEffect(() => {
    const publicFu = () => {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          navigate("/user/login");
        }
        const firstName = localStorage.getItem("userName");
        const lastName = ''
        const email = localStorage.getItem("email")
        const image = localStorage.getItem("image");
        const userId = localStorage.getItem("userId")
        dispatch(addUserDetails({ result: { firstName , lastName,_id:userId, email,image}, accessToken: {access_token:userToken} }));
        setId(userId)
    };
    
    
    publicFu();
  },[user]);

  if (user.userId !=null) {
    return children;
  }
};