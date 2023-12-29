import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
    await page.goto('https://qase.io/')
})

test('checking creation new test case', async ({ page }) => {

    const pm = new PageManager(page)

    // Clicking login button on the welcome page
    await page.getByText('Login').click()
    expect(page.url()).toContain('https://app.qase.io/login')
    await page.waitForLoadState();

    // Signing In
    const userEmail = 'bmtstg+playwright@gmail.com'
    const userPass = 'Tester123#!@'
    await pm.onSignInPage().signInToAccount(userEmail, userPass)
    expect(page.url()).toBe('https://app.qase.io/projects')

    // Creating new project
    await pm.onProjectsListPage().createNewProject() //добавить перемнную

    // Creating new test case
    let testTitleName = Math.random().toString(36).slice(1, 6)
    await pm.onProjectPage().createNewCase(testTitleName)

    // Checking that the test case was successfully created and displayed in the list
    const testCaseBlock = page.locator('#suitecases-container').getByText(testTitleName)  
    await expect(testCaseBlock).toBeVisible()

})