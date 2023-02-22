import { Alert, CircularProgress } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAJobPost } from '../../../api/Company-Admin/post';
import { uploadImage } from '../../../api/User/ThirdParty/cloudinary';
import { currentCompanyAdmin } from '../../../redux/company-admin/CompanyAdminAuthSlicer';

export function AddJob() {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const { companyAdminId, companyId } = useSelector(currentCompanyAdmin)
    const [jobData, setJobData] = useState({ companyId: companyId, adminId: companyAdminId, image: null })
    const [save, setSave] = useState(false)
    const jobImageRef = useRef<any>(null);
    const [jobImage, setJobImage] = useState<any>(null);

    const jobImageChangeHandler = (e: any) => {
        const file = e.target.files;
        const fileType = file[0]["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
            setJobImage(e.target.files[0])
            setMessage("");
        } else {
            setMessage(
                "The file you selected is invalid. Only jpeg, png, and gif images are allowed !"
            );
            setOpen(true);
        }
    };

    function preventFormFromEnter(e: any) {
        if (e.keyCode == 13) e.preventDefault()
    }

    const handleEdit = async (e: any) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        setSave(true)
        let url
        if (jobImage) {
            url = await uploadImage(jobImage)
        } else {
            url = ""
        }
        try {
            jobData.image = url
            await addAJobPost(jobData);
            setSave(false)
            navigate('/company-admin/jobs')
        } catch (error: any) {
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
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">
                                Post a Job
                            </h6>
                            {
                                save ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    <button type="submit" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" >
                                        Post
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-">
                        <div className="grid grid-cols-1 space-y-2">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Attach Image
                            </h6>
                            <div className="flex items-center justify-center w-full flex-col">
                                <label className="flex flex-row rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                    <img
                                        className="w-36"
                                        src=
                                        {jobImage ? URL?.createObjectURL(jobImage) : ""}
                                        alt="No image Selected"
                                        onClick={() => jobImageRef.current.click()}
                                    />
                                    <div className="h-full w-full text-center flex flex-col items-center justify-center  " onClick={() => jobImageRef.current.click()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                    </div>
                                    <input type="file" className="hidden" onChange={jobImageChangeHandler} ref={jobImageRef} />
                                </label>
                                {open ? <Alert severity="error" variant="outlined" className="m-2">{message}</Alert> : ''}
                            </div>
                        </div>
                        <p className="text-sm text-gray-300">
                            <span>File type: doc,pdf,types of images</span>
                        </p>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Job Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Title
                                        </label>
                                        <input name='job' required onKeyDown={preventFormFromEnter} onChange={handleEdit} type="text" placeholder='Job title/position name' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Job Description
                                        </label>
                                        <textarea name="jobDescription" required onKeyDown={preventFormFromEnter} onChange={handleEdit} placeholder='Put some job details here' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Job Qualifications
                                        </label>
                                        <textarea name="jobQualification" required onKeyDown={preventFormFromEnter} onChange={handleEdit} placeholder='Put something that essential requirements of the job position with
                                        the option of including salary/hourly rate ' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Company Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            About Company
                                        </label>
                                        <textarea name="aboutCompany" required onKeyDown={preventFormFromEnter} onChange={handleEdit} placeholder='Detailing your company history, core values, principles and/or
                                        diversity and inclusion statement]' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                About Benefits and How to Apply
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Benefits
                                        </label>
                                        <textarea name="benefits" required onKeyDown={preventFormFromEnter} onChange={handleEdit} placeholder='Put something that applicants will find most
                                        enticing about the job position.' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            How to Apply
                                        </label>
                                        <textarea name="applications" required onKeyDown={preventFormFromEnter} onChange={handleEdit} placeholder='Put something that applicants will find most
                                        enticing about the job position.' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    )
}