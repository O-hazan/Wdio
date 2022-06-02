describe("Current button", () => {
  it("Verify current button exists", async () => {
    browser.url("/");
    let btn = await $("button");
    expect(await btn.getText()).toEqual("Current City");
    expect(await btn.isDisplayed()).toEqual(true);

    console.log(btn);
  });

  it("Verify clicking on current button shows a message ", async () => {
    browser.url("/");
    let btn = await $("button");
    let cityName = await $("h1");
    await btn.click();
    await browser.pause(8000);
    await cityName.waitForDisplayed({ timeout: 3000 });
    expect(await cityName.getText()).toEqual("omer");
  });
});

// npm run test -- --spec ./test/specs/weather.e2e.js
// --spec ./test/specs/weather.e2e.js

// wdio run wdio.conf.js --spec /test/specs/weather.e2e.js

// npx wdio run wdio.conf.js --spec .test/specs/weather.e2e.js
