import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
    await page.goto('https://qase.io/')
})

test('Сreation a new test case', async ({ page }) => {

    const pm = new PageManager(page)

    // 1. Clicking login button on the welcome page
    await pm.onWelcomePage().clickLoginButton()
    expect(page.url()).toContain('https://app.qase.io/login')
    await page.waitForLoadState();

    // 2. Signing In
    const userEmail = 'bmtstg+playwright@gmail.com'
    const userPass = 'Tester123#!@'
    await pm.onSignInPage().signInToAccount(userEmail, userPass)
    expect(page.url()).toBe('https://app.qase.io/projects')

    // 3. Creating new project
    await pm.onProjectsListPage().createNewProject()

    // 4. Creating new test case in the created project
    let testTitleName = Math.random().toString(36).slice(1, 6)
    await pm.onProjectPage().clickCreateNewCaseButton()
    await pm.onCreationNewCasePage().createNewCase(testTitleName)

    // 5. Checking that the test case was successfully created and displayed in the list 
    const testCaseBlock = page.locator('#suitecases-container').getByText(testTitleName)  
    await expect(testCaseBlock).toBeVisible()

    page.close()

})