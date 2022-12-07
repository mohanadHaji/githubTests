import { test, Page, expect } from "@playwright/test";
import { utils } from "../Utils/utils";
import { v4 as uuid } from 'uuid';
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { commonData } from "../Data/common.data";
import { userProfilePageSelectors } from "../selectors/userProfile.selectors";
import { repoPage } from "../pages/repo.page";
import { repoPageData } from "../Data/repoPage.data";
import mainPage from "../pages/main.page";

test.describe('delete repo', () => {
    let page: Page;
    let util: utils;
    let repoPage: repoPage;
    let mainPage : mainPage;

    const guid: string = uuid();
    const repoName = repoPageData.newRepoName + guid;

    test.beforeAll(async ({ browser }) => {
        var context = await utils.getContext(browser, commonData.storageStateFileName);
        page = await context.newPage();
        repoPage = factory.initRepoPage(page);
        util = factory.initUtils(page);
        mainPage = factory.initMainPage(page);
        
        await mainPage.loadMainPage();
        await mainPage.gotoCreateRepoPage();
        await repoPage.createRepo(repoName);
    });

    test('deleting repo', async () => {
        await repoPage.gotoDeletePage(repoPageSelectors.settingsTab);
        await repoPage.deleteRepo(commonData.accountName, repoName);
        await expect(await util.locator(userProfilePageSelectors.userRepositoriesList)).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
    })
})