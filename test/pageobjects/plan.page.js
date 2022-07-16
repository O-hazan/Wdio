class PlanPage {
  // General

  get planNav() {
    return $(".top-nav__list").$("a=My plan");
  }

  get h1() {
    return $(".page-wrapper h1");
  }

  get h2() {
    return $(".page-wrapper h2");
  }

  // Program
  get btnNewProgram() {
    return $("div=Start new program");
  }

  get btnStartsProgram() {
    return $("div=Start program");
  }

  get btnSave() {
    return $("div[role=dialog] button[type=button]");
  }

  get btnPlanSettings() {
    return $("div=Plan settings");
  }

  get btnEnd() {
    return $(".modal__content").$("div=End");
  }

  get btnEndConfirm() {
    return $(".modal__footer button");
  }

  get programTitle() {
    return $("div[class*=program-training-settings_programTitle]");
  }

  // Calendar
  get thirdCalendarDay() {
    return $(`div[class*="calendar_wrapper"]`).$$(
      `div[class*="calendar_dayWrapper"]`
    )[2];
  }

  get thirdCalendarDate() {
    return $(`div[class*="calendar_wrapper"]`).$$(
      `div[class*="calendar_dateWrapper"]`
    )[2];
  }

  get todayCalendarDate() {
    return $(`div[class*="calendar_wrapper"]`).$$(
      `div[class*="calendar_dateWrapper"]`
    )[0];
  }

  get calendarDots() {
    return $("div[class*=calendar_wrapper]").$$("div[class*=calendar_dot_]");
  }

  get calendarDayWrap() {
    return $("div[class*=calendar_wrapper]").$$(
      "div[class*=calendar_dayWrapper]"
    );
  }

  get calendarDayName() {
    return $("div[class*=calendar_wrapper]").$$("div[class*=calendar_dayName]");
  }

  // Timeline

  get btnTimeline() {
    return $("button[class*=timeline]");
  }

  get timelineDays() {
    return $("div[class*=timeline-modal_wrapper]").$$(
      "div[class*=timeline-modal_dayTitle]"
    );
  }

  get timelineToday() {
    return $("div[class*=timeline-modal_wrapper]").$(
      "div[class*=timeline-modal_dayTitle]"
    );
  }

  get btnCloseTimeline() {
    return $("div[class*=modal_closeWrapper]");
  }

  async startProgram() {
    // remove existing program if there is before starting one
    let exist = await this.btnPlanSettings.isExisting();
    if (exist) {
      await this.removeProgram();
    }
    // Start a program
    await (await this.btnNewProgram).waitForDisplayed();
    await this.btnNewProgram.click();
    await this.btnStartsProgram.waitForDisplayed();
    await this.btnStartsProgram.click();
    await this.btnSave.waitForDisplayed();
    await this.btnSave.click();
    //  Verify program settings and timeline area appears.
    await expect(await $("div[class*=calendar_buttons]")).toBeDisplayed();
    // Verify program stats appear
    await expect(await $("div[class*=header_statsLink]")).toBeDisplayed();
  }

  async removeProgram() {
    await this.btnPlanSettings.waitForDisplayed();
    await this.btnPlanSettings.click();
    await this.btnEnd.waitForDisplayed();
    await this.btnEnd.click();
    await this.btnEndConfirm.waitForDisplayed();
    await this.btnEndConfirm.click();
    await expect(await browser.getTitle()).toBe(
      "Gymondo Online Fitness - Get Fit & Happy at Home"
    );
  }

  async getSelectedCalendarDays() {
    // Collect days that have a dot in the calendar
    const calendarDotsArr = await this.calendarDots;
    let addToday = false;
    let calendarDaysText = [];
    for (let i = 0; i < calendarDotsArr.length; i++) {
      if (
        (await calendarDotsArr[i]
          .parentElement()
          .parentElement()
          .$("div[class*=calendar_dayName]")
          .getText()) == "Today"
      ) {
        addToday = true;
      } else {
        await calendarDaysText.push(
          await calendarDotsArr[i]
            .parentElement()
            .parentElement()
            .$("div[class*=calendar_dayName]")
            .getText()
        );
      }
    }

    // Add today if it has a workout
    if (addToday) {
      const today = new Date();
      let dd = await today.getDay();
      const daysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      dd = daysArr[dd];
      await calendarDaysText.push(dd);
    }
    return calendarDaysText;
  }
}

module.exports = new PlanPage();
