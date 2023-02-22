import React, { useEffect, useState } from 'react';
import { Pagination, Tooltip } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getAllAppliedJobs, getCountAppliedJobs } from '../../../api/User/Get/user';
import { currentUser } from '../../../redux/user/userAuthSlicer';

interface Job {
    _id:string
    jobId: {
        image: string
        job: string
    }
    companyId: {
        company: string
    }
    createdAt: Date
    accepted: boolean
}

export function AppliedJobs() {
    const { userId } = useSelector(currentUser)
    const [appliedJobs, setAppliedJobs] = useState([])
    const [count, setCount] = useState<number>(1)
    const [row, setRow] = useState(10)
    const [skip, setSkip]= useState(0)
    async function fetchData(skip: number) {
        if(userId){
            const appliedJobs = await getAllAppliedJobs(userId, skip, row);
            setAppliedJobs(appliedJobs)
        }
    }
    async function fetcher(skip: number) {
        if (skip == 0) {
            const data = await getCountAppliedJobs()
            let int = data / row
            int = Math.ceil(int)
            console.log(int)
            setCount(int)
        }
        fetchData(skip);
    }
    useEffect(() => {
        if(row>=0){
            fetcher(skip);
        }
    }, [row,skip]);

    function handleRowNumberChange(e:any){
        if(e.keyCode==13){
            setRow(e.target.value)
        }
    }
    async function handleChange(event: any, value: number) {
        setSkip(value-1)
    };
    return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">All Applied Jobs</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Company</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Job</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Applied On</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Status</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100">
                            {
                                appliedJobs.map(function (jobs: Job) {
                                    console.log(jobs.createdAt)
                                    return (
                                        <tr key={jobs._id}>
                                            <td className="p-2">
                                                {/* <Link href={{ pathname: url, query: { companyId: company._id } }}> */}
                                                <div className="flex items-center w-11 h-11">
                                                    <img src={jobs?.jobId?.image} alt="" className='rounded-lg mr-2' />
                                                    <div className="text-slate-800">{jobs?.companyId?.company}</div>
                                                </div>
                                                {/* </Link> */}
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-slate-800">{jobs?.jobId?.job}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-slate-800">{moment(jobs?.createdAt).format('D MMM YYYY')}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className={`text-center ${jobs?.accepted ? 'text-green-800' : 'text-red-800'}`}>{jobs.accepted ? 'Accepted' : jobs.accepted == null ? 'Not accepted Yet' : 'Rejected'}</div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gray-800 flex flex-col justify-center items-center">
                <Pagination className="p-4" count={count} onChange={handleChange} variant="outlined" shape="rounded" />
                <div
                    className="mb-2 mx-auto border-2 w-4/12 justify-center flex items-center rounded-md shadow-md">
                    <div>
                        <button type="submit"
                            className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-8 text-white ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full">
                        <Tooltip title="Press enter key after type">
                            <input type="number"
                                className="w-full px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                                placeholder="Select Rows" onKeyDown={handleRowNumberChange}/>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}