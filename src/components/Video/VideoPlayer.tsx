import React, { useContext } from 'react';
import { VideoSocketContext } from '../../contexts/videoSocketContext';
import Options from './Options';
import Notifications from './Notifications';

const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream } = useContext(VideoSocketContext);
  return (
    <div className="relative bg-black justify-center">
      
      {
        stream && callAccepted && !callEnded ? 
          (
            <>
              <div className="flex py-4 relative justify-center">
                <video playsInline muted ref={myVideo} autoPlay className="w-full rounded-md h-screen" />
                <div className="bottom-10 absolute ">
                  <Options>
                    <Notifications />
                  </Options>
                </div>
              </div>
              <div className="absolute bottom-10 right-4 h-48 w-48">
                <video playsInline muted ref={userVideo} autoPlay className="w-48 h-48 rounded-md" />
              </div>
            </>
          ) : stream && callEnded ? (
            <>
              <div className="flex py-4 relative justify-center">
                <video playsInline muted ref={myVideo} autoPlay className="w-full rounded-md h-screen" />
                <div className="bottom-10 absolute ">
                  <Options>
                    <Notifications />
                  </Options>
                </div>
              </div>
            </>
            
          ) : stream && !callAccepted ? (
              <>
                <div className="flex py-4 relative justify-center">
                  <video playsInline muted ref={myVideo} autoPlay className="w-full rounded-md h-screen"/>
                  <div className="bottom-10 absolute ">
                    <Options>
                      <Notifications />
                    </Options>
                  </div>
                </div>
              </>
          ) : ''
      }
    </div>
  );
};

export default VideoPlayer;