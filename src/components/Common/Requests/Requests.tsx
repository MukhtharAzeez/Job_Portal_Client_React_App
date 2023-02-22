import moment from 'moment'
import React, { useState } from 'react'
import PsychologyIcon from '@mui/icons-material/Psychology';
import { acceptSchedule, rejectSchedule } from '../../../api/Company/post';
import { userAcceptSchedule, userRejectSchedule, userRequestToChangeTime } from '../../../api/User/Get/user';
import { acceptApplicant } from '../../../api/Company-Admin/post';
import { Alert, Snackbar } from "@mui/material";
import { updateRequest } from '../../../api/Company-Admin/get';
import useNotification from '../../../customHooks/useNotification';

// interface Request {
//     _id: string
//     message: string
//     company: {
//         _id: string
//         company: string
//     }
//     job: {
//         _id:string
//         job:string
//         benefits:string
//         jobDescription:string
//         jobQualification: string
//         applications: string
//     }
//     applicant:{
//         _id: string
//         firstName: string
//         lastName: string
//         qualifications: Array<string>
//         skills: Array<string>
//     }
//     admin: {
//         _id: string
//         name: string
//     }
//     accepted: boolean
//     type: string
//     createdAt: Date
//     updatedAt: Date
//     changeRequest: boolean
//     reScheduled: boolean
//     userAccepted: boolean
//     companyApproved: boolean
//     userRequestToChange: boolean
// }

interface Props {
    request: any
    type: string
}

