import { Locator, Page } from "@playwright/test";

export class SignInPage {

    readonly page: Page
    readonly emailInput: Locator 
    readonly passwordInput: Locator
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.locator('[placeholder="Work email"]')
        this.passwordInput = page.locator('[placeholder="Password"]')
        this.signInButton = page.getByRole('button', { name: 'Sign in' })
    }

    /**
    * This method fill out the inline form with user details
    * @param email - valid email for the test user account
    * @param password - valid pass for the test user account
    */
    
    async signInToAccount(email: string, password: string) {
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.signInButtonClick()
        await this.page.waitForURL('**/projects')
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email)
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async signInButtonClick() {
        await this.signInButton.first().click()
    }
}