const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage.spec');
const InventoryPage = require('../pages/inventoryPage.spec');
const CartPage = require('../pages/cartPage.spec');
const CheckoutPage = require('../pages/checkoutPage.spec');
const SuccessPage = require('../pages/successPage.spec');
const selectRandomItems = require('../utils/randomItemSelector.spec');
const testData = require('../testData/credentialData.json')

test.describe('Full Flow Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should be success checkout with valid checkout information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const totalItems = await inventoryPage.addToCartButtons.count();
    const randomItems = selectRandomItems(totalItems, 3);
    for (const index of randomItems) {
      await inventoryPage.addItem(index);
    }

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    const cartPage = new CartPage(page);
    await cartPage.removeItem(0);
    expect(await inventoryPage.cartBadge.innerText()).toBe('2');

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm(testData.dataProfile.firstName, testData.dataProfile.lastName, testData.dataProfile.postalCode);

    await expect(page).toHaveURL(/.*checkout-step-two/);
    await checkoutPage.finishCheckout();

    const successPage = new SuccessPage(page);
    expect(await successPage.successBanner.innerText()).toBe('Thank you for your order!');
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });
})