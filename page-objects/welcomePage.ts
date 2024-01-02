import { Page } from "@playwright/test";

export class WelcomePage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // This method clicks login button on the Welcome page (https://qase.io/')

    async clickLoginButton(){
        const loginButton = this.page.getByText('Login')
        await loginButton.click()
    }
}