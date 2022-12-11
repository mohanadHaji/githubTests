import { test, Page, expect } from "@playwright/test";
import { utils } from "../Utils/utils";
import { v4 as uuid } from 'uuid';
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { commonData } from "../Data/common.data";
import { repoPage } from "../pages/repo.page";
import { repoPageData } from "../Data/repoPage.data";
import homePage from "../pages/home.page";
import { profilePage } from "../pages/profile.page";
import { profilePageSelectors } from "../selectors/profilePage.selectors";

test.describe('delete repo', () => {
    let page: Page;
    let util: utils;
    let repoPage: repoPage;
    let homePage : homePage;
    let profilePage: profilePage

    let previousNumberOfRepo : number;
    const guid: string = uuid();
    const repoName = repoPageData.newRepoName + guid;

    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext();
        page = await context.newPage();
        repoPage = factory.initRepoPage(page);
        util = factory.initUtils(page);
        homePage = factory.initHomePage(page);
        profilePage = factory.initProfilePage(page);

        await homePage.loadHomePage();
        await profilePage.clickProfilePage();
        previousNumberOfRepo = await profilePage.getNumberOfRepos();
        await homePage.clickHomePage();

        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName);
    });

    test('deleting repo', async () => {
        await repoPage.clickDeletePage(repoPageSelectors.settingsTab);
        await repoPage.deleteRepo(commonData.accountName, repoName);
        
        await util.sleep(5);
        await util.reloadPage(profilePageSelectors.repoButton)
        let currentNumberOfRepo: number = await profilePage.getNumberOfRepos();
        expect(currentNumberOfRepo).toBeLessThan(previousNumberOfRepo + 2);
    });

    test.afterAll(async () => {
        await page.close();
    })
})