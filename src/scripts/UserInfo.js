export default class UserInfo {
  constructor(nameSelector, infoYourselfSelector) {
    this._nameSelector = nameSelector;
    this._infoYourselfSelector = infoYourselfSelector;
  }

  getUserInfo() {
    const userInfoObj = {};
    userInfoObj.name = this._inputProfileName.value;
    userInfoObj.info = this._inputProfileInfo.value;

    return userInfoObj;
  }

  setUserInfo(data) {
    this._inputProfileName = document.querySelector(this._nameSelector);
    this._inputProfileInfo = document.querySelector(this._infoYourselfSelector);
  
    this._inputProfileInfo.textContent = data.info;
    this._inputProfileName.textContent = data.name;

  }
}