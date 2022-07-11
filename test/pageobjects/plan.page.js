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

  async startProgram() {
    // remove existing program if there is before starting one (should be extended to remove dynamic amount of programs by various variables)
    let exist = await this.btnPlanSettings.isExisting();
    if (exist === true) {
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
}

module.exports = new PlanPage();
