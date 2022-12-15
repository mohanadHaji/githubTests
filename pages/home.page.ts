import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { operations } from "../enums/operations.enum";
import { factory } from "../factory";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { utils } from "../Utils/utils";

export default class homePage {
    private readonly utils: utils;

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    async loadHomePage(): Promise<void> {
        await this.utils.goto(commonData.gitHubUrl, homePageSelectors.feedbackButton);
    }

    async clickHomePage(githubSvhSelector: string = homePageSelectors.githubSvg) {
        await this.utils.click(githubSvhSelector, homePageSelectors.feedbackButton);
    }

    async clickCreateRepoPage()
    {
        this.utils.click(await this.utils.getByText(homePageSelectors.createNewRepoText), repoPageSelectors.newRepoNameSelector);
    }
}