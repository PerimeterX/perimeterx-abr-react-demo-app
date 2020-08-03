const baseUrl = 'https://www.superfun.xyz';

class FetchService {
    static async makeRequest(path, method) {
        const response = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: {
                Accept: 'application/json',
            },
        });

        // return the status code and body of the request. Works for both errors (4xx) or valid (200) requests.
        return {
            status: response.status,
            body: await response.json(),
        };
    }
}

export default FetchService;
