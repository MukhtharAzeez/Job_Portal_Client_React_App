import React from 'react'
import { Login } from '../../components/Common'
import UserLogin from '../user/Login'

function AdminLogin() {
    return (
        <Login type={'admin'} image={UserLogin} color={"#38d39f"} />
    )
}

export default AdminLogin
