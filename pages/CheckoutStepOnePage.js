export class CheckoutStepOnePage {

    constructor(page) {

        this.page = page;

        this.firstnameInput = page.locator('[data-test="firstName"]');
        this.lastnameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstnameInput.fill(firstName);
        await this.lastnameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();;
    }
}