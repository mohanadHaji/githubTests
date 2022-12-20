import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { factory } from "../factory";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { utils } from "../Utils/utils";

export default class homePage {
    private readonly utils: utils;

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    /**
     * expect to be signed in.
     * load home page using url.
     * redirect to home page.
     */
    async loadHomePage(): Promise<void> {
        await this.utils.goto(commonData.gitHubUrl, homePageSelectors.feedbackButton);
    }

    /**
     * redirect you from anywhere in code to home page
     * @param githubSvhSelector send the svg selector in case it changed on some pages (like in project page a space was added at the end of the selector)
     */
    async clickHomePageButton(githubSvhSelector: string = homePageSelectors.githubSvg) {
        await this.utils.click(githubSvhSelector, homePageSelectors.feedbackButton);
    }

    /**
     * expect to be in home page.
     * redirect you to create new repo page.
     */
    async clickCreateRepoPageButton()
    {
        this.utils.click(await this.utils.getByText(homePageSelectors.createNewRepoText), repoPageSelectors.newRepoSelectors.newRepoNameSelector);
    }
}