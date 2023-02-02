export default class UserInfo {
  constructor(nameSelector, infoYourselfSelector) {
    // this._nameSelector = nameSelector;
    // this._infoYourselfSelector = infoYourselfSelector;
    this._inputProfileName = document.querySelector(nameSelector);
    this._inputProfileInfo = document.querySelector(infoYourselfSelector);
  }

  getUserInfo() {
    this.userInfoObj = {};
    this.userInfoObj.name = this._inputProfileName.textContent;
    this.userInfoObj.info = this._inputProfileInfo.textContent;

    return this.userInfoObj;
  }

  setUserInfo(data) {
    this._inputProfileInfo.textContent = data.info;
    this._inputProfileName.textContent = data.name;

  }
}