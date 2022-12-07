import { test, expect, Page } from '@playwright/test';
import { factory } from '../factory';
import { v4 as uuid } from 'uuid';
import { repoPage } from '../pages/repo.page';
import { repoPageData } from '../Data/repoPage.data';
import signinPage from '../pages/signin.page';
import { signinPageData } from '../Data/signinPage.data';
import { utils } from '../Utils/utils';
import { commonData } from '../Data/common.data';
import { profilePage } from '../pages/profile.page';
import mainPage from '../pages/main.page';

test.describe('create repo tests', () => {
    let page: Page;
    let repoPage: repoPage;
    let profilePage: profilePage
    let util: utils;
    let mainPage: mainPage;

    let previousNumberOfRepo: number;
    const guid: string = uuid();

    test.beforeAll(async ({ browser }) => {
        var context = await utils.getContext(browser, commonData.storageStateFileName);
        page = await context.newPage();
        repoPage = factory.initRepoPage(page);
        profilePage = factory.initProfilePage(page);
        util = factory.initUtils(page);
        mainPage = factory.initMainPage(page)
    });

    test.beforeEach(async ()=>{
        await mainPage.loadMainPage();
        await profilePage.gotoProfilePage();
        previousNumberOfRepo = await profilePage.getNumberOfRepos();
        await mainPage.gotoMainPage();
    });
    
    test('create new repo', async () => {
        var repoName = repoPageData.newRepoName + guid;
        await mainPage.gotoCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await expect(page).toHaveURL(new RegExp(repoName));

        await util.sleep(3);
        await profilePage.gotoProfilePage();
        let currentNumberOfRepo: number = await profilePage.getNumberOfRepos();
        expect(currentNumberOfRepo).toBe(previousNumberOfRepo + 1);
    });

    test.afterAll(async () => {
        await page.close();
    })
});


