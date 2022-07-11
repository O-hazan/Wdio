const Page = require("./page");

class LoginPage extends Page {
  get loginBtn() {
    return $(".top-nav").$("div=Log in");
  }

  get inputUsername() {
    return $("#mail");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get btnAccept() {
    return $("div=Accept");
  }

  get btnGotIt() {
    return $(".modal__content").$("div=Got it");
  }

  async login(username, password) {
    await this.open();
    browser.maximizeWindow();
    await this.btnAccept.click();
    await this.loginBtn.click();
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
    await this.btnGotIt.click();
  }

  open() {
    return super.open();
  }
}

module.exports = new LoginPage();
