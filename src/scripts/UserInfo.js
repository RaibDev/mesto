export default class UserInfo {
  constructor(nameSelector, infoYourselfSelector, avatarSelector) {
    // this._nameSelector = nameSelector;
    // this._infoYourselfSelector = infoYourselfSelector;
    this._inputProfileName = document.querySelector(nameSelector);
    this._inputProfileInfo = document.querySelector(infoYourselfSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this.userInfoObj = {};
    this.userInfoObj.name = this._inputProfileName.textContent;
    this.userInfoObj.info = this._inputProfileInfo.textContent;

    return this.userInfoObj;
  }

  setUserInfo(data) {
    this._inputProfileInfo.textContent = data.about;
    this._inputProfileName.textContent = data.name;
    this.setAvatar(data);
  }

  setAvatar(data) {
    this._avatarSelector.style.backgroundImage = `url(${data.avatar}`;
  }
}