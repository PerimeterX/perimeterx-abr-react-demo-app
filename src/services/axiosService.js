import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.superfun.xyz',
});

// response interceptor to handle PerimeterX block responses
instance.interceptors.response.use(
    (res) => res,
    (error) => {
        if (
            error.response.status === 403 &&
            error.response.data &&
            error.response.data.appId &&
            error.response.data.blockScript
        ) {
            handlePxResponse(error.response.data);
        }
        return Promise.reject({ ...error });
    }
);

const handlePxResponse = (data) => {
    // Mandatory window properties
    window._pxAppId = `${data.appId}`; // PerimeterX's application id
    window._pxJsClientSrc = `${data.jsClientSrc}`; // PerimeterX's JavaScript sensor url
    window._pxFirstPartyEnabled = data.firstPartyEnabled; // A boolean flag indicating wether first party is enabled or not
    window._pxVid = `${data.vid}`; // PerimeterX's visitor id
    window._pxUuid = `${data.uuid}`; // PerimeterX's unique user id
    window._pxHostUrl = `${data.hostUrl}`; // PerimeterX's cloud component URL

    // new script element which is used to loada the PerimeterX challenge script
    let script = document.createElement('script');
    script.src = data.blockScript; // use the blockScript property from the Advanced Blocking Response result.

    // the div in which the PerimeterX challenge script will render the challenge
    let div = document.createElement('div');
    div.setAttribute('id', 'px-captcha');

    // adding the elements to the page
    document.querySelector('#pxElement').appendChild(div);
    document.getElementsByTagName('head')[0].appendChild(script);
};

export default instance;
