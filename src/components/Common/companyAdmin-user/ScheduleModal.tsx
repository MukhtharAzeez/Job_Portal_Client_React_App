import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    openModal: boolean,
    time: any,
    type: string,
    userType: string,
    applicantId: string
}

export function ScheduleModal({ setOpenModal, openModal, time, type, userType, applicantId }: Props) {
    const navigate = useNavigate()

    function setClose() {
        setOpenModal(false)
    }
    function startOnlineInterview() {
        navigate("/video-call",{state:{applicantId:applicantId}})
    }
    return (
        openModal ? <>
            <div className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="rounded-lg bg-white shadow-lg p-16">
                    <div className="flex justify-end text-indigo-800 cursor-pointer">
                        <CloseIcon onClick={setClose} />
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
                        <h1 className="text-purple-900 font-bold text-2xl">Details of the Schedule</h1>
                    </div>
                    <div className="flex justify-center mt-8">
                        {type} Interview at {time instanceof Date && time.toLocaleTimeString()}
                    </div>
                    {type == 'online' && time <= Date.now() && userType == 'admin' &&
                        <button type="button" onClick={startOnlineInterview} className="ml-6 px-8 py-3 text-white bg-indigo-900 rounded focus:outline-none" >Start Online Interview</button>
                    }
                    {type == 'online' && time > Date.now() && userType == 'admin' &&
                        <button type="button" className="ml-6 px-8 py-3 text-white bg-red-300 rounded focus:outline-none" >Start Online Interview</button>
                    }
                    {type == 'online' && time <= Date.now() && userType == 'user' &&
                        <button type="button" onClick={startOnlineInterview} className="ml-6 px-8 py-3 text-white bg-indigo-900 rounded focus:outline-none" >Join Online Interview</button>
                    }
                    {type == 'online' && time > Date.now() && userType == 'user' &&
                        <button type="button" className="ml-6 px-8 py-3 text-white bg-red-300 rounded focus:outline-none">Join Online Interview</button>
                    }
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> : null
    )
}