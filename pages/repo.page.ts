import { Page } from "@playwright/test";
import { utils } from "../Utils/utils";
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { commonData } from "../Data/common.data";
import { repoPageData } from "../Data/repoPage.data";
import signinPage from "./signin.page";
import { operations } from "../enums/operations.enum";
import { stateEnum } from "../enums/state.enum";

export class repoPage
{
    private readonly utils : utils

    constructor(page : Page)
    {
        this.utils = factory.initUtils(page);
    }

    async gotoRepoPage(repoName : string) : Promise<void>
    {
        await this.utils.goto(commonData.gitHubUrl + '/' + commonData.accountName + '/' + repoName, repoPageSelectors.codeTab);
    }

    async gotoCreateRepoPage(signinPage : signinPage, email : string, password : string) : Promise<void>
    {
        if(!await this.utils.goto(commonData.gitHubUrl + repoPageData.newRepoUrl, repoPageSelectors.newRepoNameSelector, operations.visible))
        {
            await signinPage.gotoSigninPage();
            await signinPage.signin(email, password);
            await this.gotoCreateRepoPage(signinPage, email, password);
        }
    }

    async createRepo(repoName : string, desciption? : string, isPublic : boolean = true) : Promise<void>
    {
        await this.utils.fill(repoPageSelectors.newRepoNameSelector, repoName);
        if (desciption != null)
        {
            await this.utils.fill(repoPageSelectors.repository_description, desciption);
        }

        isPublic ? await this.utils.click(repoPageSelectors.repository_visibility_public) :
        await this.utils.click(repoPageSelectors.repository_visibility_private);
        await this.utils.click(repoPageSelectors.createRepoButton, repoPageSelectors.codeTab, stateEnum.visible, 8000)
    }
}