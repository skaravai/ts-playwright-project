import { Page } from "@playwright/test";
import { SignInPage } from "./signInPage";
import { ProjectsListPage } from "./projectsListPage";
import { ProjectPage } from "./projectPage";
import { WelcomePage } from "./welcomePage";
import { CreationNewCasePage } from "./creationNewCasePage";

export class PageManager {

    private readonly page: Page
    private readonly signInPage: SignInPage
    private readonly projectsListPage: ProjectsListPage
    private readonly projectPage: ProjectPage
    private readonly welcomePage: WelcomePage
    private readonly creationNewCasePage: CreationNewCasePage

    constructor(page: Page) {
        this.page = page
        this.signInPage = new SignInPage(this.page)
        this.projectsListPage = new ProjectsListPage(this.page)
        this.projectPage = new ProjectPage(this.page)
        this.welcomePage = new WelcomePage(this.page)
        this.creationNewCasePage = new CreationNewCasePage(this.page)
    }

    onWelcomePage() {
        return this.welcomePage
    }

    onSignInPage() {
        return this.signInPage
    }

    onProjectsListPage() {
        return this.projectsListPage
    }

    onProjectPage() {
        return this.projectPage
    }

    onCreationNewCasePage() {
        return this.creationNewCasePage
    }
}