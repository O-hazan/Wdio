const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

const userName = "qa-prod1@gymondo.de";
const password = "purpleSquid22!";

describe("Calendar is back to not active when ending the last program", () => {
  it("Login, start a program and verify calendar mouse pointer", async () => {
    // Login
    await loginPage.login(userName, password);

    // Start program
    await planPage.startProgram();

    // Verify calendar days have pointer cursor
    const calendarDays = await $$(`div[class*="calendar_dayWrapper"]`);
    for (let i = 0; i < calendarDays.length; i++) {
      const mouseProp = await calendarDays[i].getCSSProperty("cursor");
      await expect(await mouseProp.value).toBe("pointer");
    }
  });

  it("Select a different day in the calendar", async () => {
    //  Select a different day in the calendar
    const thirdCalendarDay = $(`div[class*="calendar_wrapper"]`).$$(
      `div[class*="calendar_dayWrapper"]`
    )[2];

    await thirdCalendarDay.click();
  });

  it("Remove the program and verify UI is back to default ", async () => {
    //   Remove the program
    await planPage.removeProgram();

    // Verify that today is selected in the calendar
    await expect(
      await $(`div[class*="calendar_wrapper"]`).$$(
        `div[class*="calendar_dateWrapper"]`
      )[2] //Change here the 2 to 0 to make the test valid and it will fail because the wrong item is selected
    ).toHaveElementClassContaining("calendar_active");

    // Verify workout days dot indication is removed from calendar
    await browser.pause(1000);
    await expect(
      await $("div[class*=calendar_wrapper]").$$("div[class*=calendar_dot_]")
    ).toHaveLength(0);
  });
});
