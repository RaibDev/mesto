export default class Section {
  constructor({items, renderer }, selector) {
    this._dataItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(params) {    // Вставляет в разметку контейнера переданные данные из карточки
    this._container.prepend(params);
  }

  clear() {           //   Удалить
    this._container.innerHTML = '';
  }

  renderItems() {    
    this.clear();
    this._renderer(this._dataItems);
  }
}