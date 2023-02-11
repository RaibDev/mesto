export default class Section {
  constructor({renderer }, selector) {
    // this._dataItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(params) {    // Вставляет в разметку контейнера переданные данные из карточки
    this._container.prepend(params);
  }

  clear() {           //   Удалить
    this._container.innerHTML = '';
  }

  renderItems(data, userId) {    
    // this.clear();
    // this._renderer(this._dataItems);
    this._renderer(data, userId);
  }
}