import React, { Component } from 'react';
import styles from './ActivityCard.module.css';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    CardActions,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRunning,
    faSwimmer,
    faRoad,
    faStopwatch,
    faHeartbeat,
    faBiking,
    faGamepad,
} from '@fortawesome/free-solid-svg-icons';

import { faSmile, faFrown, faMeh } from '@fortawesome/free-regular-svg-icons';
import LineChart from '../../Chart/LineChart';

class ActivityCard extends Component {
    createFakeData() {
        // This function creates data that doesn't look entirely random
        const data = [];
        for (let x = 0; x <= 30; x++) {
            const random = Math.random();
            const temp = data.length > 0 ? data[data.length - 1].y : 50;
            let y =
                random >= 0.45
                    ? temp - Math.floor(random * 20)
                    : temp + Math.floor(random * 20);
            if (y < 0) {
                y = -y;
            }
            data.push({ x, y });
        }
        return data;
    }
    render() {
        let icon;
        switch (this.props.activity) {
            case 'running':
                icon = <FontAwesomeIcon icon={faRunning} />;
                break;
            case 'swimming':
                icon = <FontAwesomeIcon icon={faSwimmer} />;
                break;
            case 'biking':
                icon = <FontAwesomeIcon icon={faBiking} />;
                break;
            default:
                icon = <FontAwesomeIcon icon={faGamepad} />;
                break;
        }
        let duration = (this.props.duration / 60).toFixed(2);
        duration =
            duration < 1
                ? `${(duration * 60).toFixed(0)} minutes`
                : `${duration} hours`;
        return (
            <Card className={styles.Card} variant="outlined">
                <CardContent className={styles.CardContent}>
                    <div className={styles.ContentLeft}>
                        <Avatar className={styles.Avatar}>{icon}</Avatar>
                    </div>
                    <div className={styles.ContentRight}>
                        <div className={styles.InnerCard}>
                            <div className={styles.CardHeader}>
                                <FontAwesomeIcon
                                    icon={faRoad}
                                    size="lg"
                                    style={{ color: '#E1DE73' }}
                                />
                                <Typography variant="h6">Distance</Typography>
                            </div>
                            <div className={styles.CardResult}>
                                <span style={{ color: '#E1DE73' }}>
                                    {this.props.distance} km
                                </span>
                            </div>
                        </div>
                        <div className={styles.InnerCard}>
                            <div className={styles.CardHeader}>
                                <FontAwesomeIcon
                                    icon={faStopwatch}
                                    size="lg"
                                    style={{ color: '#CAECA4' }}
                                />
                                <Typography variant="h6">Time</Typography>
                            </div>
                            <div className={styles.CardResult}>
                                <span style={{ color: '#CAECA4' }}>
                                    {duration}
                                </span>
                            </div>
                        </div>
                        <div className={styles.InnerCard}>
                            <div className={styles.CardHeader}>
                                <FontAwesomeIcon
                                    icon={faHeartbeat}
                                    size="lg"
                                    style={{ color: '#F85F43' }}
                                />
                                <Typography variant="h6">Heart Rate</Typography>
                            </div>
                            <div className={styles.CardResult}>
                                <LineChart
                                    data={this.createFakeData()}
                                    svgHeight="150"
                                    svgWidth="500"
                                    color="#F85F43"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardActions className={styles.CardActions}>
                    <FontAwesomeIcon
                        className={
                            this.props.feel === 'smile' ? '' : styles.Opac
                        }
                        icon={faSmile}
                        size="sm"
                    />
                    <FontAwesomeIcon
                        icon={faMeh}
                        size="sm"
                        className={this.props.feel === 'meh' ? '' : styles.Opac}
                    />
                    <FontAwesomeIcon
                        className={
                            this.props.feel === 'frown' ? '' : styles.Opac
                        }
                        icon={faFrown}
                        size="sm"
                    />
                </CardActions>
            </Card>
        );
    }
}
export default ActivityCard;
