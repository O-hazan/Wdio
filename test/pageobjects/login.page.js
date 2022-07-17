const Page = require("./page");

class LoginPage extends Page {
  get btnLogin() {
    return $(".top-nav").$("div=Log in");
  }

  get inputUsername() {
    return $("div[class*=login-modal-module--content]").$("#mail");
  }

  get inputPassword() {
    return $("div[class*=login-modal-module--content]").$("#password");
  }

  get btnSubmit() {
    return $("div[class*=login-modal-module--content]").$(
      'button[type="submit"]'
    );
  }

  get btnAccept() {
    return $("div[class*=cookie-consent]").$("div=Accept");
  }

  get btnGotIt() {
    return $("div=Got it");
  }

  async login(username, password) {
    const mock = await browser.mock(
      "https://www.gymondo.com/api/v2/oauth/token?locale=en_US"
    );
    await this.open();
    await browser.maximizeWindow();
    await browser.pause(1000);
    await this.btnAccept.waitForDisplayed();
    await this.btnAccept.click();
    await this.btnLogin.waitForDisplayed();
    await this.btnLogin.click();
    await this.inputUsername.waitForDisplayed;
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.inputPassword.waitForDisplayed;
    await this.btnSubmit.waitForDisplayed();
    await this.btnSubmit.click();
    await browser.pause(1000);
    if (mock.matches[0].statusCode !== 200) {
      throw new Error("Login failed");
    }
    await this.btnGotIt.waitForDisplayed();
    await this.btnGotIt.click();
    return mock.matches[0].statusCode === 200;
  }

  open() {
    return super.open();
  }
}

module.exports = new LoginPage();
