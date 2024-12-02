const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage.spec');
const testData = require('../testData/credentialData.json')

test.describe('Login', () => {
  test('should be success login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should be error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.invalidCredentials.username, testData.invalidCredentials.password);
    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('should be error with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.invalidCredentials.username, testData.validCredentials.password);
    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
  });


  test('should be error with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.validCredentials.username, testData.invalidCredentials.password);
    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('should be error with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.login('', testData.validCredentials.password)
    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username is required')
  })

  test('should be error with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.login(testData.validCredentials.password, '')
    expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Password is required")
  })

  test('should be error with empty username and password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.login('', '')
    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username is required')
  })

  test('should be error with locked outuser', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password)
    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.')
  })
});
