const { test, expect } = require('@playwright/test');

test.describe('Авторизация на Sauce Demo', () => {

    test('Пользователь должен успешно войти в систему', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');

        await page.locator('[placeholder="Password"]').fill('secret_sauce');

        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Пользователь заблокирован, не может войти в систему', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('locked_out_user');

        await page.locator('[placeholder="Password"]').fill('secret_sauce');

        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    });
});
