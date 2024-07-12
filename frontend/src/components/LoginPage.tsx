import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material"
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>();
    const [severity, setSeverity] = useState<'success' | 'error'>();
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const onSubmit = async () => {
      console.log({ username, password });
        try {
            const loginResponse = await login({username, password});
            setMessage('Estimate Saved');
            setSeverity('success');
            setOpen(true);
            localStorage.setItem('auth_token', loginResponse.token);
            navigate('/manage-estimate');
        } catch (error) {
            setOpen(true);
            setSeverity('error');
            const err = error as AxiosError
            if (err.response && err.response.status === 401) {
                setMessage('Invalid username or password');
            } else {
                setMessage(err.message);
            }
            console.error('Error saving materials:', error);
        }
    }

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'username') {
          setUsername(value);
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    }

    return (
        <>
            {
                <Grid item xs={12} md={6}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                        </Alert>
                    </Snackbar>
                </Grid>
            }
            <Grid container rowSpacing={1} columnGap={5} sx={{mt : 2, display: 'flex', justifyContent: 'center', alignContent:'center'}}>
                <Grid item xs={12} md={6}>
                    <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    type="string"
                    name="username"
                    required
                    value={username}
                    onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                    variant="contained"
                    size="medium"
                    onClick={onSubmit}
                    >
                    Login
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginPage