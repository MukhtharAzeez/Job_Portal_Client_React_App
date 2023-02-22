import { Box } from '@mui/material'
import React from 'react'
import { MobileBottom, NavBar, SideBar, SideBarWithoutText } from '../../components/Common'
import { CompanyProfile } from '../../components/Company'
import { USER_SIDEBAR_LINKS } from '../../constants/User-sideBar'

function CompanyDetails() {

    return (
        <>
            {/* <Head>
                <title>Edit-Profile</title>
            </Head> */}
            <Box className="bg-gray-200 min-h-[100vh]" color={"text.primary"}>
                <NavBar type={'user'} />
                <div className="flex ">
                    <div className="w-1/12 mt-8 ml-16 hidden lg:block">
                        <SideBar links={USER_SIDEBAR_LINKS} href={'/user/company/company'} />
                    </div>
                    <div className="w-0 sm:w-1/12  mt-8 ml-5 xs:ml-0 sm:block lg:hidden">
                        <SideBarWithoutText links={USER_SIDEBAR_LINKS} href={'/user/company/company'} />
                    </div>
                    <div className="w-11/12  sm:w-10/12 md:w-8/12 md:ml-24 sm:ml-10 lg:ml-48 mt-28">
                        <CompanyProfile />
                    </div>
                </div>
                <div className="sm:hidden">
                    <MobileBottom />
                </div>
            </Box>
        </>
    )
}

export default CompanyDetails
