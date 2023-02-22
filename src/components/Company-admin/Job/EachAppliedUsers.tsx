import React, { useState } from 'react'
import { acceptApplicant, rejectApplicant } from '../../../api/Company-Admin/get';
import InfoIcon from '@mui/icons-material/Info';
import { ScheduleInterview } from './scheduleInterview';
import { useNavigate } from 'react-router-dom';

interface Job {
    jobId: string
    applicantId: {
        _id: string
        firstName: string
        lastName: string
        image: string
        mobile: string
        country: string
        city: string
        email: string
    }
    accepted: boolean
}

interface Props {
    job: Job
}

export function EachAppliedUsers({ job }: Props) {
    const navigate = useNavigate();
    const [scheduleInterview, setScheduleInterview] = useState(false)
    const [accepted, setAccepted] = useState(job.accepted)

    async function handleReject() {
        if (accepted == false) return
        await rejectApplicant(job.jobId, job.applicantId._id)
        setAccepted(false)
    }
    async function handleAccept() {
        if (accepted == true) return
        await acceptApplicant(job.jobId, job.applicantId._id)
        setScheduleInterview(true)
        setAccepted(true)
    }

    return (
        <tr>
            <td className="p-2">
                <div className="cursor-pointer"
                    onClick={() =>
                    navigate("/company-admin/jobs/jobs-details/applicant-profile",{state:{applicantId:job.applicantId._id}})
                    }>
                    <div className="flex items-center">
                        <img src={job.applicantId.image} alt="user" className="shrink-0 mr-2 sm:mr-3 rounded-full" width="36" height="36" />
                        <div>
                            <div className="text-slate-800">{job.applicantId.firstName + " " + job.applicantId.lastName}</div>
                            <div className="text-center text-gray-400">{job.applicantId.email}</div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="p-2">
                <div className="text-center">{job.applicantId.mobile}</div>
            </td>
            <td className="p-2">
                <div className="text-center">{job.applicantId.country}</div>
            </td>
            <td className="p-2">
                <div className="text-center">{job.applicantId.city}</div>
            </td>
            <td className="p-2 text-center">
                {accepted == null ? (
                    <><div className='text-green-800 cursor-pointer hover:text-green-600' onClick={handleAccept}>Accept</div>
                        <div className='text-red-800 cursor-pointer hover:text-red-400' onClick={handleReject}>Reject</div></>
                ) : accepted ? (
                    <><div className='text-green-800 cursor-pointer hover:text-green-600' >Accepted</div>
                        <div className='text-red-800 cursor-pointer hover:text-red-400' onClick={handleReject}>Reject</div></>
                ) :
                    (
                        <><div className='text-green-800 cursor-pointer hover:text-green-600' onClick={handleAccept}>Accept</div>
                            <div className='text-red-800 cursor-pointer hover:text-red-400'>Rejected</div></>
                    )
                }
            </td>
            {
                accepted && <td className="p-2">
                    <div onClick={() =>
                    navigate("/company-admin/jobs/jobs-details/userSchedules",{state:{applicantId:job.applicantId._id}})
                    } className="text-center cursor-pointer"><InfoIcon /></div>
                </td>
            }
            <ScheduleInterview scheduleInterview={scheduleInterview} setScheduleInterview={setScheduleInterview} jobId={job.jobId} applicantId={job.applicantId._id} accepted={job.accepted} setAccepted={setAccepted} online={true} offline={true} />
        </tr>
    )
}