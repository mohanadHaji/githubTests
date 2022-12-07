import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { signinPageData } from "../Data/signinPage.data";
import { stateEnum } from "../enums/state.enum";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import { signinPageSelectors } from "../selectors/signinPage.selectors";
import { utils } from "../Utils/utils";

export default class signinPage {
    private readonly utils: utils;
    private readonly page: Page;

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
        this.page = page;
    }
    
    async signin(email: string, password: string, saveContext: boolean = true, storageStateFileName: string = commonData.storageStatePath): Promise<void> {
        await this.utils.fill(signinPageSelectors.emailSelector, email);
        await this.utils.fill(signinPageSelectors.passwordSelector, password);
        await this.utils.click(signinPageSelectors.signinButtonSelector, mainPageSelectors.feedbackButton, stateEnum.attached);
        if (saveContext) {
            await this.saveContext(storageStateFileName);
        }
    }

    async signout(): Promise<void> {
        await this.utils.click(mainPageSelectors.userAvatar, mainPageSelectors.signoutButton);
        await this.utils.click(mainPageSelectors.signoutButton, signinPageSelectors.userEmail);
    }

    private async saveContext(storageName: string) {
        await this.page.context().storageState({ path: storageName });;
    }
}