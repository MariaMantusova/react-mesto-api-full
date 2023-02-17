class AuthApi {
    constructor(config) {
        this._url = config.url;
        this._header = config.headers;
    }

    registerUser(password, email) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => console.log(err));
    };

    authorizeUser(password, email) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => console.log(err));
    };

    validityCheck(JWT) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => console.log(err));
    };
}

const authApiOption = {
    url: "https://api.project.mymesto.nomoredomainsclub.ru",
    headers: {
        "Content-Type": "application/json",
    },
}

export const authApi = new AuthApi(authApiOption);
