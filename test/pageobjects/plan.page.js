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

  async startProgram() {
    await this.btnNewProgram.waitForDisplayed(2000);
    await this.btnNewProgram.click();
    await this.btnStartsProgram.click();
    await this.btnSave.click();
  }

  async removeProgram() {
    await this.btnPlanSettings.waitForDisplayed(2000);
    await this.btnPlanSettings.click();
    await this.btnEnd.click();
    await this.btnEndConfirm.click();
  }
}

module.exports = new PlanPage();
