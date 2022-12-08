import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { signinPageData } from "../Data/signinPage.data";
import { stateEnum } from "../enums/state.enum";
import { factory } from "../factory";
import { homePageSelectors } from "../selectors/homePage.selectors";
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
        await this.utils.click(signinPageSelectors.signinButtonSelector, homePageSelectors.userAvatar);
        if (saveContext) {
            await this.saveContext(storageStateFileName);
        }
    }

    async signout(): Promise<void> {
        await this.utils.click(homePageSelectors.userAvatar, homePageSelectors.signoutButton);
        await this.utils.click(homePageSelectors.signoutButton, signinPageSelectors.userEmail);
    }

    private async saveContext(storageName: string) {
        await this.page.context().storageState({ path: storageName });;
    }
}