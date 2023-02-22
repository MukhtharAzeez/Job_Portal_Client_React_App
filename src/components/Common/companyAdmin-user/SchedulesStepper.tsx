import React, { useEffect, useState } from 'react'
import { setAScheduleAsCompleted } from '../../../api/Company-Admin/get'
import { ScheduleInterview } from '../../Company-admin'
interface Props {
    data: {
        _id: string,
        companyId: string,
        jobId: {
            _id: string
            job: string
        },
        applicantId: {
            _id: string,
            firstName: string,
            lastName: string
        },
        accepted: boolean,
        createdAt: Date,
        updatedAt: Date,
        online: {
            date: string,
            time: string,
            completed: boolean,
            companyApproved: boolean,
            userAccepted: boolean,
            scheduledAdmin: string,
            scheduledAt: number
        },
        offline: {
            date: string,
            time: string,
            place: string,
            completed: boolean,
            companyApproved: boolean,
            userAccepted: boolean,
            scheduledAdmin: string,
            scheduledAt: number
        },
        hired: {
            hire: boolean,
            companyApproved: boolean,
            userAccepted: boolean,
            hireAdmin: string,
            scheduledAt: number
        },
    }
}

export function SchedulesStepper({ data }: Props) {
    const [moveToNextAction, setMoveToNextAction] = useState(false)
    const [applicantHired, setApplicantHired] = useState(false)
    const [scheduleInterview, setScheduleInterview] = useState(false)
    const [online, setOnline] = useState(true)
    const [offline, setOffline] = useState(true)
    const [accepted, setAccepted] = useState(true)
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (data?.online?.scheduledAt < data?.offline?.scheduledAt || !data?.offline) {
            if (data?.offline?.companyApproved && data?.offline?.userAccepted && data?.offline?.completed) {
                setMoveToNextAction(true)
                setOffline(false)
            }
        }
        if (data?.online && !data?.offline) {
            if (data?.online?.companyApproved && data?.online?.userAccepted && data?.online?.completed) {
                setMoveToNextAction(true)
                setOnline(false)
            }
        }
        if (!data?.online && data?.offline) {
            if (data?.offline?.companyApproved && data?.offline?.userAccepted && data?.offline?.completed) {
                setMoveToNextAction(true)
                setOffline(false)
            }
        }
        if (data?.online && data?.offline && data?.online?.scheduledAt < data?.offline?.scheduledAt) {
            if (data?.offline?.companyApproved && data?.offline?.userAccepted && data?.offline?.completed) {
                setMoveToNextAction(true)
                setOnline(false)
                setOffline(false)
            } else {
                setMoveToNextAction(false)
            }
        } else if (data?.online && data?.offline && data?.online?.scheduledAt > data?.offline?.scheduledAt) {
            if (data?.offline?.companyApproved && data?.offline?.userAccepted && data?.offline?.completed) {
                setMoveToNextAction(true)
                setOnline(false)
                setOffline(false)
            } else {
                setMoveToNextAction(false)
            }
        }
        if (data?.online?.scheduledAt > data?.offline?.scheduledAt || !data?.online) {
            if (data?.online?.companyApproved && data?.online?.userAccepted && data?.online?.completed) {
                setMoveToNextAction(true)
                setOffline(false)
            } else {
                setMoveToNextAction(false)
            }
        }
        if (data?.hired) {
            setMoveToNextAction(false)
        }
        if (data?.hired?.hire && data?.hired?.companyApproved && data?.hired?.userAccepted) {
            setApplicantHired(true)
        }
    }, [])

    async function setAsCompleted(type: string) {
        await setAScheduleAsCompleted(type, data.applicantId._id, data.jobId._id)
        setCompleted(true)
        setMoveToNextAction(true)
        if (type == 'online') {
            setOnline(false)
        } else if (type == 'offline') {
            setOffline(false)
        }
    }

    return (
        <div className="bg-white border rounded-md p-5 px-10">
            <section className="max-w-5xl mx-auto py-10">
                <div>
                    {
                        data?.online?.scheduledAt < data?.offline?.scheduledAt || !data?.offline?.scheduledAt ? (
                            <>
                                <div className="flex flex-row">
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                                            <div className="text-xl font-black text-gray-500">Action-1</div>
                                            <div className="text-gray-500 text-sm text-center">Online Interview</div>
                                        </div>
                                        <div className="h-full border-l-4 border-transparent">
                                            <div className={`border-l-4 mr-4 h-full ${data?.offline || data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed`}></div>
                                        </div>
                                    </div>
                                    <div className="flex-auto border rounded  border-gray-300">
                                        <div className="flex md:flex-row flex-col items-center">
                                            <div className="flex-auto">
                                                <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Action-1</span> - Online Interview</div>
                                                <div className="p-3 text-3xl text-gray-800 font uppercase">Online Interview</div>
                                                <div className="px-3 pb-1">Scheduled an online interview on {data.online.date} at {data.online.time}</div>
                                                <div className="px-3 pb-1 flex ">{data.online.companyApproved ? <p className="text-green-600">Company Approved</p> : <p className="text-red-600">Company not approved Yet</p>}</div>
                                                <div className="px-3 pb-1 flex">{data.online.userAccepted ? <p className="text-green-600">Applicant Accepted</p> : <p className="text-red-600">Applicant not accepted Yet</p>}</div>
                                                <div className="px-3 pb-1 flex">{data.online.completed || completed ? <p className="text-green-600">Online interview Completed</p> : <p className="text-red-600">Online interview not Completed</p>}</div>
                                            </div>
                                        </div>
                                        {
                                            data.online.companyApproved && data.online.userAccepted && (
                                                <div className="w-full justify-end flex p-2">
                                                    {
                                                        data.online.completed || completed ? (
                                                            <div className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                Completed
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => setAsCompleted('online')} className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                Mark as Completed
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex items-start flex-row">
                                    <div className="border-t-4 border-r-4 border-transparent">
                                        <div className={`w-16 ml-16 h-16 border-l-4 ${data?.offline || data?.hired ? 'border-purple-800' : 'border-gray-300'} border-dashed border-b-4 rounded-bl-full`}></div>
                                    </div>
                                    <div className="border-t-4 border-transparent flex-auto">
                                        <div className={`h-16 border-b-4 ${data?.offline || data?.hired ? 'border-purple-800' : 'border-gray-300'} border-dashed`}></div>
                                    </div>
                                    <div className={`w-16 mt-16 mr-16 h-16 border-r-4 ${data?.offline || data?.hired ? 'border-purple-800' : 'border-gray-300'} border-dashed border-t-4 rounded-tr-full`}></div>
                                </div>
                                {
                                    data.offline &&
                                    <>
                                        <div className="flex flex-row-reverse">
                                            <div className="hidden md:flex flex-col items-center">
                                                <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                                                    <div className="text-xl font-black text-gray-500">Action-2</div>
                                                    <div className="text-gray-500 text-sm text-center">Offline Interview</div>
                                                </div>
                                                <div className="h-full border-r-4 border-transparent">
                                                    <div className={`border-l-4 ml-4 h-full ${data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed`}></div>
                                                </div>
                                            </div>
                                            <div className="flex-auto border rounded  border-gray-300">
                                                <div className="flex md:flex-row flex-col items-center">
                                                    <div className="flex-auto">
                                                        <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Action-2</span> - Offline Interview</div>
                                                        <div className="p-3 text-3xl text-gray-800 font uppercase">Offline Interview</div>
                                                        <div className="px-3 pb-1">Scheduled an offline interview on {data.offline.date} {data.offline.time} at {data.offline.place}</div>
                                                        <div className="px-3 pb-1 flex ">{data.offline.companyApproved ? <p className="text-green-500">Company approved</p> : <p className="text-red-500">Company not approved Yet</p>}</div>
                                                        <div className="px-3 pb-1 flex">{data.offline.userAccepted ? <p className="text-green-500">User Accepted</p> : <p className="text-red-500">User not accepted Yet</p>}</div>
                                                        <div className="px-3 pb-1 flex">{data.offline.completed || completed ? <p className="text-green-500">Offline interview completed</p> : <p className="text-red-500">Offline interview not completed</p>}</div>
                                                    </div>
                                                </div>
                                                {
                                                    data.offline.companyApproved && data.offline.userAccepted && (
                                                        <div className="w-full justify-end flex p-2">
                                                            {
                                                                data.offline.completed || completed ? (
                                                                    <div className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                        Completed
                                                                    </div>
                                                                ) : (
                                                                    <div onClick={() => setAsCompleted('offline')} className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                        Mark as Completed
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        ) : (
                            <>
                                <div className="flex flex-row">
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                                            <div className="text-xl font-black text-gray-500">Action-1</div>
                                            <div className="text-gray-500 text-sm text-center">Offline Interview</div>
                                        </div>
                                        <div className="h-full border-l-4 border-transparent">
                                            <div className={`border-l-4 mr-4 h-full ${data?.online || data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed`}></div>
                                        </div>
                                    </div>
                                    <div className="flex-auto border rounded  border-gray-300">
                                        <div className="flex md:flex-row flex-col items-center">
                                            <div className="flex-auto">
                                                <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Action-1</span> - Offline Interview</div>
                                                <div className="p-3 text-3xl text-gray-800 font uppercase">Offline Interview</div>
                                                <div className="px-3 pb-1">Scheduled an offline interview on {data.offline.date} {data.offline.time} at {data.offline.place}</div>
                                                <div className="px-3 pb-1">Scheduled an offline interview on {data.offline.date} {data.offline.time} at {data.offline.place}</div>
                                                <div className="px-3 pb-1 flex ">{data.offline.companyApproved ? <p className="text-green-500">Company approved</p> : <p className="text-red-500">Company not approved Yet</p>}</div>
                                                <div className="px-3 pb-1 flex">{data.offline.userAccepted ? <p className="text-green-500">User Accepted</p> : <p className="text-red-500">User not accepted Yet</p>}</div>
                                                <div className="px-3 pb-1 flex">{data.offline.completed || completed ? <p className="text-green-500">Offline interview completed</p> : <p className="text-red-500">Offline interview not completed</p>}</div>
                                            </div>
                                        </div>
                                        {
                                            data.offline.companyApproved && data.offline.userAccepted && (
                                                <div className="w-full justify-end flex p-2">
                                                    {
                                                        data.offline.completed || completed ? (
                                                            <div className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                Completed
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => setAsCompleted('offline')} className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                Mark as Completed
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex items-start flex-row">
                                    <div className="border-t-4 border-r-4 border-transparent">
                                        <div className={`w-16 ml-16 h-16 border-l-4 ${data?.online || data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed border-b-4 rounded-bl-full`}></div>
                                    </div>
                                    <div className="border-t-4 border-transparent flex-auto">
                                        <div className={`h-16 border-b-4 ${data?.online || data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed`}></div>
                                    </div>
                                    <div className={`w-16 mt-16 mr-16 h-16 border-r-4 ${data?.online || data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed border-t-4 rounded-tr-full`}></div>
                                </div>
                                {
                                    data?.online &&
                                    <>
                                        <div className="flex flex-row-reverse">
                                            <div className="hidden md:flex flex-col items-center">
                                                <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                                                    <div className="text-xl font-black text-gray-500">Action-2</div>
                                                    <div className="text-gray-500 text-sm text-center">Online Interview</div>
                                                </div>
                                                <div className="h-full border-r-4 border-transparent">
                                                    <div className={`border-l-4 ml-4 h-full ${data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed`}></div>
                                                </div>
                                            </div>
                                            <div className="flex-auto border rounded  border-gray-300">
                                                <div className="flex md:flex-row flex-col items-center">
                                                    <div className="flex-auto">
                                                        <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Action-2</span> - Online Interview</div>
                                                        <div className="p-3 text-3xl text-gray-800 font uppercase">Online Interview</div>
                                                        <div className="px-3 pb-1">Scheduled an online interview on {data.online.date} at {data.online.time}</div>
                                                        <div className="px-3 pb-1 flex ">{data.online.companyApproved ? <p className="text-green-500">Company Approved</p> : <p className="text-red-500">Company not approved Yet</p>}</div>
                                                        <div className="px-3 pb-1 flex">{data.online.userAccepted ? <p className="text-green-500">Applicant Accepted</p> : <p className="text-red-500">Applicant not accepted Yet</p>}</div>
                                                        <div className="px-3 pb-1 flex">{data.online.completed ? <p className="text-green-500">Online interview Completed</p> : <p className="text-red-500">Online interview not Completed</p>}</div>
                                                    </div>
                                                </div>
                                                {
                                                    data.online.companyApproved && data.online.userAccepted && (
                                                        <div className="w-full justify-end flex p-2">
                                                            {
                                                                data.online.completed ? (
                                                                    <div className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                        Completed
                                                                    </div>
                                                                ) : (
                                                                    <div onClick={() => setAsCompleted('online')} className="py-1 px-2 rounded-lg border cursor-pointer bg-purple-800 hover:bg-transparent hover:border-purple-800 text-gray-200 hover:text-black">
                                                                        Mark as Completed
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        )
                    }
                    {
                        data?.online && data?.offline && <div className="flex items-start flex-row-reverse">
                            <div className="border-t-4 border-l-4 border-transparent">
                                <div className={`w-16 mr-16 h-16 border-r-4 ${data?.hired ? 'border-purple-800' : 'border-gray-300'}  border-dashed border-b-4 rounded-br-full`}></div>
                            </div>
                            <div className="border-t-4 border-transparent flex-auto">
                                <div className={`h-16 border-b-4 ${data?.hired ? 'border-purple-800' : 'border-gray-300'} border-dashed`}></div>
                            </div>
                            <div className={`w-16 mt-16 ml-16 h-16 border-l-4 ${data?.hired ? 'border-purple-800' : 'border-gray-300'} border-dashed border-t-4 rounded-tl-full`}></div>
                        </div>
                    }
                    {
                        data?.hired &&
                        <div className="flex flex-row">
                            <div className="hidden md:flex flex-col items-center">
                                <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                                    <div className="text-xl font-black text-gray-500 text-center">Final Action</div>
                                    <div className="text-gray-500 text-sm text-center">Hire Applicant</div>
                                </div>
                            </div>
                            <div className="flex-auto border rounded  border-gray-300">
                                <div className="flex md:flex-row flex-col items-center">
                                    <div className="flex-auto">
                                        <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Final Action</span> - Hiring</div>
                                        <div className="p-3 text-3xl text-gray-800 font uppercase">Hire Applicant </div>
                                        <div className="px-3 pb-1">Hire the applicant <span className="text-purple-800">{data.applicantId.firstName + " " + data.applicantId.lastName}</span> as {data.jobId.job}</div>
                                        <div className="px-3 pb-1 flex ">{data.hired.companyApproved ? <p className="text-green-500">Company Approved To Hire</p> : <p className="text-red-500">Company not approved Yet</p>}</div>
                                        <div className="px-3 pb-1 flex">{data.hired.userAccepted ? <p className="text-green-500">User accepted the Offer</p> : <p className="text-red-500">User not accepted the offer Yet</p>}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
            {
                moveToNextAction && <div className="w-full flex justify-end">
                    <div className='bg-purple-800 px-4 py-2 text-gray-100 rounded-md cursor-pointer' onClick={() => setScheduleInterview(true)}>
                        Move To Next Action
                    </div>
                </div>
            }
            {
                applicantHired && <div className="w-full flex justify-end">
                    <div className='bg-purple-800 px-4 py-2 text-gray-100 rounded-md cursor-pointer'>
                        You Hired this applicant {data.applicantId.firstName + " " + data.applicantId.lastName} as {data.jobId.job}
                    </div>
                </div>
            }
            <ScheduleInterview scheduleInterview={scheduleInterview} setScheduleInterview={setScheduleInterview} jobId={data.jobId._id} applicantId={data.applicantId._id} accepted={accepted} setAccepted={setAccepted} online={online} offline={offline} />
        </div>
    )
}