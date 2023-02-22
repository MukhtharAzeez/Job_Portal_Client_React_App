import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { makeNotification } from "../APIs";
import { allUsersIdStore, messageStore } from "../zustand";
import { notifierActions } from "../redux/notifier/Notifier";
import { sendNotification } from "../api/notifications";

export interface Notification {
  _id?: string;
  author?: string;
  receiver: string;
  content: string;
  type: "error" | "warning" | "info" | "success";
  createdAt?: Date;
  updatedAt?: Date;
}

export default function useNotification() {
  const dispatch = useDispatch();
  const socket = messageStore((state:any) => state.socket);
  const currentUser = allUsersIdStore((state:any) => state.id);
  const [notification, setNotification] = useState<Notification>();

  const isValid = () => {
    return currentUser && notification !== undefined && socket;
  };

  const createNewNotification = async () => {
    try {
      if (isValid()) {
        const newNotification = await sendNotification(notification);
        if (newNotification) {
          socket?.emit("send-notification", notification);
          setNotification(undefined);
        }
      }
    } catch (err) {
      console.log({ err });
      dispatch(
        notifierActions.error(
          `Something went wrong when creating notification !`
        )
      );
    }
  };

  // Invoking createNewNotification() to create a new notification when
  // `notification` is being updated from any components.
  useEffect(() => {
    createNewNotification();
  }, [notification]);

  return setNotification;
}
