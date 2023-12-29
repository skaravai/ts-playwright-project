import { Page } from "@playwright/test";

export class SignInPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async signInToAccount(email: string, password: string) {
        const emailInput = this.page.locator('[placeholder="Work email"]')
        const passwordInput = this.page.locator('[placeholder="Password"]')
        const signInButton = this.page.getByRole('button', { name: 'Sign in' })

        await emailInput.fill(email)
        await passwordInput.fill(password)
        await signInButton.click()

        await this.page.waitForURL('**/projects')
    }

    async enterEmail(email: string) {
        const emailInput = this.page.locator('[placeholder="Work email"]')
        await emailInput.fill(email)
    }

    async enterPassword(password: string) {
        const passwordInput = this.page.locator('[placeholder="Password"]')
        await passwordInput.fill(password)
    }

    async signInButtonClick() {
        const signInButton = this.page.locator('span', { hasText: 'Sign in' })
        await signInButton.first().click()
    }
}