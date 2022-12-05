import { test,  Page, expect } from "@playwright/test";
import deletePage from "../pages/delete.page";
import { utils } from "../Utils/utils";
import { v4 as uuid } from 'uuid';
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { commonData } from "../Data/common.data";
import { userProfilePageSelectors } from "../selectors/userProfile.selectors";
import { repoPage } from "../pages/repo.page";
import { repoPageData } from "../Data/repoPage.data";
import signinPage from "../pages/signin.page";
import { signinPageData } from "../Data/signinPage.data";

test.describe('delete repo', () =>
{
    let page : Page;
    let deletePage : deletePage;
    let util : utils;
    let repoPage : repoPage;
    let signinPage : signinPage;
    const guid: string = uuid();
    const repoName = repoPageData.newRepoName + guid;

    test.beforeAll(async ({browser}) =>
    {
        var context = await utils.getContext(browser, commonData.storageStateFileName);
        page = await context.newPage();
        repoPage = factory.initRepoPage(page);
        signinPage = factory.initSigninPage(page);
        // console.log('------------------------- null' + signinPage === null + '   undefined ' + signinPage === undefined);
        await repoPage.gotoCreateRepoPage(signinPage, signinPageData.email, signinPageData.password);
        util = factory.initUtils(page);
        deletePage = factory.initDeletePage(page);
        await repoPage.createRepo(repoName);
    });

    test('deleting repo', async () => 
    {
        await deletePage.gotoDeletePage(repoPageSelectors.settingsTab);
        await deletePage.deleteRepo(commonData.accountName, repoName);
        await expect(await util.locator(userProfilePageSelectors.userRepositoriesList)).toBeVisible();
    });

    test.afterAll(async () =>
    {
        await page.close();
    })
})