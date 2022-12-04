import { Page } from "@playwright/test";
import { commonData } from "../Data/common.data";
import { signinPageData } from "../Data/signinPage.data";
import { factory } from "../factory";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import {signinPageSelectors} from "../selectors/signinPage.selectors";
import { utils } from "../Utils/utils";

export default class signinPage
{
    private readonly utils : utils;
    private readonly page : Page;

    constructor(page : Page)
    {
        this.utils = factory.initUtils(page);
        this.page = page;
    }

    async gotoSigninPage() : Promise<void>
    {
        await this.utils.goto(commonData.gitHubUrl + signinPageData.signinUrl, signinPageSelectors.emailSelector);
    }

    async signin(email : string, password : string) : Promise<void>
    {
        await this.utils.fill(signinPageSelectors.emailSelector, email);
        await this.utils.fill(signinPageSelectors.passwordSelector, password);
        await this.utils.click(signinPageSelectors.signinButtonSelector, mainPageSelectors.createNewRepoButton, 'attached');
        await (await this.page.context()).storageState({path : 'state.json'});;
    }
}