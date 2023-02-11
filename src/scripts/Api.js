export default class Api {
  constructor({url, headers}) {
    this._url= url;
    this._headers = headers;
  }

  _checkPromise(response) {
      if(response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
  }

  _rejectPromise(err) {
    console.log(err);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
    
  }

  changeUserInfo(formData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

  changeUserAvatar(formData) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: formData.avatar
      })
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(response => this._checkPromise(response))
      .catch(error => this._rejectPromise(error));
  }

}

//   https://mesto.nomoreparties.co/v1/cohort-58/
// 224c0bf1-3fa1-420b-9667-0b1a7afec2fe