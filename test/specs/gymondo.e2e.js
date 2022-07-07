describe("My Plan", () => {
  it("Should login and verify user is on My plan tab", async () => {
    browser.url("");
    browser.maximizeWindow();
    await expect(browser).toHaveTitle(
      "Gymondo Online Fitness - Get Fit & Happy at Home"
    );
    await (await $("div=Accept")).click();
    await (await $(".top-nav").$("div=Log in")).click();
    await $("#mail").setValue("qa-prod1@gymondo.de");
    await $("#password").setValue("purpleSquid22!");
    await (await $("form")).$("div=Log in").click();
    const topNav = await $(".top-nav__list").$("a=My plan");
    await expect(topNav).toHaveAttribute("aria-current", "page");
  });

  it("Should start a new program", async () => {
    await (await $(".modal__content")).$("div=Got it").click();
    await (await $("div=Start new program")).waitForDisplayed(5000);
    await (await $("div=Start new program")).click();
    await (await $("div=Start program")).click();
    await (
      await $(".modal__content").$(".modal__footer").$("div=Save")
    ).click();
    await browser.pause(5000);
    // expect(await btn.getText()).toEqual("Current City");
    // expect(await btn.isDisplayed()).toEqual(true);
  });
});

// Bug found - Removing all plans and navigating back - endless lading.
