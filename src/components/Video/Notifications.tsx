import React, { useContext } from 'react';

import { VideoSocketContext } from '../../contexts/videoSocketContext';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(VideoSocketContext);
    return (
        <>
            {call?.isReceived && !callAccepted && (
                <div className="flex flex-col absolute -top-20">
                    {/* <h1>{call.name} is calling:</h1> */}
                    <div className="text-black ">{call.name ? call.name : 'Some One'} is requested to join</div>
                    <div  onClick={answerCall} className='bg-purple-800 px-4 py-2 rounded-md text-center text-gray-200'>
                        Accept
                    </div>
                </div>
            )}
        </>
    );
};

export default Notifications;