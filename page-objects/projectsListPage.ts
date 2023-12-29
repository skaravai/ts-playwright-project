import { Page } from "@playwright/test";

export class ProjectsListPage{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async createNewProject(){
        const createNewProjectButton = this.page.locator('#createButton')
        const projectNameInput = this.page.locator('#project-name')
        const projectCodeInput = this.page.locator('#project-code')
        const createProjectButton = this.page.locator('span', { hasText: 'Create project' })
        //const popupOpened = this.page.locator('h3', { hasText: 'Create new project' })
        await createNewProjectButton.click()
        await projectNameInput.fill(Math.random().toString(36).substring(2,7))
        await projectCodeInput.fill(Math.random().toString(36).substring(3,6))
        await createProjectButton.click()

        await this.page.waitForSelector('h3:has-text("Create new project")')
    }
}