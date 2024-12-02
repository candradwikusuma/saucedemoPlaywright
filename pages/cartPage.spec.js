class CartPage {
  constructor(page) {
    this.page = page;
    this.removeButtons = page.locator('.cart_button');
    this.checkoutButton = page.locator('#checkout');
  }

  async removeItem(index) {
    await this.removeButtons.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
