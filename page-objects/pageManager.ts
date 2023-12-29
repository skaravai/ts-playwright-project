import { Page } from "@playwright/test";
import { SignInPage } from "./signInPage";
import { ProjectsListPage } from "./projectsListPage";
import { ProjectPage } from "./projectPage";

export class PageManager {

    private readonly page: Page
    private readonly signInPage: SignInPage
    private readonly projectsListPage: ProjectsListPage
    private readonly projectPage: ProjectPage

    constructor(page: Page) {
        this.page = page
        this.signInPage = new SignInPage(this.page)
        this.projectsListPage = new ProjectsListPage(this.page)
        this.projectPage = new ProjectPage(this.page)
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
}