class SuccessPage {
  constructor(page) {
    this.page = page;
    this.successBanner = page.locator('.complete-header')
    this.homButton = page.locator('.back-to-products')
  }

  async goToHome() {
    await this.finishButton.click();
  }
}

module.exports = SuccessPage;
