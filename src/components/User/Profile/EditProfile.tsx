import { Alert, CircularProgress, Snackbar } from "@mui/material";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { uploadImage } from "../../../api/User/ThirdParty/cloudinary";
import { updateUserProfile } from "../../../api/User/Post/user";
import { getCurrentUserDetails } from "../../../api/User/Get/user";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/user/userAuthSlicer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export function EditProfile() {
  const { userId } = useSelector(currentUser)

  const fetcher = async () => {
    const profile:any = await getCurrentUserDetails(userId!);
    return profile;
  };
  const { data, error, isLoading } = useSWR("profile", fetcher);
  const navigate = useNavigate();

  const [qualificationValue, setQualificationValue] = useState("");
  const [qualifications, setQualifications] = useState<any>([]);
  const [skillValue, setSkillValue] = useState("");
  const [skills, setSkills] = useState<any>([]);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [save, setSave] = useState(false)

  const proImageRef = useRef<any>(null);
  const [proImg, setProImg] = useState<any>(null);

  const resumeImageRef = useRef<any>(null);
  const [resumeImage, setResumeImage] = useState<any>(null);

  const [openQualification, setOpenQualification] = useState(false)

  if (isLoading) return <div>Loading</div>
  if (error) return <div>error</div>

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function openQualificationInput() {
    if (data.qualifications.length > 0) setQualifications(data.qualifications)
    if (data.skills.length > 0) setSkills(data.skills)
    setOpenQualification(!openQualification)
  }

  function handleQualification(e: any) {
    if (e.keyCode == 13) {
      e.preventDefault();
      if (qualifications.includes(qualificationValue))
        return setQualificationValue("");
      if (qualificationValue.trim() != "") {
        setQualifications([...qualifications, qualificationValue.trim()]);
        setQualificationValue("");
      }
    }
  }

  function handleSkills(e: any) {
    if (e.keyCode == 13) {
      e.preventDefault();
      if (skills.includes(skillValue)) return setQualificationValue("");
      if (skillValue.trim() != "") {
        setSkills([...skills, skillValue.trim()]);
        setSkillValue("");
      }
    }
  }

  function deleteQualification(value: string) {
    const remindQualifications = qualifications.filter((t:any) => t != value);
    setQualifications(remindQualifications);
  }

  function deleteSkills(value: string) {
    const remindSkills = skills.filter((t:any) => t != value);
    setSkills(remindSkills);
  }

  const proImgChangeHandler = (e: any) => {
    const file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setProImg(e.target.files[0])
      setMessage("");
    } else {
      setMessage(
        "The file you selected is invalid. Only jpeg, png, and gif images are allowed !"
      );
      setOpen(true);
    }
  };

  

  const resumeImageChangeHandler = (e: any) => {
    const file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setResumeImage(e.target.files[0])
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

  async function handleSubmit(event: any) {
    event.preventDefault();

    if(userId){
      const formData = new FormData(event.target);
      const bday = formData.get("DOB")
      if (new Date(bday!.toString()) <= new Date(new Date().toString())) {

      } else {
        setMessage("Date is invalid");
        setOpen(true)
        return
      }

      if (qualifications.length > 0) {
        formData.append("qualifications", JSON.stringify(qualifications));
      }
      else { formData.append("qualifications", JSON.stringify(data.qualifications)); }
      if (skills.length > 0) { formData.append("skills", JSON.stringify(skills)); }
      else { formData.append("skills", JSON.stringify(data.skills)); }
      formData.append("userId", userId);

      setSave(true)
      let url
      if (proImg) {
        url = await uploadImage(proImg)
      } else if (data.image.length > 0) {
        url = data.image
      } else {
        url = "https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png"
      }

      let resumeUrl
      if (resumeImage) {
        resumeUrl = await uploadImage(resumeImage)
      } else if (data.resume.length > 0) {
        resumeUrl = data.resume
      } else {
        resumeUrl = ""
      }

      try {

        formData.append("image", url);
        formData.append("resume", resumeUrl)
        await updateUserProfile(formData);
        setSave(false)
        navigate('/user/profile')
      } catch (error: any) {
        const type = typeof error.response.data.message;
        if (type == "string") {
          setMessage(error.response.data.message);
        } else {
          setMessage(error.response.data.message[0]);
        }
        setOpen(true);
        setSave(false)
      }
    }
    
  }
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
      </Helmet>
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <Link
                to="/user/profile"
                className="text-blueGray-800 text-xl font-bold hover:underline cursor-pointer"
              >
                My account
              </Link>

              <div className="relative cursor-pointer">
                <div className="">
                  <img
                    className="w-16 h-16 ml-4 rounded-full"
                    src=
                    {proImg ? URL?.createObjectURL(proImg)
                      : data.image ? data.image :
                        "https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png"
                    }
                    alt="Default avatar"
                    onClick={() => proImageRef.current.click()}
                  />
                  <input
                    type="file"
                    name="Profile_img"
                    onChange={proImgChangeHandler}
                    ref={proImageRef}
                    hidden
                  />
                </div>
              </div>

            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.firstName ? data.firstName : ""}
                      required
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.lastName ? data.lastName : ""}
                      required
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.email ? data.email : ""}
                      required
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="DOB"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.DOB ? data.DOB : ""}
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.mobile ? data.mobile : ""}
                      minLength={10}
                      maxLength={10}
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Gender
                    </label>
                    <select
                      className="form-select form-select-lg mb-3  
                appearance-none block w-full px-4 py-3 text-sm font-normal shadow  text-gray-700  bg-white bg-clip-padding bg-no-repeat
              border-gray-100 rounded transition ease-in-out m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      name="gender"
                      aria-label=".form-select-lg example"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
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
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.address ? data.address : ""}
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.city ? data.city : ""}
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.country ? data.country : ""}
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={data.postalCode ? data.postalCode : ""}
                      onKeyDown={preventFormFromEnter}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 space-y-2">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Attach Image
                            </h6>
                            <div className="flex items-center justify-center w-full flex-col">
                                <label className="flex flex-row rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                    <img
                                        className="w-36 text-black"
                                        src=
                                        {resumeImage ? URL?.createObjectURL(resumeImage) : data.resume ? data.resume : ""}
                                        alt="No image Selected"
                                        onClick={() => resumeImageRef.current.click()}
                                    />
                                    <div className="h-full w-full text-center flex flex-col items-center justify-center  " onClick={() => resumeImageRef.current.click()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                    </div>
                                    <input type="file" className="hidden" onChange={resumeImageChangeHandler} ref={resumeImageRef} />
                                </label>
                                {open ? <Alert severity="error" variant="outlined" className="m-2">{message}</Alert> : ''}
                            </div>
                        </div>
                        <p className="text-sm text-gray-300">
                            <span>File type: doc,pdf,types of images</span>
                        </p>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              {!openQualification && <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase cursor-pointer hover:text-blueGray-800" onClick={openQualificationInput}>
                Click to Add your Qualifications and Skills
              </h6>}
              {openQualification ? (
                <>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Add your Qualifications
                  </h6>
                  <div className="max-w-lg m-6">
                    <div className="relative">
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add Your Educational Details"
                        value={qualificationValue}
                        onChange={(e) =>
                          setQualificationValue(e.target.value.toUpperCase())
                        }
                        onKeyDown={handleQualification}
                      />
                      <div className="hidden">
                        <div className="absolute z-40 left-0 mt-2 w-full">
                          <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                            <a className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white">
                              Add tag <span className="font-semibold"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                      {qualifications.map(function (
                        qualification: string,
                        index: number
                      ) {
                        return (
                          <div
                            key={index}
                            className="bg-gray-400 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden"
                          >
                            <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
                              {qualification}
                            </span>
                            <button
                              type="button"
                              className="w-6 h-8 inline-block align-middle text-gray-500 bg-gray-800 focus:outline-none"
                              onClick={() => deleteQualification(qualification)}
                            >
                              <svg
                                className="w-6 h-6 fill-current mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Add your Skills
                  </h6>
                  <div className="max-w-lg m-6">
                    <div className="relative">
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add Some skills you have"
                        value={skillValue}
                        onChange={(e) =>
                          setSkillValue(e.target.value.toUpperCase())
                        }
                        onKeyDown={handleSkills}
                      />
                      <div className="hidden">
                        <div className="absolute z-40 left-0 mt-2 w-full">
                          <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                            <a className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white">
                              Add tag <span className="font-semibold"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                      {skills.map(function (skill: string, index: number) {
                        return (
                          <div
                            key={index}
                            className="bg-gray-400 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden"
                          >
                            <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
                              {skill}
                            </span>
                            <button
                              type="button"
                              className="w-6 h-8 inline-block align-middle text-gray-500 bg-gray-800 focus:outline-none"
                              onClick={() => deleteSkills(skill)}
                            >
                              <svg
                                className="w-6 h-6 fill-current mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div></div>
              )
              }
              {
                save ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                    Post
                  </button>
                )
              }
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

    </>
  );
}