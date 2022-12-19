import { test, expect, Page } from '@playwright/test';
import { factory } from '../../factory';
import { v4 as uuid } from 'uuid';
import { repoPage } from '../../pages/repo.page';
import { repoPageData } from '../../Data/repoPage.data';
import { utils } from '../../Utils/utils';
import { commonData } from '../../Data/common.data';
import { profilePage } from '../../pages/profile.page';
import homePage from '../../pages/home.page';
import { repoPageSelectors } from '../../selectors/repoPage.selectors';
import { profilePageSelectors } from '../../selectors/profilePage.selectors';

test.describe('create repo tests', () => {
    let page: Page;
    let repoPage: repoPage;
    let profilePage: profilePage
    let util: utils;
    let homePage: homePage

    let previousNumberOfRepo: number;
    

    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext({ storageState: commonData.storageStateFileName });
        page = await context.newPage();

        repoPage = factory.initRepoPage(page);
        profilePage = factory.initProfilePage(page);
        util = factory.initUtils(page);
        homePage = factory.initHomePage(page);
    });

    test.beforeEach(async ()=>{
        await homePage.loadHomePage();
        await profilePage.clickProfilePage();
        await profilePage.clickReposTab();
        previousNumberOfRepo = await profilePage.getNumberOfRepos();
        await homePage.clickHomePage();
    });
    
    test('create new repo', async () => {
        const guid: string = uuid();
        var repoName = repoPageData.newRepoName + guid;
        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await expect(page).toHaveURL(new RegExp(repoName));
    });

    test('deleting repo', async () => {
        const guid: string = uuid();
        var repoName = repoPageData.newRepoName + guid;

        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName);
        
        await repoPage.clickDeletePage(repoPageSelectors.settingsTab);
        await repoPage.deleteRepo(commonData.accountName, repoName);
    });

    test.afterEach(async () => {
        await util.sleep(7);
        await profilePage.clickProfilePage();
        await profilePage.clickReposTab();
        let currentNumberOfRepo: number = await profilePage.getNumberOfRepos();
        expect(currentNumberOfRepo).toBeLessThan(previousNumberOfRepo + 2);
    })
    test.afterAll(async () => {
        await page.close();
    })
});


