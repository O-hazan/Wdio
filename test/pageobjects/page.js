module.exports = class Page {
  open() {
    return browser.url(`/`);
  }
};
