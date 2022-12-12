import { Page } from "@playwright/test";
import { repoPageData } from "../Data/repoPage.data";
import { factory } from "../factory";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { utils } from "../Utils/utils";

export class profilePage {
    private readonly utils: utils

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    async clickProfilePage(): Promise<void> {
        await this.utils.click(homePageSelectors.userAvatar, homePageSelectors.signoutButton);
        await this.utils.click(repoPageData.yourProfileText, profilePageSelectors.repoButton);
    }

    async clickReposTab(): Promise<void>
    {
        await this.utils.click(profilePageSelectors.repoButton, profilePageSelectors.repoSearchButton);
    }
    
    async clickRepo(accountName : string, repoName: string)
    {
        await this.utils.click(this.utils.format(profilePageSelectors.repoPageLink, [accountName, repoName]), repoPageSelectors.codeTab)
    }
    async getNumberOfRepos(): Promise<number> {
        let reposCount = await (await this.utils.locator(profilePageSelectors.reposCount)).innerText();
        return +reposCount;
    }
}