const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage.spec');
const InventoryPage = require('../pages/inventoryPage.spec');
const testData = require('../testData/credentialData.json')
let amountAddItem

test.describe('Select Items', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should be show badge at cart when add items to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItem(0);
    await inventoryPage.addItem(1);
    expect(await inventoryPage.cartBadge.innerText()).toBe('2');
  });


  test('should be show remove button when add items to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItem(0);
    await inventoryPage.addItem(1);
    expect(await inventoryPage.getButton(1)).toBe('Remove')
  });

  test('success reduced items in cart when removing items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItem(0);
    await inventoryPage.addItem(1);
    expect(await inventoryPage.cartBadge.innerText()).toBe('2');
    await inventoryPage.removeItem(1)
    expect(await inventoryPage.cartBadge.innerText()).toBe('1');
  });

  test('should be show the 2 of items in the cart when adding 2 item to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    amountAddItem = 2
    for (let item = 0; item < amountAddItem; item++) {
      await inventoryPage.addItem(item);
    }
    const badgeValue = await inventoryPage.cartBadge.innerText()
    const amountCart = parseInt(badgeValue);
    expect(amountCart).toBe(amountAddItem);
  });

  test('should be show the 3 of items in the cart when adding 3 item to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    amountAddItem = 3
    for (let item = 0; item < amountAddItem; item++) {
      await inventoryPage.addItem(item);
    }
    const badgeValue = await inventoryPage.cartBadge.innerText()
    const amountCart = parseInt(badgeValue);
    expect(amountCart).toBe(amountAddItem);
  });

  test('should be show the 4 of items in the cart when adding 4 item to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    amountAddItem = 4
    for (let item = 0; item < amountAddItem; item++) {
      await inventoryPage.addItem(item);
    }
    const badgeValue = await inventoryPage.cartBadge.innerText()
    const amountCart = parseInt(badgeValue);
    expect(amountCart).toBe(amountAddItem);
  });

});
