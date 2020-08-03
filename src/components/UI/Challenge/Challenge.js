import React from 'react';
import { Container, Box, Typography, IconButton } from '@material-ui/core';
import styles from './Challenge.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@material-ui/icons/Close';

const challenge = (props) => {
    return (
        <Container maxWidth="xs" className={styles.Challenge}>
            <IconButton
                color="secondary"
                aria-label="close modal"
                className={styles.Close}
                onClick={props.modalClosed}
            >
                <CloseIcon />
            </IconButton>
            <Box className={styles.Content}>
                <FontAwesomeIcon
                    icon={faHatCowboy}
                    className={styles.BigIcon}
                />
                <Typography
                    component="h1"
                    variant="h5"
                    className={styles.Header}
                >
                    Whoa there cowboy! Are you a bot??
                </Typography>
                <div id="px-captcha"></div>
                <div className="reasons">
                    <span>
                        You might have received this message if JavaScript or
                        cookies were disabled in your browser settings.
                    </span>
                    <br />
                    <span>
                        Occasionally a plugin or extension may be at fault. If
                        you would like to learn more just reference &nbsp;
                        <a href="https://www.perimeterx.com/whywasiblocked/#">
                            Why Was I Blocked
                        </a>
                        &nbsp; for more details.
                    </span>
                </div>
                <div className={styles.Reference}>
                    Reference #: {props.refId}
                </div>
            </Box>
        </Container>
    );
};

export default challenge;
