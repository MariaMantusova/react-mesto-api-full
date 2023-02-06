class Api {
    constructor(config) {
        this._url = config.url;
        this._token = config.token;
        this._header = config.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    changeUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    saveNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._header,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._header,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._header,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }

    changeProfilePhoto(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => Promise.reject(err));
    }
}

const apiOption = {
    url: 'https://nomoreparties.co/v1/cohort-52',
    token: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
    headers: {
        authorization: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
        'Content-Type': 'application/json',
    },
}

export const api = new Api(apiOption);