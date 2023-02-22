import { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";

const VideoSocketContext = createContext<any>({});


const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [stream, setStream] = useState<any>();
  const [me, setMe] = useState("");
  const [call, setCall] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [socket, setSocket] = useState<Socket>()
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>();

  useEffect(() => {
    const socket = io("http://videosocket.labonnz.club");
    console.log(socket)
    setSocket(socket)
  }, [])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current != undefined) {
          myVideo.current.srcObject = currentStream;
        }
      });
      
    if (socket) {
      socket.on("me", (id:string) => {
        console.log(id)
        setMe(id);
      });
      socket.on("callUser", (data:any) => {
        setCall({ isReceived: true, from: data.from, name: data.name, signal: data.signal });
      });
    }
  }, [socket]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data:any) => {
      socket?.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream:any) => {
      if (userVideo.current){
        userVideo.current.srcObject = currentStream;
      }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data:any) => {
      socket?.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream:any) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    socket?.on("callAccepted", (signal:any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <VideoSocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
      {children}
    </VideoSocketContext.Provider>
  );
};

export { ContextProvider, VideoSocketContext };