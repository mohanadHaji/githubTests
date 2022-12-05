import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { factory } from "../factory";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { utils } from "../Utils/utils";

export class profilePage
{
    private readonly utils : utils

    constructor(page : Page)
    {
        this.utils = factory.initUtils(page);
    }

    async gotoProfilePage(accountName : string) : Promise<void>
    {
        await this.utils.goto(commonData.gitHubUrl + '/' + accountName, profilePageSelectors.pnniedRepo);
    }

    async getNumberOfRepos() : Promise<number>
    {
        let reposCount = await (await this.utils.locator(profilePageSelectors.reposCount)).innerText();
        return +reposCount;
    }
}