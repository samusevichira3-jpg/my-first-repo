export class CheckoutStepTwoPage {

    constructor(page) {

        this.page = page;

        this.orderInformation = page.locator('[data-test="checkout-summary-container"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}