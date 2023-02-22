import React from "react";
import { useSelector } from "react-redux";
import { MobileBottom, NavBar } from "../../components/Common";
import { UserMessage } from "../../components/Message";

function Inbox() {
    return (
        <>
            <div>
                <NavBar type={'user'} />
                <UserMessage type={'user'} />
                <div className="sm:hidden">
                    <MobileBottom />
                </div>
            </div>
        </>
    );
}

export default Inbox;
