import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Feed.module.css';
import ActivityCard from '../../components/UI/ActivityCard/ActivityCard';
import FetchService from '../../services/FetchService';
import Modal from '../../components/UI/Modal/Modal';
import Challenge from '../../components/UI/Challenge/Challenge';
import Reload from '../../components/UI/Reload/Reload';

class Feed extends Component {
    state = {
        loading: true,
        activities: [],
        showChallenge: false,
        refId: '',
    };

    async getFeed() {
        const result = await FetchService.makeRequest('/api/feed', 'GET');
        if (result.status === 403) {
            //handle PX
            this.handlePxResponse(result.body);
            this.setState({
                showChallenge: true,
                loading: false,
                refId: result.body.uuid,
            });
        } else {
            this.setState({
                loading: false,
                activities: result.body,
                showChallenge: false,
            });
        }
    }

    async componentDidMount() {
        await this.getFeed();
    }

    challengeCancelHandler = () => {
        document.querySelector('#px-captcha').remove();
        this.setState({ showChallenge: false });
    };

    reloadContent = async () => {
        window.location.reload();
    };

    handlePxResponse = (data) => {
        window._pxAppId = `${data.appId}`; // PerimeterX's application id
        window._pxJsClientSrc = `${data.jsClientSrc}`; // PerimeterX's JavaScript sensor url
        window._pxFirstPartyEnabled = data.firstPartyEnabled; // A boolean flag indicating wether first party is enabled or not
        window._pxVid = `${data.vid}`; // PerimeterX's visitor id
        window._pxUuid = `${data.uuid}`; // PerimeterX's unique user id
        window._pxHostUrl = `${data.hostUrl}`; // PerimeterX's cloud component URL
        let script = document.createElement('script');
        script.src = data.blockScript; // use the blockScript property from the Advanced Blocking Response result.
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    render() {
        let body = this.state.loading ? (
            <Spinner />
        ) : this.state.activities.length === 0 &&
          !this.state.showChallenge &&
          !this.state.loading ? (
            <Reload refresh={this.reloadContent} />
        ) : (
            this.state.activities.map((a) => (
                <ActivityCard
                    key={a.id}
                    activity={a.activity}
                    distance={a.distance}
                    duration={a.duration}
                    feel={a.feeling}
                />
            ))
        );
        return (
            <Aux>
                <Modal show={this.state.showChallenge}>
                    <Challenge
                        refId={this.state.refId}
                        modalClosed={this.challengeCancelHandler}
                    />
                </Modal>
                <div className={styles.Feed}>
                    <div className={styles.Left}></div>
                    <div className={styles.Center}>{body}</div>
                    <div className={styles.Right}></div>
                </div>
            </Aux>
        );
    }
}

export default Feed;
