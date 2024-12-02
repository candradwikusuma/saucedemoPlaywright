class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator('.btn_inventory');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addItem(index) {
    await this.addToCartButtons.nth(index).click();
  }

  async removeItem(index) {
    await this.addToCartButtons.nth(index).click();
  }

  async getButton(index) {
    return await this.addToCartButtons.nth(index).textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;
