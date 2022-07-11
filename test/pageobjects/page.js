module.exports = class Page {
  open(path) {
    return browser.url(`https://www.gymondo.com`);
  }
};
