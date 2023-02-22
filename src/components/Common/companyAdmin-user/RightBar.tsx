import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getRandomUser } from "../../../api/Company-Admin/get";
import { getARandomCompany } from "../../../api/User/Get/user";
// import companyDefaultLogo from '../../../assets/image/companyDefaultLogo.jpg'
import { currentCompanyAdmin } from "../../../redux/company-admin/CompanyAdminAuthSlicer";
import { currentUser } from "../../../redux/user/userAuthSlicer";

export function RightBar() {
  const navigate = useNavigate();
  const { userId } = useSelector(currentUser)
  const { companyAdminId } = useSelector(currentCompanyAdmin)
  const fetcher = async () => {
    if (userId) {
      const getRandomCompany = await getARandomCompany()
      return getRandomCompany;
    }
    if (companyAdminId) {
      const getRandomCompany = await getRandomUser()
      return getRandomCompany;
    }
  };
  const { data, error, isLoading } = useSWR("getRandomCompany", fetcher);
  if (error) return <div>Error....</div>
  if (isLoading) return <div>Loading....</div>
  if (!data) return <div>Loading....</div>

  return (
    <div className="fixed hidden lg:block min-w-[340px] max-w-[340px]">
      <div className="bg-white relative shadow-2xl rounded-lg w-full mt-24 mx-auto max-h-[680px]  scrollbar-hide">
        <div className="flex justify-center">
          <img
            src={data[0]?.image ? data[0]?.image : ""}
            alt=""
            width={100}
            height={100}
            className="rounded-full mx-auto absolute  w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
          />
        </div>
        <div className="mt-32">
          <h1 className="font-bold text-center text-3xl text-gray-900">
            {userId ? data[0]?.company : data[0]?.firstName + " " + data[0]?.lastName}
          </h1>
          <p className="text-center text-sm text-gray-400 font-medium">
            {data[0]?.establishedOn}
          </p>
          <p>
            <span></span>
          </p>
          <div className="my-5 px-6">
            <div
              onClick={() => navigate(`/company-admin/user/${data[0]?._id}`)}
              className="cursor-pointer text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
            >
              {
                userId ? (
                  <>See All <span className="font-bold">Jobs Posted</span> by {data[0]?.company}</>
                ) : (
                    <>Go to <span className="font-bold">{data[0]?.firstName + " " + data[0]?.lastName}</span> Profile </>
                )
              }
            </div>
          </div>
          <div className="flex justify-between items-center my-5 px-6">
            <a
              href=""
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              Facebook
            </a>
            <a
              href=""
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              Twitter
            </a>
            <a
              href=""
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              Instagram
            </a>
            <a
              href=""
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              Email
            </a>
          </div>

          <div className="w-full">
            <h3 className="font-medium text-gray-900 text-left px-6">
              Recent activites
            </h3>
            <div className="mt-5 w-full flex flex-col items-center max-h-[250px] overflow-y-scroll text-sm">
              <a
                href="#"
                className="border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
              >
                <img
                  src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                  alt=""
                  className="rounded-full h-6 shadow-md inline-block mr-2"
                />
                Updated his status
                <span className="text-gray-500 text-xs">24 min ago</span>
              </a>

              <a
                href="#"
                className=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
              >
                <img
                  src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                  alt=""
                  className="rounded-full h-6 shadow-md inline-block mr-2"
                />
                Added new profile picture
                <span className="text-gray-500 text-xs">42 min ago</span>
              </a>

              <a
                href="#"
                className=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
              >
                <img
                  src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                  alt=""
                  className="rounded-full h-6 shadow-md inline-block mr-2"
                />
                Posted new article in{" "}
                <span className="font-bold">#Web Dev</span>
                <span className="text-gray-500 text-xs">49 min ago</span>
              </a>

              <a
                href="#"
                className=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
              >
                <img
                  src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                  alt=""
                  className="rounded-full h-6 shadow-md inline-block mr-2"
                />
                Edited website settings
                <span className="text-gray-500 text-xs">1 day ago</span>
              </a>
              <a
                href="#"
                className="border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
              >
                <img
                  src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                  alt=""
                  className="rounded-full h-6 shadow-md inline-block mr-2"
                />
                Edited website settings
                <span className="text-gray-500 text-xs">1 day ago</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
