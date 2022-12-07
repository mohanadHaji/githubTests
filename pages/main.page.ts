import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { operations } from "../enums/operations.enum";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import { utils } from "../Utils/utils";

export default class mainPage {
    private readonly utils: utils;

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    async loadMainPage(isSiginedin : boolean = true): Promise<void> {
        let nextSelector : string = isSiginedin ? mainPageSelectors.feedbackButton : mainPageSelectors.userEmailForSignUp;
        await this.utils.goto(commonData.gitHubUrl, nextSelector, operations.visible);
    }

    async gotoMainPage() {
        await this.utils.click(mainPageSelectors.githubSvg, mainPageSelectors.feedbackButton);
    }

    async gotoCreateRepoPage()
    {
        this.utils.click(await this.utils.getByText(mainPageSelectors.createNewRepoText));
    }

    async gotoSigninPage(): Promise<void> {
        await this.utils.click(await this.utils.getByText(mainPageSelectors.siginInButtonText));
    }
}