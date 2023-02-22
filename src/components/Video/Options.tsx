import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Snackbar } from '@mui/material';
import { VideoSocketContext } from '../../contexts/videoSocketContext';
import { currentCompanyAdmin } from '../../redux/company-admin/CompanyAdminAuthSlicer';
import { useSelector } from 'react-redux';
import { sendMessageToFriend } from '../../api/User/Post/user';
import { sendMessageToReceiver } from '../../api/User/Get/user';
import useNotification from '../../customHooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 20,
        // marginRight: 20,
        // marginLeft: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
}));

const Options = ({ children }: any) => {
    const setNotification = useNotification()
    const { me, callAccepted, callEnded, leaveCall, callUser } = useContext(VideoSocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const { companyAdminId ,adminName} = useSelector(currentCompanyAdmin)
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const copy = async () => {
        navigator.clipboard.writeText(me);
        if (location.state.applicantId) {
            const result = await sendMessageToFriend(location.state.applicantId.toString(), companyAdminId!, 'company')
            await sendMessageToReceiver(companyAdminId!, result.data._id, `You have an online interview now please paste this id ${me} on the video option input and join`)
            setNotification({
                content: `you have an online interview now 🍿 check the message from ${adminName}`,
                type: "success",
                receiver: location.state.applicantId as string,
            });
            setMessage("Your Link is send to Applicant, You will get a call from the applicant when he click the link")
            setOpen(true)
        }else{
            setCopied(true)
            setMessage("Your id is Copied")
            setOpen(true)
        }
    };
    async function handleJoin() {
        if (!idToCall) {
            return
        }
        callUser(idToCall)
    }
    function handleCall() {
        leaveCall()
        navigate(-1)
    }
    return (
        <div className='flex flex-row justify-between relative'>
            {callAccepted && !callEnded ? (
                <>
                    <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="small" />} fullWidth onClick={handleCall} className={classes.margin}>
                        Hang Up
                    </Button>
                </>
            ) : (
                <div>
                    <div className='flex flex-col'>
                        <Button onClick={copy} variant="contained" color="primary" startIcon={<Assignment fontSize="small" />} fullWidth className={classes.margin}>
                            {location.state.applicantId  ? 'Send join id' : copied ? 'Copied' :'Copy your link'}
                        </Button>
                        <TextField label="Paste Receiver Link" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                        <Button variant="contained" color="primary" startIcon={<Phone fontSize="small" />} fullWidth onClick={handleJoin} className={classes.margin}>
                            Join
                        </Button>
                    </div>
                </div>
            )}
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Options;