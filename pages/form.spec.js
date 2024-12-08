class FeedBack {
  constructor(page) {
    this.page = page
    this.feedbackType = page.locator("#label_input_3_0")
    this.decribe = page.locator("#input_4")
    this.firstName = page.locator("#first_8")
    this.lastName = page.locator("#last_8")
    this.email = page.locator("#input_6")
    this.submit = page.locator("#input_9")
  }

  async fillForm(describe, firstName, lastName, email) {
    await this.feedbackType.click()
    await this.decribe.fill(describe);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.submit.waitFor()
    await this.submit.click()
  }
}

module.exports = FeedBack