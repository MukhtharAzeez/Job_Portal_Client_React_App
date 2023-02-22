import React, { useEffect, useState } from 'react';
import { getAllCompanyAdmins, getCountCompanyAdmins } from '../../../api/Company/get';
import { useSelector } from 'react-redux';
import { currentCompany } from '../../../redux/company/companyAuthSlicer';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CompanyAdmin {
    _id: string
    name: string
    position: string
    totalHiring: number
    totalRejections: number
    pendingHiring: number
}

export function Admins() {
    const navigate = useNavigate();
    const [companyAdmins, setCompanyAdmins] = useState([])
    const [count, setCount] = useState<number>(1)
    const { companyId } = useSelector(currentCompany)
    async function fetchData(skip:number) {
        const companyAdmins = await getAllCompanyAdmins(companyId, skip, 10);
        setCompanyAdmins(companyAdmins.data)
    }
    async function fetcher(skip:number) {
        if (skip == 0) {
            const data = await getCountCompanyAdmins(companyId)
            let int = data.data / 10
            int = Math.ceil(int)
            setCount(int)
        }
        fetchData(skip);
    }
    useEffect(() => {
        fetcher(0);
    }, []);
    async function handleChange(event: any, value: number) {
        fetcher(value - 1);
    };
    return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">All Admins</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Admin</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Position</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Total Hiring</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Total Rejections</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Pending Hiring</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100">
                            {
                                companyAdmins.map(function (admin: CompanyAdmin) {
                                    return (
                                        <tr key={admin._id}>
                                            <td className="p-2">
                                                <div className="cursor-pointer"
                                                    onClick={() =>
                                                    navigate("/company/admins/company-admin-profile",{state:{adminId: admin._id}})
                                                    }>
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                            <circle fill="#24292E" cx="18" cy="18" r="18" />
                                                            <path d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" fill="#FFF" />
                                                        </svg>
                                                        <div className="text-slate-800">{admin.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center">{admin.position}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-sky-500">{admin.totalHiring}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center">{admin.totalRejections}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-green-500">{admin.pendingHiring}</div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gray-800 flex justify-center ">
                <Pagination className="p-4" count={count} onChange={handleChange} variant="outlined" shape="rounded" />
            </div>
        </div>
    );
}