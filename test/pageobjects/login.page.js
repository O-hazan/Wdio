const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
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

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
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

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("");
  }
}

module.exports = new LoginPage();
