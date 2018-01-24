export default class Api {
    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    static get(isEmulator, route) {
        return this.request(isEmulator, route, null, 'GET');
    }

    static put(isEmulator, route, params) {
        return this.request(isEmulator, route, params, 'PUT')
    }

    static post(isEmulator, route, params) {
        return this.request(isEmulator, route, params, 'POST')
    }

    static delete(isEmulator, route, params) {
        return this.request(isEmulator, route, params, 'DELETE')
    }

    static request(isEmulator, route, params, verb) {
        //const host= isEmulator?'http://10.0.2.2:3000/':'http://192.168.0.104:3000/';
        const host = 'http://10.0.2.2:3000/';
        const url = `${host}${route}`;
        console.log(url);
        let options =
            Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
        options.headers = Api.headers();
        return fetch(url, options)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
    }
}
