import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import { utils } from "../Utils/utils";

export class mainPage
{
    private readonly utils: utils

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    async loadMainPage(): Promise<void> {
        await this.utils.goto(commonData.gitHubUrl, mainPageSelectors.userEmailForSignUp);
    }

    async clickSigninPage(): Promise<void> {
        await this.utils.click(await this.utils.getByText(mainPageSelectors.siginInButtonText), mainPageSelectors.userLoginField);
    }
}