export function Requests({ request, type }: Props) {
    const setNotification = useNotification()
    const [accepted, setAccepted] = useState(request.accepted)
    const [userChangeRequest, setUserChangeRequest] = useState(request?.changeRequest)
    const [reScheduled, setReScheduled] = useState(request?.reScheduled)
    const [reSchedule, setReSchedule] = useState(false)
    const [onlineInterviewDate, setOnlineInterviewDate] = useState("")
    const [onlineInterviewTime, setOnlineInterviewTime] = useState("")
    const [offlineInterviewDate, setOfflineInterviewDate] = useState("")
    const [offlineInterviewTime, setOfflineInterviewTime] = useState("")
    const [offlineInterviewPlace, setOfflineInterviewPlace] = useState("")
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const handleSnackBarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    async function accept() {
        await acceptSchedule({ companyRequestId: request._id })
        setNotification({
            content: `${request.company.company} accepted the request "${request.message}" ${request.applicant.firstName + " " + request.applicant.lastName} for job ${request.job.job}`,
            type: "success",
            receiver: request.admin._id as string,
        });
        setNotification({
            content: `${request.company.company} accepted the request "${request.message}" ${request.applicant.firstName + " " + request.applicant.lastName} for job ${request.job.job}`,
            type: "success",
            receiver: request.applicant._id as string,
        });
        setAccepted(true)
    }

    async function reject() {
        await rejectSchedule({ companyRequestId: request._id })
        setAccepted(false)
        setNotification({
            content: `${request.company.company} accepted the request  "${request.message}" ${request.applicant.firstName + " " + request.applicant.lastName} for job ${request.job.job}`,
            type: "error",
            receiver: request.admin._id as string,
        });
    }

    async function acceptByUser() {
        await userAcceptSchedule(request._id)
        setNotification({
            content: ` ${request.user.firstName + " " + request.user.lastName} accepted the request "${request.message}" for job ${request.job.job}`,
            type: "success",
            receiver: request.admin._id as string,
        });
        setAccepted(true)
    }
    async function rejectByUser() {
        await userRejectSchedule(request._id)
        setNotification({
            content: ` ${request.user.firstName + " " + request.user.lastName} accepted the request "${request.message}" for job ${request.job.job}`,
            type: "error",
            receiver: request.admin._id as string,
        });
        setAccepted(false)
    }

    async function requestToChangeTime() {
        await userRequestToChangeTime(request._id)
        setNotification({
            content: ` ${request.user.firstName + " " + request.user.lastName} accepted the request "${request.message}" for job ${request.job.job}`,
            type: "info",
            receiver: request.admin._id as string,
        });
        setUserChangeRequest(true)
        setAccepted(null)
    }
    async function scheduleNewTime() {
        setReSchedule(true)
    }

    async function updateSchedule(newSchedule: any) {
        try {
            await acceptApplicant(newSchedule, request.job._id, request.applicant._id, request.admin._id, request.company)
            await updateRequest(request._id)
            setNotification({
                content: ` ${request.admin.name} accepted the request of user ${request.user.firstName + " " + request.user.lastName} for "${request.message}" for job ${request.job.job}`,
                type: "info",
                receiver: request.company._id as string,
            });
            setReScheduled(true)
        } catch (error: any) {
            const type = typeof error.response.data.message;
            if (type == "string") {
                setMessage(error.response.data.message);
            } else {
                setMessage(error.response.data.message[0]);
            }
            setOpen(true);
        }
    }

    return (
        <ol className="w-full">
            <li className="border-l-2 border-purple-600">
                <div className="md:flex flex-start ">
                    <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-full md:mx-6 my-6">
                        <div className="flex justify-between mb-4">
                            {
                                type != 'user' ? (
                                    <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{request.admin.name}</a>
                                ) : (
                                    <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{request.company.company}</a>
                                )
                            }
                            <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{moment(request.createdAt).format('LLLL')}</a>
                        </div>
                        <p className="text-purple-600 hover:text-purple-700 focus:text-purple-800 ">{request.job.job}</p>
                        {type == 'company' ? <p className="text-gray-700 mb-6">{request.message}</p> : type == 'user' ? <p className="text-gray-700 mb-6">{request.message}</p> : ''}
                        {type == 'companyAdmin' && !request.companyApproved && <p className="text-gray-800 mb-6">Company rejected your request for <span className='text-red-800 italic text-sm font-semibold'>{request.message}</span></p>}
                        {type == 'companyAdmin' && request.companyApproved && request.userAccepted && <p className=" text-gray-800 mb-6">Company Approved your request for <span className='text-green-700 italic text-sm font-semibold'>{request.message}</span>  And User Also Accepted this !</p>}
                        {type == 'companyAdmin' && request.companyApproved && !request.userAccepted && !request.userRequestToChange && <p className="text-gray-800 mb-6">Company Approved your request for <span className='text-red-800 italic text-sm font-semibold'>{request.message}</span>  But User Rejected your Offer !</p>}
                        {type == 'companyAdmin' && request.companyApproved && !request.userAccepted && request.userRequestToChange && <p className="text-gray-800 mb-6">Company Approved your request for <span className=' text-sky-800 italic text-sm font-semibold'>{request.message}</span>  And User Request to change the scheduled time</p>}
                        {
                            type != 'user' && <div className='w-full border-x-2 border-t-2 rounded-sm border-purple-500 h-24 mb-4 px-4 py-2  overflow-y-scroll text-black'>
                                <h4 className="font-bold">{request.applicant.firstName + " " + request.applicant.lastName}</h4>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-9/12">
                                        <span className="text-lg leading-relaxed text-blueGray-700 flex flex-wrap  gap-2">
                                            <i className="fas fa-university ml-1 text-lg text-blueGray-400"></i>
                                            {
                                                request.applicant.qualifications.map(function (obj: any, index: number) {
                                                    return (
                                                        <>
                                                            <div key={obj} >
                                                                <p className="mt-1 text-sm font-bold">  {obj} {index == request.applicant.qualifications.length - 1 ? '' : '|'}</p>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-9/12">
                                        <span className="text-lg leading-relaxed text-blueGray-700 flex flex-wrap  gap-2">
                                            <PsychologyIcon className="" />
                                            {
                                                request.applicant.skills.map(function (obj: any, index: number) {
                                                    return (
                                                        <>
                                                            <div key={obj} >
                                                                <p className="mt-1 text-sm font-bold">  {obj} {index == request.applicant.skills.length - 1 ? '' : '|'}</p>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            type == 'company' && (
                                accepted == null ? (
                                    <>
                                        <button type="button" onClick={accept} className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Accept</button>
                                        <button type="button" onClick={reject} className="ml-4 inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Reject</button></>
                                ) : accepted == true ? (
                                    <>
                                        <button type="button" className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Accepted</button>
                                        <button type="button" onClick={reject} className="ml-4 inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Reject</button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" onClick={accept} className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Accept</button>
                                        <button type="button" className="ml-4 inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Rejected</button>
                                    </>
                                )
                            )
                        }
                        {/* If the type is user */}
                        {
                            type == 'user' && <div className='w-full border-x-2 border-t-2 rounded-sm border-purple-500 h-24 mb-4 px-4 py-2  overflow-y-scroll text-black'>
                                <div className="flex flex-wrap">
                                    <p className='font-bold '>About Job: <span className="italic font-thin">{request.job.jobDescription}</span></p>
                                </div>
                                <div className="flex flex-wrap">
                                    <p className='font-bold '>Benefits: <span className="italic font-thin">{request.job.benefits}</span></p>
                                </div>
                                <div className="flex flex-wrap">
                                    <p className='font-bold '>Qualifications: <span className="italic font-thin">{request.job.jobQualification}</span></p>
                                </div>
                            </div>
                        }
                        {
                            type == 'user' && !userChangeRequest && (
                                accepted == null ? (
                                    <>
                                        <button type="button" onClick={acceptByUser} className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Accept</button>
                                        <button type="button" onClick={rejectByUser} className="ml-4 mr-4 inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Reject</button></>
                                ) : accepted == true ? (
                                    <>
                                        <button type="button" className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Accepted</button>
                                        <button type="button" onClick={rejectByUser} className="ml-4 mr-4 inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Reject</button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" onClick={acceptByUser} className="inline-block px-4 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Accept</button>
                                        <button type="button" className="ml-4 mr-4 inline-block px-3.5 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Rejected</button>
                                    </>
                                )
                            )
                        }
                        {
                            request.type != "hired" && type == 'user' && userChangeRequest &&
                            <button type="button" className="inline-block px-3.5 py-1 border-2 bg-purple-600 border-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Requested to change the time</button>
                        }
                        {
                            request.type != "hired" && type == 'user' && !userChangeRequest &&
                            <button type="button" onClick={requestToChangeTime} className="inline-block px-3.5 py-1 border-2 bg-purple-600 border-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Request to Change the time</button>
                        }
                        {
                            type == 'companyAdmin' && request.userRequestToChange && !reSchedule && !reScheduled &&
                            < button type="button" onClick={scheduleNewTime} className="ml-4 inline-block px-3.5 py-1 border-2 bg-purple-600 border-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Change Scheduled time</button>
                        }
                        {
                            type == 'companyAdmin' && request.userRequestToChange && reSchedule && reScheduled &&
                            < button type="button" className="ml-4 inline-block px-3.5 py-1 border-2 bg-purple-600 border-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Re scheduled the interview</button>
                        }
                        {
                            type == 'companyAdmin' && request.type == 'online' && reSchedule && !reScheduled &&
                            <div className="py-8 border-b border-indigo-50">
                                <div className="flex gap-4">
                                    <div className="flex flex-col w-2/4">
                                        <label htmlFor="date" className="lowercase text-purple-600">Choose the date</label>
                                        <input name="onlineInterviewDate" type="date" value={onlineInterviewDate} onChange={(e) => setOnlineInterviewDate(e.target.value)} className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                    </div>
                                    <div className="flex flex-col w-2/4">
                                        <label htmlFor="time" className="lowercase text-purple-600">Choose the time</label>
                                        <input name="onlineInterviewTime" type="time" value={onlineInterviewTime} onChange={(e) => setOnlineInterviewTime(e.target.value)} className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                    </div>
                                </div>
                                < button type="button" onClick={() => updateSchedule({ onlineInterviewDate, onlineInterviewTime })} className="mt-4 inline-block px-3.5 py-1 border-2 bg-purple-600 border-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Update</button>
                            </div>
                        }
                        {
                            type == 'companyAdmin' && request.type == 'offline' && reSchedule && !reScheduled &&
                            <div className="py-8 border-b border-indigo-50">
                                <div className="flex gap-4">
                                    <div className="flex flex-col w-2/4">
                                        <label htmlFor="date" className="uppercase text-indigo-900">Choose the date</label>
                                        <input name="offlineInterviewDate" value={offlineInterviewDate} onChange={(e) => setOfflineInterviewDate(e.target.value)} type="date" className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                    </div>
                                    <div className="flex flex-col w-2/4">
                                        <label htmlFor="time" className="uppercase text-indigo-900">Choose the time</label>
                                        <input name="offlineInterviewTime" value={offlineInterviewTime} onChange={(e) => setOfflineInterviewTime(e.target.value)} type="time" className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full mt-4">
                                    <label htmlFor="location" className="uppercase text-indigo-900">Mention the location</label>
                                    <input name="offlineInterviewPlace" value={offlineInterviewPlace} onChange={(e) => setOfflineInterviewPlace(e.target.value)} type="text" placeholder="Specify the location where the interview is gonna happen" className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                </div>
                                < button type="button" onClick={() => updateSchedule({ offlineInterviewDate, offlineInterviewTime, offlineInterviewPlace })} className="mt-4 inline-block px-3.5 py-1 border-2 bg-purple-600 border-purple-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">Update</button>
                            </div>
                        }
                    </div>
                </div>
            </li>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </ol>
    )
}