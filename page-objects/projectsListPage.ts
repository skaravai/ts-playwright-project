import { Locator, Page } from "@playwright/test";

export class ProjectsListPage{

    readonly page: Page
    readonly createNewProjectButton: Locator
    readonly projectNameInput: Locator
    readonly projectCodeInput: Locator
    readonly createProjectButton: Locator

    constructor(page: Page){
        this.page = page
        this.createNewProjectButton = page.locator('#createButton')
        this.projectNameInput = page.locator('#project-name')
        this.projectCodeInput = page.locator('#project-code')
        this.createProjectButton = page.locator('span', { hasText: 'Create project' })
    }

    // This method creates a new project
    async createNewProject() {
        await this.createNewProjectButton.click()
        await this.projectNameInput.fill(Math.random().toString(36).substring(2,7))
        await this.projectCodeInput.fill(Math.random().toString(36).substring(3,6))
        await this.createProjectButton.click()
        await this.page.waitForSelector('h3:has-text("Create new project")')
    }
}