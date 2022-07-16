const Page = require("./page");

const homePageUrl = "https://www.gymondo.com/";
const homePageUrlLoggedin = "https://www.gymondo.com/train/timeline";
const browserTitle = "Gymondo Online Fitness - Get Fit & Happy at Home";

class LoginPage extends Page {
  get loginBtn() {
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
    await this.open();
    await browser.maximizeWindow();
    await expect(browser).toHaveUrlContaining(homePageUrl);
    await expect(browser).toHaveTitle(browserTitle);
    await this.btnAccept.waitForDisplayed();
    await this.btnAccept.click();
    await this.loginBtn.waitForDisplayed();
    await this.loginBtn.click();
    await this.inputUsername.waitForDisplayed;
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.inputPassword.waitForDisplayed;
    await this.btnSubmit.waitForDisplayed();
    await this.btnSubmit.click();
    // browser.debug();
    await this.btnGotIt.waitForDisplayed();
    await this.btnGotIt.click();
    // console.log(isLoggedIn);
    return browser.getUrl !== homePageUrlLoggedin;
    // return isLoggedIn;
  }

  open() {
    return super.open();
  }
}

module.exports = new LoginPage();
