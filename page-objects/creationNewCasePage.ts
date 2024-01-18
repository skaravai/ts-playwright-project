import { Page } from "@playwright/test";
import path from "path";

export class CreationNewCasePage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
    * This method creates a new test case
    * @param titleName - a string value for the Title of the test case
    */

    async createNewCase(titleName: string) {
        const titleInput = this.page.locator('#title')
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

        const saveButton = this.page.locator('#save-case')
        
        await titleInput.fill(titleName)

        await descriptionInput.fill('Test description')

        await statusList.click({ force: true })
        await this.page.locator('#modals').getByText('Draft').click()

        await severityList.click({ force: true })
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

        // to be done
        // await setAutomationStatus.click({ force: true })
        // await this.page.locator('#modals').getByText('Manual').click()

        await addAtachmentButton.click()
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByText('Drop files here to upload').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, '../assets/image.jpg'));

        await this.addStep("Step", "Data", "Result")
        await this.addStep("Step2", "Data2", "Result2")
        await this.addStep("Step3", "Data3", "Result3")

        await saveButton.click()

        await this.page.waitForURL("**/project/**")
    }

    /**
    * This method fills in information about step
    * @param stepAction - the string value of the step action to be performed
    * @param data - the string value of necessary information/values or credentials
    * @param result - the string value of expected result
    */

    async addStep(stepAction: string, data: string, result: string) {
        const addStepButton = this.page.locator('button', { hasText: 'Add step' })

        await addStepButton.click()
        await this.page.keyboard.type(stepAction)
        await this.page.keyboard.press('Tab', { delay: 100 })
        await this.page.keyboard.type(data)
        await this.page.keyboard.press('Tab', { delay: 100 })
        await this.page.keyboard.type(result)
    }
}