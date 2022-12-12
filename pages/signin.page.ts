import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
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
    
    async signin(email: string, password: string, storageStateFileName: string = commonData.storageStatePath): Promise<void> {
        await this.utils.fill(signinPageSelectors.emailSelector, email, signinPageSelectors.emailSelector);
        await this.utils.fill(signinPageSelectors.passwordSelector, password, signinPageSelectors.passwordSelector);
        await this.utils.click(signinPageSelectors.signinButtonSelector, homePageSelectors.userAvatar);
        await this.saveContext(storageStateFileName);
    }

    async signout(): Promise<void> {
        await this.utils.click(homePageSelectors.userAvatar, homePageSelectors.signoutButton);
        await this.utils.click(homePageSelectors.signoutButton, signinPageSelectors.userEmail);
    }

    private async saveContext(storageName: string) {
        await this.page.context().storageState({ path: storageName });;
    }
}