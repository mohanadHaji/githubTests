import { Locator, Page } from "@playwright/test";
import { factory } from "../factory";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { projectPageSelectors } from "../selectors/projectPage.selectors";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { utils } from "../Utils/utils";

export class profilePage {
    private readonly utils: utils

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    /**
     * redirect to profile page from any where.
     */
    async clickProfilePage(): Promise<void> {
        await this.utils.click(homePageSelectors.userAvatar, homePageSelectors.signoutButton);
        await this.utils.click(homePageSelectors.yourProfileText, profilePageSelectors.repoButton);
    }

    /**
     * expect to be in profile page.
     * redirect to repos tab in profile page.
     */
    async clickReposTab(): Promise<void>
    {
        await this.utils.click(profilePageSelectors.repoButton, profilePageSelectors.repoSearchButton);
    }
    
    /**
     * expect to be in repos tab.
     * redirect to repo page.
     * @param accountName current signed into account.
     * @param repoName repo name to be clicked.
     */
    async clickRepo(accountName : string, repoName: string)
    {
        await this.utils.click(this.utils.format(profilePageSelectors.repoPageLink, [accountName, repoName]), repoPageSelectors.codeTab)
    }

    /**
     * expect to be in repos tab under profile page.
     * @returns return number of repos in the account.
     */
    async getNumberOfRepos(): Promise<number> {
        let reposCount = await (await this.utils.locator(profilePageSelectors.reposCount)).innerText();
        return +reposCount;
    }

    /**
     * expect to be in profile page.
     * redirect to projects tab under profile page.
     */
    async clickProjectsSectionLink(): Promise<void> {
        await this.utils.click(profilePageSelectors.projectsPageButton, profilePageSelectors.projectsInfoSection);
    }

    /**
     * expect to be in projects tab under profile page.
     * redirect to project page
     */
    async clickCreateProject(): Promise<void> {
        await this.utils.click(await this.utils.getByRole('button', profilePageSelectors.newProjectText), projectPageSelectors.popoutWindoCreateButton);
    }

    /**
     * expect to be in repos tab under profile page
     * @returns number of projects in this repo
     */
    async getNumberOfProjects(): Promise<number> {
        let numberLocator: Locator = await this.utils.getByRole('link', profilePageSelectors.numberOfProjectsRegx);
        return +(await numberLocator.innerText()).replace(/[^0-9]/g,'');
    }
}