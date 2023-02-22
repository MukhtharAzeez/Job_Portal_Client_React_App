import React, { useState } from "react";
import useSWR from "swr";
import { CircularProgress, Modal, Tooltip } from '@mui/material';
import { getCompanyDetails } from "../../../api/Company/get";
import { approveCompany } from "../../../api/Admin/get";
import { sendEmail } from "../../../api/email";
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import { useLocation, useNavigate } from "react-router-dom";


export function CompanyDetails() {
    const location = useLocation()
    const { companyId } = location.state
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [certificate, setCertificate] = useState('');
    const [approved, setApproved] = useState<boolean>();
    const [save, setSave] = useState(false)



    const fetcher = async () => {
        const companyDetails = await getCompanyDetails(companyId.toString());
        setApproved(companyDetails.approved)
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
    async function approve(companyId: string) {
        setSave(true)
        await approveCompany(companyId)
        setApproved(!approved)
        let emailData
        if (approved) {
            emailData = {
                email: data.email,
                subject: "Verified !",
                message: `Congrats .... 
                Company added you as an admin to manage their page .
                Now you can login with your email and password`
            }
        } else {
            emailData = {
                email: data.email,
                subject: "Verified !",
                message: `Congrats ....
                Company added you as an admin to manage their page .
                Now you can login with your email and password`
            }
        }
        await sendEmail(emailData)
        setSave(false)
    }



    return (
        <div className=" lg:px-16 lg:pb-16">
            <div className="p-8 bg-white shadow mt-14 rounded-lg">
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
                        {
                            save ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                <Tooltip title={approved ? 'Reject Company' : 'Approve Company'} arrow placement='bottom-start'>
                                    <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" onClick={() => approve(data._id)}>
                                        {approved ? 'Approved' : 'Not Approved'}
                                    </button>
                                </Tooltip>
                            )
                        }

                        <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                            Message
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
                    <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8 cursor-pointer" onClick={() => handleOpen(data.incorporation, 'FSSAI License')}>
                        <div style={{
                            backgroundImage: `url(${data.incorporation})`
                        }}
                            className="bg-gray-300 h-96 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                        <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                            <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">Incorporation License</div>
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
            </div>
        </div>
    );
}
