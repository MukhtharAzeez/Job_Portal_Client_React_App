import { Alert, CircularProgress, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAdmin } from '../../../api/Company/post';
import { sendEmail } from '../../../api/email';
import { currentCompany } from '../../../redux/company/companyAuthSlicer';

export function AddCompanyAdmins() {
    const { companyId } = useSelector(currentCompany)
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({ name: null, email: null, position: null, employeeId: null, businessMobile: null, authority: null ,company: companyId})
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('')
    const [save, setSave] = useState(false)

    const handleEdit = async (e: any) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (!adminData.name || !adminData.email || !adminData.position || !adminData.employeeId || !adminData.businessMobile || !adminData.authority) {
            setMessage("Fill all the required fields")
            setOpen(true)
            return
        }
        try {
            setSave(true)
            const admin: any = await addAdmin(adminData);
            const emailData = {
                email: adminData.email,
                subject: "Added as admin",
                message: `Congrats .... 
                Company added you as an admin to manage their page . 
                Now you can login with your email and password:${admin.data.password}`
            }
            await sendEmail(emailData)
            setSave(false)
            navigate('/company/admins')

        } catch (error: any) {
            setSave(false)
            const type = typeof error.response.data.message;
            if (type == "string") {
                setMessage(error.response.data.message);
            } else {
                setMessage(error.response.data.message[0]);
            }
            setOpen(true);
        }
    }
    return (
        <>
            {/* <Head>
                <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
                <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
            </Head> */}
            {/* <section className=" py-1 bg-blueGray-50"> */}
            <div className="w-full lg:w-11/12 px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">
                                Add an Admin
                            </h6>
                            {
                                save ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    <button onClick={handleSubmit} className="bg-[#1e293b] text-gray-400  active:bg-[#1e293b] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-400 hover:text-black outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                        Save
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Name *
                                        </label>
                                        <input type="text" name='name' onChange={handleEdit} placeholder='Name of the Admin' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Email address *
                                        </label>
                                        <input type="email" name='email' onChange={handleEdit} placeholder='Email of the Admin' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Position in Company *
                                        </label>
                                        <input type="text" name='position' onChange={handleEdit} placeholder='Admin Position in Company' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Employee Id *
                                        </label>
                                        <input type="text" name='employeeId' onChange={handleEdit} placeholder='Employee identity Number' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Contact Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Address
                                        </label>
                                        <input type="string" name='address' onChange={handleEdit} placeholder='Address of the Admin' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Personal Mobile Number
                                        </label>
                                        <input type="number" name='mobile' onChange={handleEdit} placeholder='Personal Number' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Business Number *
                                        </label>
                                        <input type="number" name='businessMobile' onChange={handleEdit} placeholder='Business NUmber' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Postal Code
                                        </label>
                                        <input type="number" name='postalCode' onChange={handleEdit} placeholder='Postal Code' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Choose Authority of Admins * :
                            </h6>
                            <ul className="grid w-full gap-6 md:grid-cols-3">
                                <li>
                                    <input type="radio" name='authority' onChange={handleEdit} id="withPErmission" value="anyActionsWithPermission" className="hidden peer" required />
                                    <label htmlFor="withPErmission" className="inline-flex items-center justify-between w-full p-5 text-gray-500 cursor-pointer bg-white border-2 border-gray-200 rounded-lg cursor-pointe  peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 ">
                                        <div className="block">
                                            <div className="w-full text-sm">Normal : Admin can do anything only after getting approval from Company</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" name='authority' onChange={handleEdit} id="withoutPermission" value="anyActionsWithoutPermission" className="hidden peer" />
                                    <label htmlFor="withoutPermission" className="inline-flex items-center justify-between w-full p-5 text-gray-500 cursor-pointer bg-white border-2 border-gray-200 rounded-lg cursor-pointe  peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 ">
                                        <div className="block">
                                            <div className="w-full text-sm">Admin can do anything without approval from the company</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" name='authority' onChange={handleEdit} id="interviewsWithoutPermission" value="scheduleInterviewsWithoutPermission" className="hidden peer" />
                                    <label htmlFor="interviewsWithoutPermission" className="inline-flex items-center justify-between w-full p-5 text-gray-500 cursor-pointer bg-white border-2 border-gray-200 rounded-lg cursor-pointe  peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 ">
                                        <div className="block">
                                            <div className="w-full text-sm">Admin can schedule interviews without getting approval from the company</div>
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </form>
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
            {/* </section > */}
        </>
    )
}
