import { test, expect, Page } from '@playwright/test';
import { factory } from '../factory';
import signinPage from '../pages/signin.page';
import { utils } from '../Utils/utils';
import homePage from '../pages/home.page';
import { mainPageSelectors } from '../selectors/mainPage.selectors';
import { mainPage } from '../pages/main.page';
import { signinPageData } from '../Data/signinPage.data';

test.describe('signout tests', () => {
    let page: Page;
    let signinPage: signinPage;
    let util: utils;
    let homePage: homePage;
    let mainPage: mainPage;

    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext();
        await context.clearCookies();
        page = await context.newPage();

        signinPage = factory.initSigninPage(page);
        util = factory.initUtils(page);
        homePage = factory.initHomePage(page);
        mainPage = factory.initMainPage(page);

        await mainPage.loadMainPage();
        await mainPage.clickSigninPage();
        await signinPage.signin(signinPageData.email, signinPageData.password);
    });

    test('signout test', async () => {;
        await signinPage.signout();
        await expect(await util.locator(mainPageSelectors.userEmailForSignUp)).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
    })
});


