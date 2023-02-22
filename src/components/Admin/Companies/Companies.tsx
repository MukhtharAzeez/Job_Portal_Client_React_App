import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCompanies, getCountCompanies } from '../../../api/Admin/get';

interface Props {
    url: string
}
interface Company {
    _id: string,
    company: string,
    establishedOn: string,
    email: string,
    panCardNumber: number,
    approved: boolean,
    type: string
}

export function Companies({ url }: Props) {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])
    const [count, setCount] = useState<number>(1)

    async function fetchData(skip: number) {
        const companies = await getAllCompanies(skip, 10);
        setCompanies(companies.data)
    }

    async function fetcher(skip: number) {
        if (skip == 0) {
            const data = await getCountCompanies()
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
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">All Companies</h2>
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
                                    <div className="font-semibold text-center">Established</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Email</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Type</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Pan Card No.</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Status</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100">
                            {
                                companies.map(function (company: Company) {
                                    return (
                                        <tr key={company._id}>
                                            <td className="p-2">
                                                <div onClick={() => navigate(url, { state: { companyId: company._id } })} className="flex items-center">
                                                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                        <circle fill="#24292E" cx="18" cy="18" r="18" />
                                                        <path d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" fill="#FFF" />
                                                    </svg>
                                                    <div className="text-slate-800">{company.company}</div>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center">{company.establishedOn}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-sky-500">{company.email}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center">{company.type}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-green-500">{company.panCardNumber}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center">{company.approved ? 'Approved' : 'Not Approved'}</div>
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



