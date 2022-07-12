class PlanPage {
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

  get calendarDays() {
    return $("div[class*=calendar_wrapper]").$$("div[class*=calendar_dot_]");
  }


  async startProgram() {
    // remove existing program if there is before starting one (should be extended to remove dynamic amount of programs by various variables)
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
  }

  async removeProgram() {
    await this.btnPlanSettings.waitForDisplayed();
    await this.btnPlanSettings.click();
    await this.btnEnd.waitForDisplayed();
    await this.btnEnd.click();
    await this.btnEndConfirm.waitForDisplayed();
    await this.btnEndConfirm.click();
  }

  async getSelectedCalendarDays() {
    // Collect days that have a dot in the calendar
    const calendarDays = await this.calendarDays;
    let addToday = false;
    let calendarDaysText = [];
    for (let i = 0; i < calendarDays.length; i++) {
      if (calendarDays[i] == "Today") {
        addToday = true;
      } else {
        await calendarDaysText.push(
          await calendarDays[i]
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
