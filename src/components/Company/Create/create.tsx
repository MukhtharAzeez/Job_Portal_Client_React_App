import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Alert,
    CircularProgress,
    FormControl,
    Snackbar,
    Typography,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FilledInput } from "@mui/material";
import { createABusinessPage } from "../../../api/Company/post";
import { useRef, useState } from "react";
import { uploadImage } from "../../../api/User/ThirdParty/cloudinary";
// import companySignup from '../../../assets/image/companySignup.png'
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export function Create() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const msmeRef = useRef<HTMLInputElement>(null);
    const [msme, setMsme] = useState<File | null>(null);
    const udhyogRef = useRef<HTMLInputElement>(null);
    const [udhyog, setUdhyog] = useState<File | null>(null);
    const incorporationRef = useRef<HTMLInputElement>(null);
    const [incorporation, setIncorporation] = useState<File | null>(null);

    const msmeChangeHandler = (e: any) => {
        if ( e.target.files) {
            const file = e.target.files;
            const fileType = file[0]["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes?.includes(fileType)) {
                setMsme(e?.target?.files[0])
                setMessage("");
            } else {
                setMessage(
                    "The file you selected is invalid. Only jpeg, png, and gif images are allowed !"
                );
                setOpen(true);
            }
        }
    };
    const udhyogChangeHandler = (e: any) => {
        if ( e.target.files) {
            const file = e.target.files;
            const fileType = file[0]["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                setUdhyog(e.target.files[0])
                setMessage("");
            } else {
                setMessage(
                    "The file you selected is invalid. Only jpeg, png, and gif images are allowed !"
                );
                setOpen(true);
            }
        }
    };
    const incorporationChangeHandler = (e: any) => {
        if (e.target.files) {
            const file = e.target.files;
            const fileType = file[0]["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                setIncorporation(e.target.files[0])
                setMessage("");
            } else {
                setMessage(
                    "The file you selected is invalid. Only jpeg, png, and gif images are allowed !"
                );
                setOpen(true);
            }
        }
    };
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data: any = new FormData(event.currentTarget)
        const q = new Date();
        const y = q.getFullYear();
        const establishedOn = data.get("establishedOn")

        if (data.get('company').length == 0) { setMessage("Company Name is required"); setOpen(true); return }
        if (y < parseInt(establishedOn)) { setMessage("Choose Correct Date"); setOpen(true); return }
        if (data.get('gstNumber').length != 15) { setMessage("GST Number must be 15 characters"); setOpen(true); return }
        if (data.get('panCardNumber').length != 10) { setMessage("PAN Card Number must be 10 characters"); setOpen(true); return }
        if (data.get('cinNumber').length != 21) { setMessage("CIN Number must be 21 numbers"); setOpen(true); return }
        if (!data.get('email')) { setMessage("email must be email"); setOpen(true); return }
        if (data.get('password').length < 8 || data.get('password').length > 12) { setMessage("Password length must be between 8-12"); setOpen(true); return }
        if (data.get('confirmPassword') != data.get('password')) { setMessage("Confirm Passwrod length must be between 8-12"); setOpen(true); return }

        if (!msme || !udhyog || !incorporation) {
            setMessage("Upload required Documents !")
            setOpen(true)
            return
        }

        setIsLoading(true);
        const url1 = await uploadImage(msme)
        setMsme(null)
        const url2 = await uploadImage(udhyog)
        const url3 = await uploadImage(incorporation)

        data.append("msmeCertificate", url1);
        data.append("udhyogAdhar", url2);
        data.append("incorporationLicense", url3);
        try {

            await createABusinessPage(data)
            setIsLoading(false);
            setSuccessOpen(true)
            // router.push("/");
        } catch (error: any) {
            const type = typeof error.response.data.message;
            if (type == "string") {
                setMessage(error.response.data.message);
            } else {
                setMessage(error.response.data.message[0]);
            }
            setOpen(true);
            setIsLoading(false);
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const loginToCompanyAdmin = () => navigate("/company-admin/login");
    const loginToCompanyPage = () => navigate("/company/login")

    return (
        <ThemeProvider theme={theme}>
            <Box
                bgcolor={"white"}
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >

                <Box
                    sx={{
                        width: "50%",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        paddingLeft: 18,
                    }}
                >
                    <img
                        src={""}
                        alt=""
                        width={480}
                        height={480}
                    />
                </Box>
                <Container
                    component="main"
                    sx={{ marginLeft: { md: 8, xs: "auto" } }}
                    maxWidth="xs"
                >

                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            CREATE PAGE
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="company"
                                        required
                                        fullWidth
                                        id="CompanyName"
                                        label="Company Name"
                                        variant="filled"
                                        autoFocus
                                        size="small"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="number"
                                        required
                                        fullWidth
                                        id="establishedOn"
                                        label="Established Year"
                                        name="establishedOn"
                                        autoComplete="established"
                                        variant="filled"
                                        size="small"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="gst"
                                        label="GST Number"
                                        name="gstNumber"
                                        autoComplete="gst"
                                        variant="filled"
                                        size="small"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="pan"
                                        label="PAN Card Number"
                                        name="panCardNumber"
                                        autoComplete="pan"
                                        variant="filled"
                                        size="small"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="CINNumber"
                                        label="CIN Number"
                                        name="cinNumber"
                                        autoComplete="CIN Number"
                                        variant="filled"
                                        size="small"
                                        type="text"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        variant="filled"
                                        size="small"
                                        type="text"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>


                                <div className="ml-3 mt-3 flex gap-3 justify-center">
                                    {msme ? (
                                        <div className="w-1/3 ml-3 cursor-pointer">
                                            <img
                                                className="w-24 h-28 ml-4"
                                                src=
                                                {URL?.createObjectURL(msme)}
                                                alt="Default avatar"
                                                onClick={() => msmeRef.current!.click()}
                                            />
                                            <input
                                                type="file"
                                                onChange={msmeChangeHandler}
                                                ref={msmeRef}
                                                hidden
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-1/3">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-100 dark:hover:border-gray-100 dark:hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6" onClick={() => msmeRef.current!.click()}>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">upload MSME certificate</span></p>
                                                </div>
                                                <input type="file" className="hidden" onChange={msmeChangeHandler} ref={msmeRef} />
                                            </label>
                                        </div>
                                    )}
                                    {udhyog ? (
                                        <div className="w-1/3 cursor-pointer">
                                            <img
                                                className="w-24 h-28 ml-4"
                                                src={URL?.createObjectURL(udhyog)}
                                                alt="Default avatar"
                                                onClick={() => udhyogRef.current!.click()}
                                            />
                                            <input
                                                type="file"
                                                onChange={udhyogChangeHandler}
                                                ref={udhyogRef}
                                                hidden
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-1/3">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-100 dark:hover:border-gray-100 dark:hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6" onClick={() => udhyogRef.current!.click()}>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">upload Udyog Aadhar</span></p>
                                                </div>
                                                <input type="file" className="hidden" onChange={udhyogChangeHandler} ref={udhyogRef} />
                                            </label>
                                        </div>
                                    )}
                                    {incorporation ? (
                                        <div className="w-1/3 cursor-pointer">
                                            <img
                                                className="w-24 ml-4 h-28"
                                                src=
                                                {URL?.createObjectURL(incorporation)}
                                                alt="Default avatar"
                                                onClick={() => incorporationRef.current!.click()}
                                            />
                                            <input
                                                type="file"
                                                onChange={incorporationChangeHandler}
                                                ref={incorporationRef}
                                                hidden
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-1/3">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-100 dark:hover:border-gray-100 dark:hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6" onClick={() => incorporationRef.current!.click()}>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">upload incorporation license</span></p>
                                                </div>
                                                <input type="file" onChange={incorporationChangeHandler}
                                                    ref={incorporationRef} className="hidden" />
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="password"
                                        label="password"
                                        name="password"
                                        autoComplete="password"
                                        variant="filled"
                                        size="small"
                                        type="password"
                                        InputProps={{
                                            disableUnderline: true, // <== added this
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">
                                            Confirm Password
                                        </InputLabel>
                                        <FilledInput
                                            name="confirmPassword"
                                            id="filled-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="TermsAndConditions"
                                                defaultChecked
                                                sx={{
                                                    color: "#009fd6",
                                                    "&.Mui-checked": {
                                                        color: "#009fd6",
                                                    },
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Accept Terms And Conditions"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: "#009fd6",
                                    height: 50,
                                    "&:hover": { backgroundColor: "#009fd6" },
                                }}
                                style={{ backgroundColor: "#009fd6" }}
                            >
                                {isLoading ? (
                                    <CircularProgress sx={{ color: "white" }} />
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </Box>
                        <div className="flex justify-center flex-col">
                            <p className="text-center">Already Created a Page? <span onClick={loginToCompanyPage} className="cursor-pointer hover:text-[#009fd6]">Login</span> </p>
                            <p className="text-center">or </p>
                            <p className="text-center">Sign In as Company admin? <span onClick={loginToCompanyAdmin} className="cursor-pointer hover:text-[#009fd6]">Sign In</span> </p>
                        </div>
                    </Box>

                </Container>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>

                <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Congrats ! Documents updated successfully we will let you know once we approved your Documents
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}

