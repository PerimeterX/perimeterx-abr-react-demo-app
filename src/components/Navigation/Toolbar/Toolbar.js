import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Modal from '../../UI/Modal/Modal';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Login from '../../UI/Login/Login';

import {
    IconButton,
    AppBar,
    Toolbar as UIToolbar,
    Typography,
} from '@material-ui/core';
import styles from './Toolbar.module.css';

class Toolbar extends Component {
    state = {
        showLogin: false,
    };

    loginCancelHandler = () => {
        this.setState({ showLogin: false });
    };

    loginHandler = () => {
        this.setState({ showLogin: true });
    };

    render() {
        return (
            <Aux>
                <Modal show={this.state.showLogin}>
                    <Login modalClosed={this.loginCancelHandler} />
                </Modal>
                <div className={styles.Toolbar}>
                    <AppBar position="static" color="secondary">
                        <UIToolbar>
                            <IconButton
                                edge="start"
                                className={styles.MenuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={styles.Title}>
                                Fitness Pro
                            </Typography>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                color="inherit"
                                onClick={this.loginHandler}
                            >
                                <AccountCircle fontSize="large" />
                            </IconButton>
                        </UIToolbar>
                    </AppBar>
                </div>
            </Aux>
        );
    }
}

export default Toolbar;
