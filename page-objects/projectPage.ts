import { Locator, Page } from "@playwright/test";

export class ProjectPage {

    readonly page: Page
    readonly newCaseButton: Locator

    constructor(page: Page) {
        this.page = page
        this.newCaseButton = page.locator('#create-case-button')
    }

    async clickCreateNewCaseButton(){
        await this.page.waitForSelector('#create-case-button')
        await this.newCaseButton.click()
    }
}
