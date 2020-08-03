![image](https://storage.googleapis.com/perimeterx-logos/primary_logo_red_cropped.png)
# [PerimeterX](http://www.perimeterx.com) Advanced Blocking Response React Sample Application
> This repository contains a sample React application that uses Axios and Fetch with the Advanced Blocking Response feature. A running example can be seen at https://www.superfun.xyz.

![Superfun](./public/superfun.gif?raw=true)
## What Is Advanced Blocking Response?
In special cases, (such as XHR post requests) a full Captcha page render might not be an option. In such cases, using the Advanced Blocking Response returns a JSON object containing all the information needed to render your own Captcha challenge implementation, be it a popup modal, a section on the page, etc.
Advanced Blocking Response occurs when a request that is marked for blocking contains an `Accept` header with the value of `application/json`. It returns a JSON with the following structure:
```javascript
{
    "appId": String,
    "jsClientSrc": String,
    "firstPartyEnabled": Boolean,
    "vid": String,
    "uuid": String,
    "hostUrl": String,
    "blockScript": String
}
```
## Integration
### General Integration
To render the challenge element upon receiving an Advanced Blocking Response (ABR):
1. In your networking layer, make sure you handle errors and verify the response code received. An ABR always has the 403 status code.
2. Add the following `window` object properties:
    ```javascript
    window._pxAppId = '<appId>'; // PerimeterX's application id
     window._pxJsClientSrc = '<jsClientSrc>'; // PerimeterX's JavaScript sensor url
     window._pxFirstPartyEnabled = <firstPartyEnabled>; // A boolean flag indicating whether first party is enabled or not
     window._pxVid = '<vid>'; // PerimeterX's visitor id
     window._pxUuid = '<uuid>'; // PerimeterX's unique user id
     window._pxHostUrl = '<hostUrl>'; // PerimeterX's cloud component URL
    ```
    > The values for the properties can be found in the ABR object.
3. Add an empty `div` element with an `id` attribute of `px-captcha` to the location in the page where the Captcha will be rendered. For example:
    ```javascript
    const pxDiv = document.createElement('div');
    pxDiv.id = 'px-captcha';
    challengeDiv.appendChild(pxDiv);
    ```
4. Load the challenge script dynamically to the app. The script location can be found in the `blockScript` property of the ABR response. An example for dynamic loading is as follows:
    ```javascript
    let script = document.createElement('script');
    script.src = data.blockScript; // use the blockScript property from the Advanced Blocking Response result.
    document.getElementsByTagName('head')[0].appendChild(script);
    ```
### React Integration
Rendering a challenge from an Advanced Blocking Response (ABR) in a React application can be done in several ways depending on the architecture of the app. In this demo app we will show two such ways:
-   Using an `Axios` response interceptor.
-   Using `Fetch`.
#### Axios
[`axiosService.js`](https://github.com/PerimeterX/perimeterx-abr-react-demo-app/blob/master/src/services/axiosService.js) demonstrates how to integrate ABR using a response interceptor. This method is used for the activities feed loading network call. Once a call is made using `Axios`, the response hits the interceptor which, in turn, checks the status and data of the response. If the status code equals `403`, and the data contains `appId` and `blockScript` (two unique keys for an ABR) it calls the [`handlePxResponse()`](https://github.com/PerimeterX/perimeterx-abr-react-demo-app/blob/master/src/services/axiosService.js#L23) method.
Once called, `handlePxResponse` will:
1. Set the mandatory `window` object properties (as listed in step 2 of the [General Integration](#General Integration))
2. Create a `script` element and set its `src` property to the value of the `blockScript` property from the ABR object.
3. Create the `div` element where the PerimeterX block script will render the challenge.
4. Append the `div` element to the DOM and append the `blockScript` to the `head` element and execute it.
#### Fetch
[`fetchService.js`](https://github.com/PerimeterX/perimeterx-abr-react-demo-app/blob/master/src/services/FetchService.js) demonstrates how to integrate ABR using es6 `fetch`. This method is used for the login network call. Once a call is made using `fetch`, the service returns an object containing the status code and the body of the response that the original caller can use to determine what should be done next. In ABR's case, follow the same steps as the `Axios` integration.
## See It In Action
This webapp can be seen running at https://www.superfun.xyz.
There is only one username/password combo that works 😈😈😈
