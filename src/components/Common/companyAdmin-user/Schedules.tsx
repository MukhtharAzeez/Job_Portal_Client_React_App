import { Alert, Snackbar } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPendingSchedules } from '../../../api/Company-Admin/get';
import { getUserSchedules } from '../../../api/User/Get/user';
import { currentCompanyAdmin } from '../../../redux/company-admin/CompanyAdminAuthSlicer';
import { currentUser } from '../../../redux/user/userAuthSlicer';
import { ScheduleModal } from './ScheduleModal';

interface Schedule {
    applicantId: string,
    jobId: string,
    type: string,
    data: {
        companyApproved: boolean,
        completed: boolean,
        date: string,
        scheduledAdmin: string,
        scheduledAt: number,
        time: string,
        userAccepted: boolean
    }
}

interface Data {
    _id: string,
    objects: Array<Schedule>
}

export function Schedules() {
    const { userId } = useSelector(currentUser)
    const { companyId } = useSelector(currentCompanyAdmin)
    const [data, setData] = useState([])
    const [month, setMonth] = useState(new Date())
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [openModal, setOpenModal] = useState(false);
    const [currentScheduleTime, setCurrentScheduleTime] = useState<Date>()
    const [currentScheduleType, setCurrentScheduleType] = useState('')
    const [applicantId, setApplicantId] = useState('')

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    async function fetcher() {
        setIsLoading(true)
        try {
            if (userId) {
                const getUserSchedule = await getUserSchedules(userId, month);
                setData(getUserSchedule)
            } else if (companyId) {
                const getUserSchedule = await getPendingSchedules(companyId, month);
                setData(getUserSchedule)
            }
        } catch (error) {
            setMessage("Something Happened Please try again")
            setOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetcher()
    }, [])


    function subtractMonths(date: Date, months: number) {
        date.setMonth(date.getMonth() - months);
        return date;
    }
    function addMonths(date: Date, months: number) {
        date.setMonth(date.getMonth() + months);
        return date;
    }

    async function handlePreviousSchedules() {
        if (month.getFullYear() === new Date().getFullYear() && month.getMonth() === new Date().getMonth()) {
            setMessage("You can only see pending schedules")
            setOpen(true)
            return
        }
        setMonth(subtractMonths(month, 1))
        fetcher()
    }

    async function handleNextSchedules() {
        setMonth(addMonths(month, 1))
        fetcher()
    }

    function handleView(time: Date, scheduleType: string, applicantId: string) {
        setCurrentScheduleTime(time)
        setCurrentScheduleType(scheduleType)
        setApplicantId(applicantId)
        setOpenModal(true)
    }
    return (
        <div className="text-gray-700 ">
            <div className="flex flex-grow  overflow-auto">
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center mt-4">
                        <div className="flex ml-6">
                            <button className="cursor-pointer" onClick={handlePreviousSchedules}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="cursor-pointer" onClick={handleNextSchedules}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="ml-2 text-xl font-bold leading-none">{moment(month).format('MMMM YYYY')}</h2>
                    </div>
                    <div className={`flex flex-row flex-wrap w-full h-auto gap-2 mt-1 bg-slate-400 pr-2 justify-center pt-4 pb-4 ${!data.length && 'min-h-[80vh]'}`}>
                        {
                            isLoading ? (
                                <div className="">
                                    <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
                                </div>
                            ) : data.length == 0 ? (
                                <section className="flex items-center h-full sm:p-16 dark:bg-transparent dark:text-gray-100">
                                    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
                                            <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                            <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                            <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                                            <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                                        </svg>
                                        <p className="text-xl text-gray-800">{userId ? 'Looks like You do not have schedules in this month' : companyId ? 'Looks like There is no Pending schedules in this month' : ''}</p>
                                    </div>
                                </section>
                            ) : (
                                data.map((group: Data, index: number) => {
                                    const date = new Date(group._id)
                                    return (
                                        <>
                                            <div key={index} className="w-[240px] flex flex-col justify-center items-center border-purple-800 bg-white ml-2 p-4 rounded-md border max-h-60 overflow-scroll">
                                                <span className="mx-2 my-1 text-sm font-bold ">{monthNames[date.getMonth()]} {date.getDate()}</span>
                                                <div className="">
                                                    {
                                                        group.objects.map((schedule: Schedule) => {
                                                            const time = new Date(group._id + ' ' + schedule.data.time)
                                                            return (
                                                                <div key={schedule.applicantId} onClick={() => handleView(time, schedule.type, schedule.applicantId)} className="cursor-pointer text-center px-1 text-xs p-4 hover:bg-purple-100 rounded-md overflow-scroll scrollbar-hide">
                                                                    <span className="font-light leading-none">{time.toLocaleTimeString()}</span>
                                                                    <br />
                                                                    <span className=" font-medium">{schedule.type} Interview</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                })

                            )
                        }
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <ScheduleModal setOpenModal={setOpenModal} openModal={openModal} time={currentScheduleTime} type={currentScheduleType} userType={userId ? 'user' : 'admin'} applicantId={applicantId} />
        </div>
    )
}

