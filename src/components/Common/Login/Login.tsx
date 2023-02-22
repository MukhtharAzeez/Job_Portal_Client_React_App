import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, CircularProgress, FormControl, Snackbar } from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FilledInput } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import instance from "../../../axios/axios";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../../redux/user/userAuthSlicer";
import PublicRoute from "../../../protectRoutes/publicRoute";
import { addCompanyDetails } from "../../../redux/company/companyAuthSlicer";
import { addCompanyAdminDetails } from "../../../redux/company-admin/CompanyAdminAuthSlicer";
import { allUsersIdStore } from "../../../zustand";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
interface Props {
    type: string
    image: any
    color: string
}

export function Login({ type, image, color}: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setId = allUsersIdStore((state:any)=>state.setId)
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);
        if(type=='user'){
            try {
                const user = await instance.post("/auth/user/login", data, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (user) {
                    localStorage.setItem(
                        "userName",
                        user.data.result.firstName + " " + user.data.result.lastName
                    );
                    localStorage.setItem("email", user.data.result.email);
                    localStorage.setItem("userId", user.data.result._id);
                    localStorage.setItem("userToken", user.data.accessToken.access_token);
                    localStorage.setItem("image", user.data.result.image);
                    dispatch(addUserDetails(user.data));
                    setId(user.data.result._id)
                    navigate("/");
                }
            } catch (error: any) {
                setIsLoading(false);

                
                const type = typeof error.response.data.message;
                if (type == "string") {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.response.data.message[0]);
                }
                setOpen(true);
                setIsLoading(false);
            }
        }else if(type=='company'){
            try {
                const company = await instance.post("/auth/company/login", data, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (company) {
                    localStorage.setItem(
                        "company",
                        company.data.result.company
                    );
                    localStorage.setItem("email", company.data.result.email);
                    localStorage.setItem("companyId", company.data.result._id);
                    localStorage.setItem("companyToken", company.data.accessToken.access_token);
                    dispatch(addCompanyDetails(company.data));
                    setId(company.data.result._id)
                    navigate("/company");
                }
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
        }else if(type=='companyAdmin'){
            try {
                const companyAdmin = await instance.post("/auth/company-admin/login", data, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (companyAdmin) {
                    localStorage.setItem(
                        "adminName",
                        companyAdmin.data.result.name
                    );
                    localStorage.setItem("email", companyAdmin.data.result.email);
                    localStorage.setItem("companyAdminId", companyAdmin.data.result._id);
                    localStorage.setItem("companyId", companyAdmin.data.result.company);
                    localStorage.setItem("companyAdminToken", companyAdmin.data.accessToken.access_token);
                    dispatch(addCompanyAdminDetails(companyAdmin.data));
                    setId(companyAdmin.data.result._id)
                    navigate("/company-admin");
                }
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
    };
    async function handleGoogleSignUp() {
    }
    async function handleGithubSignUp() {
    }
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <PublicRoute>
            <ThemeProvider theme={theme}>
                <Box
                    bgcolor={"white"}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    <Container
                        component="main"
                        sx={{ marginLeft: { xl: 24, xs: "auto" } }}
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
                                SIGN IN
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 1 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            variant="filled"
                                            size="small"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth required variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">
                                                Password
                                            </InputLabel>
                                            <FilledInput
                                                id="filled-adornment-password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                name="password"
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
                                                        color: color,
                                                        "&.Mui-checked": {
                                                            color: color,
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
                                        backgroundColor: color,
                                        height: 50,
                                        "&:hover": { backgroundColor: color },
                                    }}
                                    style={{ backgroundColor: color }}
                                >
                                    {isLoading ? (
                                        <CircularProgress sx={{ color: "white" }} />
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                                <p style={{ marginLeft: "48%", paddingBottom: 15 }}>or</p>
                                {
                                    type == 'user' && 
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={handleGoogleSignUp}
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                color: "black",
                                                marginBottom: 2,
                                                width: "100%",
                                                height: 50,
                                                "&:hover": { backgroundColor: "#ffffff", color: "black" },
                                            }}
                                            endIcon={<GoogleIcon />}
                                        >
                                            Sign In With Google
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleGithubSignUp}
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                color: "black",
                                                width: "100%",
                                                height: 50,
                                                "&:hover": { backgroundColor: "#ffffff", color: "black" },
                                            }}
                                            endIcon={<GitHubIcon />}
                                        >
                                            Sign In With Github
                                        </Button>
                                    </>
                                }
                            </Box>
                            <div className="flex justify-center flex-col mt-3">  
                                {type == 'user' && <p className="text-center">Does not have an account? <span onClick={()=>navigate("/user/signup")} className="cursor-pointer hover:text-color">Sign Up</span> </p>}
                                {type == 'company' && <p className="text-center">Does not have a Page? <span onClick={() => navigate("/company/create")} className="cursor-pointer hover:text-color">Create Page</span> </p>}
                                {type == 'companyAdmin' && <p className="text-center">Want to Login as normal user?<span onClick={() => navigate("/user/login")} className="cursor-pointer hover:text-color">Login</span> </p>}
                            </div>
                        </Box>
                    </Container>
                    <Box
                        sx={{
                            width: "50%",
                            display: { xs: "none", md: "flex" },
                            justifyContent: "flex-start",
                        }}
                    >
                        <img
                            src={image}
                            alt=""
                            width={480}
                            height={480}
                        />
                    </Box>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
            </ThemeProvider>
        </PublicRoute>
    );
}