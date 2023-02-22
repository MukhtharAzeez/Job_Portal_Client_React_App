import { Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifier, notifierActions } from "../../../redux/notifier/Notifier";
import { allUsersIdStore, messageStore } from "../../../zustand";

export interface Notification {
    _id?: string;
    author?: string;
    receiver: string;
    content: string;
    type: "error" | "warning" | "info" | "success";
    createdAt?: Date;
    updatedAt?: Date;
}


export const Notifier = () => {
    const dispatch = useDispatch();
    const socket = messageStore((state:any) => state.socket)
    const currentUser = allUsersIdStore((state:any) => state.id)
    const [notification, setNotification] = useState<Notification>();

    // Receive Notification from socket server
    useEffect(() => {
        if (currentUser && socket) {
            socket?.on("receive-notification", (data: Notification) => {
                if (!data) return;
                setNotification(data);
            });
        }
    }, [socket]);

    // Dispatch notifications received from the socket server
    useEffect(() => {
        if (
            currentUser &&
            notification !== undefined &&
            notification.receiver === currentUser
        ) {
            dispatch(notifierActions[notification?.type](notification?.content));
        }
    }, [notification]);

    const { errorMessage } = useSelector(notifier);
    const { successMessage } = useSelector(notifier);
    const { infoMessage } = useSelector(notifier);
    const { warningMessage } = useSelector(notifier);
    const { OpenError } = useSelector(notifier);
    const { OpenSuccess } = useSelector(notifier);
    const { OpenInfo } = useSelector(notifier);
    const { OpenWarning } = useSelector(notifier);

    const handleCloseError = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(notifierActions.closeError());
    };
    const handleCloseSuccess = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(notifierActions.closeSuccess());
    };
    const handleCloseInfo = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(notifierActions.closeInfo());
    };
    const handleCloseWarning = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(notifierActions.closeWarning());
    };

    return (
        <>
            <Snackbar
                open={OpenError}
                autoHideDuration={4000}
                onClose={handleCloseError}
            >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
            {/* Success message */}
            <Snackbar
                open={OpenSuccess}
                autoHideDuration={4000}
                onClose={handleCloseSuccess}
            >
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
            {/* Info message */}
            <Snackbar
                open={OpenInfo}
                autoHideDuration={4000}
                onClose={handleCloseInfo}
            >
                <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
                    {infoMessage}
                </Alert>
            </Snackbar>
            {/* Warning message */}
            <Snackbar
                open={OpenWarning}
                autoHideDuration={4000}
                onClose={handleCloseWarning}
            >
                <Alert
                    onClose={handleCloseWarning}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {warningMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
