import { test, expect, Page } from '@playwright/test';
import { factory } from '../factory';
import signinPage from '../pages/signin.page';
import { signinPageData } from '../Data/signinPage.data';
import { utils } from '../Utils/utils';
import { commonData } from '../Data/common.data';
import mainPage from '../pages/main.page';

test.describe('signout tests', () => {
    let page: Page;
    let signinPage: signinPage;
    let util: utils;
    let mainPage: mainPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.clearCookies();
        page = await context.newPage();
        signinPage = factory.initSigninPage(page);
        util = factory.initUtils(page);
        mainPage = factory.initMainPage(page);
        await mainPage.loadMainPage(false);
    });

    test('signout test', async () => {
        await mainPage.gotoSigninPage();
        await signinPage.signin(signinPageData.email, signinPageData.password, false);
        await signinPage.signout();
        await expect(await util.locator(commonData.homePageSelector)).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
    })
});


