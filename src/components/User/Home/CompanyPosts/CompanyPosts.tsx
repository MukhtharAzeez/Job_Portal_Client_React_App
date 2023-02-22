import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import moment from "moment";
import { currentUser } from "../../../../redux/user/userAuthSlicer";
import { applyForJob } from "../../../../api/User/Get/post";
import { Alert, Snackbar } from "@mui/material";
import { Avatar } from '@material-ui/core';
import useNotification from "../../../../customHooks/useNotification";

interface props {
    post: any;
}

export function CompanyPosts({ post }: props) {
    const setNotification = useNotification()
    const { userId, userName } = useSelector(currentUser);
    const [message, setMessage] = React.useState({ messageType: '', message: '' });
    const [open, setOpen] = useState(false)
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    async function applyForAJob(postId: string, companyId: string) {
        try {
            const mess = {
                message: "Wait we are proceeding your request !",
                messageType: "info"
            }
            setMessage(mess)
            setOpen(true);
            await applyForJob(companyId, postId, userId!);
            const mes = {
                message: "You successfully applied for this job",
                messageType: "success"
            }
            setMessage(mes);
            setOpen(true);
            setNotification({
                content: `${userName} has applied for ${post.job}`,
                type: "success",
                receiver: post.adminId as string,
            });
        } catch (error: any) {
            const type = typeof error.response.data.message;
            if (type == "string") {
                const mes = {
                    message: error.response.data.message,
                    messageType: "error"
                }
                setMessage(mes);
            } else {
                const mes = {
                    message: error.response.data.message[0],
                    messageType: "error"
                }
                setMessage(mes);
            }
            setOpen(true);
        }
    }
    return (
        <>
            <div className="max-w-sm md:max-w-md  container bg-white rounded-md shadow-lg mb-2">
                <div className='py-2'>
                    <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer  transition duration-100">{post.job}</h1>
                    <p className="pl-4 text-xs">{moment(post.createdAt).fromNow()}</p>
                </div>
                {post.image && <img className="w-full cursor-pointer" src={post.image} alt="" />}
                <CardContent className="max-h-48 overflow-scroll">
                    <div className="flex pl-2">
                        <h4 className="font-bold max-w-sm  break-words">{post.job}</h4>
                    </div>
                    <div className="">
                        <Typography variant="body2" color="text.secondary" className="p-2 max-w-[200px] lg:max-w-md  break-words ">
                            <p className="font-bold text-black">About</p>
                            <span className="text-black">{post.jobDescription}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="p-2 max-w-[200px] lg:max-w-md  break-words text-black">
                            <p className="font-bold text-black">Benefits</p>
                            <span className="text-black">{post.benefits}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="p-2 max-w-[200px] lg:max-w-md  break-words text-black">
                            <p className="font-bold text-black">Required Qualifications</p>
                            <span className="text-black">{post.jobQualification}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="p-2 max-w-[200px] lg:max-w-md  break-words text-black">
                            <p className="font-bold text-black">Applicants must have</p>
                            <span className="text-black">{post.applications}</span>
                        </Typography>
                    </div>
                </CardContent>
                <div className="flex p-4 justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar className="bg-gray-500" aria-label="recipe">
                            {post?.companyId?.company[0]}
                        </Avatar>
                        <h2 className="text-gray-800 font-bold cursor-pointer">{post?.companyId?.company}</h2>
                    </div>
                    <div onClick={() => applyForAJob(post._id, post.companyId._id)} className="px-6 py-1 shadow-md ml-4 hover:shadow-inner cursor-pointer bg-gray-100 text-gray-500 hover:text-gray-400 rounded-lg">
                        <p>Apply For the Job</p>
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={message.messageType == "error" ? "error" : message.messageType == "success" ? "success" : "info"}
                        sx={{ width: "100%" }}
                    >
                        {message.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}