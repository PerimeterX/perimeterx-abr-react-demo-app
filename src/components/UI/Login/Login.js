import React, { Component } from 'react';
import {
    Typography,
    Avatar,
    Container,
    Box,
    IconButton,
    Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../../services/axiosService';
import styles from './Login.module.css';
import FormInput from '../FormInput/FormInput';

class Login extends Component {
    state = {
        email: '',
        password: '',
        avatar: '😸',
        blocked: false,
        error: '',
        formValid: () => {
            return (
                this.state.email && this.state.password && !this.state.blocked
            );
        },
    };

    handleLogin = async () => {
        const data = {
            email: this.state.email,    
            password: this.state.password,
        };
        try {
            const result = await axios.post('/api/login', data);
            if (result.data && Object.keys(result.data).length === 3) {
                this.setState({ avatar: '👍', blocked: true, error: '' });
                setTimeout(() => {
                    this.props.modalClosed();
                }, 1000);
            }
        } catch (e) {
            if (e.response.status === 403) {
                this.setState({ avatar: '🙀', blocked: true, error: '' });
                // handle the captcha success.
                window._pxOnCaptchaSuccess = (isValid) => {
                    if (isValid) {
                        document.querySelector('#px-captcha').remove();
                        this.setState({ blocked: false, avatar: '😸' });
                        delete window._pxOnCaptchaSuccess;
                    }
                };
            } else {
                this.setState({
                    avatar: '😾',
                    error: 'You got the wrong credentials, buddy.',
                });
            }
        }
    };

    validationSuccess = (name, value) => {
        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <Container maxWidth="xs" className={styles.Login}>
                <Box className={styles.Content}>
                    <IconButton
                        color="secondary"
                        aria-label="close modal"
                        className={styles.Close}
                        onClick={this.props.modalClosed}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Avatar className={styles.Avatar}>
                        {this.state.avatar}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={styles.Form} noValidate autoComplete="off">
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            setValue={this.validationSuccess}
                            validationPattern={
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            }
                            validationMessage="Please insert a valid email address"
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            setValue={this.validationSuccess}
                            validationMessage="Password must be at least 6 characters long"
                            validationPattern={/^[A-Za-z\d]{6,}$/}
                        />
                        <Typography component="h6" variant="h6">
                            {this.state.error}
                        </Typography>
                        <div id="pxElement"></div>
                        <Button
                            id="loginBtn"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            disabled={!this.state.formValid()}
                            className={styles.Submit}
                            onClick={this.handleLogin}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Container>
        );
    }
}

export default Login;
