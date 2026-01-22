import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';


test('Успешный логин и проверка страницы товаров', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);


    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    const pageTitle = await inventoryPage.getPageTitle();
    await expect(pageTitle).toBe('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await inventoryPage.sortByPriceHighToLow();
    const firstItemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addFirstItemToCart();

    await inventoryPage.openCart();

    const cartItemName = await cartPage.getFirstItemName();
    await expect(cartItemName).toBe(firstItemName);

    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.clickContinue();

    await checkoutStepTwoPage.finishCheckout();

    const confirmationText = await checkoutCompletePage.getCompletionMessage();
    await expect(confirmationText).toBe('Thank you for your order!');

});