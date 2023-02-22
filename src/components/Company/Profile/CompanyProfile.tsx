import React, { useState } from 'react'
import useSWR from "swr";
import { getCompanyDetails, getCountCompanyAdmins } from '../../../api/Company/get';
import { Modal } from '@mui/material';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import { getAllCompanyAdmins } from '../../../api/Company/get'
import { Pagination } from '@mui/material';
import { sendMessageToFriend } from '../../../api/User/Post/user';
import { useSelector } from 'react-redux';
import { currentUser } from '../../../redux/user/userAuthSlicer';
import { useLocation, useNavigate } from 'react-router-dom';

interface CompanyAdmin {
    _id: string
    name: string
    position: string
    totalHiring: number
    totalRejections: number
    pendingHiring: number
}

export function CompanyProfile() {
    const navigate = useNavigate()
    const location = useLocation()
    const {companyId} = location.state
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [certificate, setCertificate] = useState('');
    const [representatives, setRepresentatives] = useState<any>([])
    const [representative, setRepresentative] = useState(false)
    const [count, setCount] = useState<number>(1)
    const {userId} = useSelector(currentUser)
    const fetcher = async () => {
        const companyDetails = await getCompanyDetails(companyId.toString());
        return companyDetails;
    };
    const { data, error, isLoading } = useSWR("companyDetails", fetcher);

    if (error) return <div>Error....</div>
    if (isLoading) return <div>Loading....</div>
    const handleOpen = (image: string, certificate: string) => {
        setImage(image)
        setCertificate(certificate)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    async function viewCompanyAdmins(skip: number) {
        const admins = await getAllCompanyAdmins(companyId, skip, 10);
        setRepresentatives(admins.data)
        setRepresentative(true)
    }
    async function fetchAdmins(skip: number) {
        if (skip == 0) {
            const data = await getCountCompanyAdmins(companyId)
            let int = data.data / 10
            int = Math.ceil(int)
            setCount(int)
        }
        viewCompanyAdmins(skip);
    }
    async function handleChange(event: any, value: number) {
        fetchAdmins(value - 1);
    };
    async function sendMessage(curUserId: any, userId: string) {
        await sendMessageToFriend(curUserId, userId,'company')
        navigate('/user/inbox')
    }
    return (
        <div className="p-8 bg-white shadow mt-14 rounded-l">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                    <div>
                        <p className="font-bold text-gray-700 text-xl">22</p>
                        <p className="text-gray-400">Hiring</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 text-xl">10</p>
                        <p className="text-gray-400">Jobs Posted</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 text-xl">89</p>
                        <p className="text-gray-400">Rejections</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <BusinessTwoToneIcon sx={{ fontSize: 80 }} />
                    </div>
                </div>
                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                    <button onClick={() => fetchAdmins(0)} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        Representatives
                    </button>
                </div>
            </div>
            <div className="flex justify-around">
                <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium text-gray-700">
                        {data.company}
                    </h1>
                    <p className="font-light text-gray-600 mt-3">{data.email}</p>
                    <p className="mt-8 text-gray-500">
                        PAN No. : {data.panCardNumber}
                    </p>
                    <p className="mt-8 text-gray-500">
                        GST No. : {data.gstNumber}
                    </p>
                    <p className="mt-8 text-gray-500">
                        CIN No. : {data.cinNumber}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8 cursor-pointer " onClick={() => handleOpen(data.msmeCertificate, 'MSME Certificate')}>
                    <div style={{
                        backgroundImage: `url(${data.msmeCertificate})`
                    }}
                        className="bg-gray-300 h-96 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                    <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                        <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">MSME Certificate</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8 cursor-pointer" onClick={() => handleOpen(data.udhyogAdhar, 'Udhyog Aadhar')}>
                    <div style={{
                        backgroundImage: `url(${data.udhyogAdhar})`
                    }}
                        className="bg-gray-300 h-96 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                    <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                        <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">Udhyog Aadhar</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8 cursor-pointer" onClick={() => handleOpen(data.fssaiLicense, 'FSSAI License')}>
                    <div style={{
                        backgroundImage: `url(${data.fssaiLicense})`
                    }}
                        className="bg-gray-300 h-96 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                    <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                        <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">FSSAI License</div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8 cursor-pointer">
                    <div style={{
                        backgroundImage: `url(${image})`
                    }}
                        className="bg-gray-300 h-[680px] w-full rounded-lg shadow-md bg-cover bg-center"></div>
                    <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                        <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">{certificate}</div>
                    </div>
                </div>
            </Modal>
            {
                representative && <div className="border-indigo-800 justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="flex md:flex-row flex-col items-start justify-center px-6 py-8 w-full">
                        <div id="popover" className="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 sm:ml-10 md:ml-10 w-10/12 md:w-1/2">
                            <div className="w-full bg-white rounded shadow-2xl">
                                <div className="relative bg-gray-400 rounded-t py-4 px-4 xl:px-8 flex justify-between">
                                    <input readOnly className="px-7 w-96 py-2 bg-gray-100 text-base text-gray-600 font-normal leading-normal tracking-normal opacity-50" placeholder="Company Representatives" />
                                    <div className="text-gray-800 cursor-pointer" onClick={() => setRepresentative(false)}>close</div>
                                </div>
                                {
                                    representatives?.map(function (admin: CompanyAdmin) {
                                        return (
                                            <div key={admin._id} className="w-full h-full px-4 xl:px-8 pt-3 pb-5">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <div>
                                                            <h3 className="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4">{admin.name}</h3>
                                                            <p className="text-gray-600 text-xs leading-3">{admin.position}</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                                                        <div onClick={() => sendMessage(userId, admin._id)} className="border p-2 rounded-md hover:text-indigo-400 hover:border-indigo-400 ">
                                                            Message
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='bg-black flex justify-center'>
                                    <Pagination className="p-4" count={count} onChange={handleChange} variant="outlined" shape="rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </div>
    )
}
