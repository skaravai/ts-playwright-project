import { Page } from "@playwright/test";
import path from "path";

export class ProjectPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async createNewCase(titleName: string) {
        const newCaseButton = this.page.locator('#create-case-button')
        const titleInput = this.page.locator('#title')

        await this.page.waitForSelector('#create-case-button')
        await newCaseButton.click()

        const statusList = this.page.locator('#\\30-status')
        const severityList = this.page.locator('#\\30-severity')
        const descriptionInput = this.page.locator('#\\30-description')
        const priorityList = this.page.locator('#\\30-priority')
        const typeList = this.page.locator('#\\30-type')
        const layerList = this.page.locator('#\\30-layer')
        const isFlakyList = this.page.locator('#\\30-is_flaky')
        const behaviorList = this.page.locator('#\\30-behavior')
        const setAutomationStatus = this.page.locator('#\\30-automation')
        const addAtachmentButton = this.page.getByRole('button', { name: 'Add attachment' })
        
        await titleInput.fill(titleName)

        await descriptionInput.fill('Test description')

        await statusList.click({ force: true })
        await this.page.waitForTimeout(1000)
        await this.page.locator('#modals').getByText('Draft').click()

        await severityList.click({ force: true })
        await this.page.waitForTimeout(1000)
        await this.page.locator('#modals').getByText('Major').click()

        await priorityList.click({ force: true })
        await this.page.locator('#modals').getByText('High').click()

        await typeList.click({ force: true })
        await this.page.locator('#modals').getByText('Smoke').click()

        await layerList.click({ force: true })
        await this.page.locator('#modals').getByText('E2E').click()

        await isFlakyList.click({ force: true })
        await this.page.locator('#modals').getByText('No').click()

        await behaviorList.click({ force: true })
        await this.page.locator('#modals').getByText('Positive').click()

        await setAutomationStatus.click({ force: true })
        await this.page.locator('#modals').getByText('To be automated').click()


        await addAtachmentButton.click()

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByText('Drop files here to upload').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, '../assets/image.jpg'));

        await this.addStep("Step", "Data", "Result")
        await this.addStep("Step2", "Data2", "Result2")
        await this.addStep("Step3", "Data3", "Result3")

        const saveButton = this.page.locator('#save-case')
        await saveButton.click()

        await this.page.waitForURL("**/project/**")

        

        // <-- STEPS 
        // const addStepButton = this.page.locator('span', { hasText: ' Add step' })
        // await addStepButton.click()

        // await this.page.keyboard.type("Hello world!")
        // await this.page.keyboard.down('Tab')
        // await this.page.keyboard.type("Hello world123!")


        // await this.page.locator('p > [data-placeholder="Step Action"]').click()


        // select next 
        // const stepActionInput = this.page.locator(':text-is("Step Action")')//.locator('nth=0')
        // await stepActionInput.fill('Test step')


        // Click div data-placeholder="Step Action"
        // keyboard write

        // --> STEPS

        // await addAtachmentButton.click()
        // await this.page.setInputFiles("this.page.locator('span', { hasText: 'Drop files here to upload'})", './assets/image.jpg')  //('span', { hasText: 'Drop files here to upload', 'image.jpg')

        //(path.join(__assets, 'image.jpg')) //(path.join(__dirname, 'myfile.pdf')
    }

    async addStep(step: string, data: string, result: string) {
        const addStepButton = this.page.locator('button', { hasText: 'Add step' })

        await addStepButton.click()

        await this.page.keyboard.type(step)
        await this.page.keyboard.press('Tab', { delay: 100 })
        await this.page.keyboard.type(data)
        await this.page.keyboard.press('Tab', { delay: 100 })
        await this.page.keyboard.type(result)
    }

}

// id create-case-button
