describe("Current button", () => {
  it("Verify current button exists", async () => {
    browser.url("/");
    let btn = await $("button");
    expect(await btn.getText()).toEqual("Current City");
    expect(await btn.isDisplayed()).toEqual(true);
  });

  it("Verify clicking on current button shows a message ", async () => {
    browser.url("/");
    let btn = await $("button");
    let cityName = await $("h1");
    expect(await cityName.toBeClickable);
    await btn.click();
  });
});

describe("Search", () => {
  it("Verify submit btn is disabled when text is entered", async () => {
    browser.url("/");
    let input = $("#searchBox");
    let searchSub = $(".searchSub");
    await expect(searchSub).toBeDisabled();
    await input.click();
    await input.setValue("tel aviv");
    await expect(searchSub).toBeEnabled();
    await browser.pause(3000);
  });

  it("Verify searching for valid city updates the city name", async () => {
    browser.url("/");
    let input = $("#searchBox");
    let searchSub = $(".searchSub");
    let cityName = $("#city");
    await input.setValue("tel aviv");
    await searchSub.click();
    await browser.pause(1000);
    expect(await cityName.getText()).toEqual("Tel Aviv");
  });

  it("Verify searching for invalid city pops up alert", async () => {
    browser.url("/");
    let input = $("#searchBox");
    let searchSub = $(".searchSub");
    let cityName = $("#city");
    let CurrentCityName = cityName.getText();
    await input.setValue("asd");
    await searchSub.click();
    await browser.pause(1000);
    expect(await browser.isAlertOpen()).toEqual(true);
    expect(await browser.getAlertText()).toEqual("City Not Found");
    await browser.acceptAlert();
    expect(await browser.isAlertOpen()).toEqual(false);
  });
});
