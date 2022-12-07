import { Page } from "@playwright/test";
import { repoPageData } from "../Data/repoPage.data";
import { stateEnum } from "../enums/state.enum";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { utils } from "../Utils/utils";

export class profilePage {
    private readonly utils: utils

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    async gotoProfilePage(): Promise<void> {
        await this.utils.click(mainPageSelectors.userAvatar, mainPageSelectors.signoutButton);
        await this.utils.click(repoPageData.yourProfileText, profilePageSelectors.pniedRepo, stateEnum.attached);
    }

    async gotoReposTab(): Promise<void>
    {
        await this.utils.click(profilePageSelectors.repoButton, profilePageSelectors.repoSearchButton);
    }
    
    async gotoRepo(accountName : string, repoName: string)
    {
        console.log('------------------------================================' + this.utils.format(profilePageSelectors.repoPageLink, [accountName, repoName]));
        await this.utils.click(this.utils.format(profilePageSelectors.repoPageLink, [accountName, repoName]), repoPageSelectors.codeTab)
    }
    async getNumberOfRepos(): Promise<number> {
        let reposCount = await (await this.utils.locator(profilePageSelectors.reposCount)).innerText();
        return +reposCount;
    }
}