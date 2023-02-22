import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { acceptApplicant } from "../../../api/Company-Admin/post";
import { rejectApplicant } from "../../../api/Company-Admin/get";
import { currentCompanyAdmin } from "../../../redux/company-admin/CompanyAdminAuthSlicer";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ScheduleInterview({ scheduleInterview, setScheduleInterview, jobId, applicantId, accepted, setAccepted, online, offline }: any) {
    const navigate = useNavigate()
    const { companyAdminId, companyId } = useSelector(currentCompanyAdmin)
    const [onlineInterview, setOnlineInterview] = useState(true)
    const [offlineInterview, setOfflineInterview] = useState(false)
    const [directHire, setDirectHire] = useState(false)
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

    async function handleClose() {
        if(offline && online){
            await rejectApplicant(jobId, applicantId)
        }
        setScheduleInterview(false)
        setAccepted(accepted)
    }

    function handleOnlineInterview() {
        setOfflineInterview(false)
        setDirectHire(false)
        setOnlineInterview(true)
    }
    function handleOfflineInterview() {
        setOnlineInterview(false)
        setDirectHire(false)
        setOfflineInterview(true)
    }
    function handleDirectHire() {
        setOfflineInterview(false)
        setOnlineInterview(false)
        setDirectHire(true)
    }

    function goBack(){
        navigate("/company-admin/jobs/jobs-details",{state:{jobId:jobId}})
    }

    async function handleSchedule() {
        if (onlineInterview) {
            try {
                await acceptApplicant({ onlineInterviewDate, onlineInterviewTime }, jobId, applicantId, companyAdminId, companyId)
                setScheduleInterview(false)
                goBack()
            } catch (error: any) {
                const type = typeof error.response.data.message;
                if (type == "string") {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.response.data.message[0]);
                }
                setOpen(true);
            }
            return
        }
        if (offlineInterview) {
            try {
                await acceptApplicant({ offlineInterviewDate, offlineInterviewTime, offlineInterviewPlace }, jobId, applicantId, companyAdminId, companyId)
                setScheduleInterview(false)
                goBack()
            } catch (error: any) {
                const type = typeof error.response.data.message;
                if (type == "string") {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.response.data.message[0]);
                }
                setOpen(true);
            }
            return
        }
        try {
            await acceptApplicant({ directHire: true }, jobId, applicantId, companyAdminId, companyId)
            setScheduleInterview(false)
            goBack()
        } catch (error: any) {
            const type = typeof error.response.data.message;
            if (type == "string") {
                setMessage(error.response.data.message);
            } else {
                setMessage(error.response.data.message[0]);
            }
            setOpen(true);
        }
        return
    }

    return (
        <div>
            {scheduleInterview ? (
                <>
                    <div className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="rounded-lg bg-white shadow-lg p-16 h-[600px]">
                            <div className="flex justify-end text-indigo-800 cursor-pointer">
                                <CloseIcon onClick={handleClose} />
                            </div>
                            <div className="flex justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-indigo-800"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                </svg>
                            </div>
                            <div className="text-center mt-2">
                                <h1 className="text-purple-900 font-bold text-2xl">Set up Hiring Procedures</h1>
                                <p className="text-gray-500 mt-3">
                                    You can set up the hiring procedures if you have enough authority and you can choose any one of the following
                                </p>
                                <div className="mt-6">
                                    <ul
                                        className="flex justify-center space-x-6 text-indigo-800 border-b border-purple-50"
                                    >
                                        {online && <li onClick={handleOnlineInterview} className={onlineInterview ? "border-b-2 pb-3 border-indigo-600 cursor-pointer" : 'cursor-pointer'}>Schedule online Interview</li>}
                                        {offline && <li onClick={handleOfflineInterview} className={offlineInterview ? "border-b-2 pb-3 border-indigo-600 cursor-pointer" : 'cursor-pointer'}>Schedule offline Interview</li>}
                                        <li onClick={handleDirectHire} className={directHire ? "border-b-2 pb-3 border-indigo-600 cursor-pointer" : 'cursor-pointer'}>Direct Hire</li>
                                    </ul>
                                </div>
                                {
                                    onlineInterview && online  ? (
                                        <div className="py-8 border-b border-indigo-50">
                                            <div className="flex gap-4">
                                                <div className="flex flex-col w-2/4">
                                                    <label htmlFor="date" className="uppercase text-indigo-900">Choose the date</label>
                                                    <input name="onlineInterviewDate" value={onlineInterviewDate} onChange={(e) => setOnlineInterviewDate(e.target.value)} type="date" className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                                </div>
                                                <div className="flex flex-col w-2/4">
                                                    <label htmlFor="time" className="uppercase text-indigo-900">Choose the time</label>
                                                    <input name="onlineInterviewTime" value={onlineInterviewTime} onChange={(e) => setOnlineInterviewTime(e.target.value)} type="time" className="border-indigo-400 rounded focus:border-indigo-600 focus:rounded" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''
                                }
                                {
                                    offlineInterview && offline ? (
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
                                        </div>
                                    ) : ''
                                }
                                {
                                    directHire ? (
                                        <div className="py-8 border-b border-indigo-50">
                                            <div className="gap-4">
                                                You can Directly Hire the Applicant if you have the authority <br />
                                                Otherwise you have to wait until the page owner accept your request
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>
                            <div className="flex justify-center mt-8">
                                <button onClick={handleSchedule} className="text-white py-2 px-4 rounded-lg bg-purple-900 hover:bg-purple-800 shadow-md font-medium transition-colors">
                                    {directHire ? 'Hire' : online || offline ? 'Schedule' : ''}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : (
                <></>
            )}
            <Snackbar open={open} autoHideDuration={1000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
