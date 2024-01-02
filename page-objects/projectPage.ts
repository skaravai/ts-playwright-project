import { Page } from "@playwright/test";

export class ProjectPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickCreateNewCaseButton(){
        const newCaseButton = this.page.locator('#create-case-button')
        await this.page.waitForSelector('#create-case-button')
        await newCaseButton.click()
    }
}
