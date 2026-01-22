export class InventoryPage {

    constructor(page) {

        this.page = page;

        this.titlePage = page.locator('[data-test="title"]');
        this.iconCart = page.locator('[data-test="shopping-cart-link"]');
        this.listOfItems = page.locator('[data-test="inventory-list"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    }

    async addFirstItemToCart() {
        const firstAddButton = this.page
            .locator('[data-test^="add-to-cart-"]')
            .first();

        await firstAddButton.click();
    }

    async sortByPriceHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }

    async openCart() {
        await this.iconCart.click();
    }

    async getPageTitle() {
        return await this.titlePage.textContent();
    }

    async getFirstItemName() {
        const firstItem = this.page.locator('[data-test="inventory-item-name"]').first();
        return await firstItem.textContent();
    }
}