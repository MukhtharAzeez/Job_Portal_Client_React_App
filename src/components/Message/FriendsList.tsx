import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { currentCompanyAdmin } from '../../redux/company-admin/CompanyAdminAuthSlicer';
import { currentUser } from '../../redux/user/userAuthSlicer';
import { CompanyAdmins } from './CompanyAdmins';
import { Friends } from './Friends';

interface OnlineUsers {
    userId: string
    socketId: string
}
interface Props {
    setChat: any
    onlineUsers: Array<OnlineUsers>
}

export function FriendsList({ setChat, onlineUsers }: Props) {
    const [id, setId] = useState<any>()
    const [type, setType] = useState('')
    const { userId } = useSelector(currentUser)
    const { companyAdminId } = useSelector(currentCompanyAdmin)
    useEffect(() => {
        if (userId) {
            setId(userId)
            setType('user')
        } else {
            setId(companyAdminId)
            setType('companyAdmin')
        }
    }, [])
    return (
        id && type == 'user' ? (
            <>
                <Friends setChat={setChat} onlineUsers={onlineUsers} id={id} type={type} />
                <CompanyAdmins setChat={setChat} onlineUsers={onlineUsers} id={id} type={type} />
            </>
        ) : id ? (
            <>
                <CompanyAdmins setChat={setChat} onlineUsers={onlineUsers} id={id} type={type} />
            </>
        ) : (
            <></>
        )
    )
}
