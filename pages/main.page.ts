import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { repoPageData } from "../Data/repoPage.data";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import { utils } from "../Utils/utils";

export default class mainPage
{
    private readonly utils : utils;

    constructor(page : Page)
    {
        this.utils = factory.initUtils(page);
    }

    async gotoMainPage() : Promise<void>
    {
        await this.utils.goto(commonData.gitHubUrl, repoPageData.newRepoUrl);
    }

    async gottoCreateNewRepo() : Promise<void>
    {
        await this.utils.click(mainPageSelectors.createNewRepoButton);
    }
}