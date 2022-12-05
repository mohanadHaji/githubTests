import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { signinPageData } from "../Data/signinPage.data";
import { stateEnum } from "../enums/state.enum";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import {signinPageSelectors} from "../selectors/signinPage.selectors";
import { utils } from "../Utils/utils";

export default class signinPage
{
    private readonly utils : utils;

    constructor(page : Page)
    {
        this.utils = factory.initUtils(page);
    }

    async gotoSigninPage() : Promise<void>
    {
        await this.utils.goto(commonData.gitHubUrl + signinPageData.signinUrl, signinPageSelectors.emailSelector);
    }

    async signin(email : string, password : string) : Promise<void>
    {
        await this.utils.fill(signinPageSelectors.emailSelector, email);
        await this.utils.fill(signinPageSelectors.passwordSelector, password);
        await this.utils.click(signinPageSelectors.signinButtonSelector, mainPageSelectors.feedbackButton, stateEnum.attached);
        await this.utils.saveContext(commonData.storageStateFileName)
    }

    async signout() : Promise<void>
    {
        await this.utils.click(mainPageSelectors.userAvatar, signinPageSelectors.signoutButton);
        await this.utils.click(signinPageSelectors.signoutButton, signinPageSelectors.userEmail);
    }
}