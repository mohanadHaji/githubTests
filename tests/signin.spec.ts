import { test, expect, Page, BrowserContext } from '@playwright/test';
import { signinPageData } from '../Data/signinPage.data';
import { factory } from '../factory';
import homePage from '../pages/home.page';
import { mainPage } from '../pages/main.page';
import signinPage from '../pages/signin.page';
import { homePageSelectors } from '../selectors/homePage.selectors';
import { utils } from '../Utils/utils';

test.describe('signin', () => {
    let page: Page;
    let signinPage: signinPage;
    let mainPage: mainPage
    let homePage: homePage
    let utils: utils;

    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext();
        await context.clearCookies();
        page = await context.newPage();

        utils = factory.initUtils(page);
        signinPage = factory.initSigninPage(page);
        mainPage = factory.initMainPage(page);
        homePage = factory.initHomePage(page);

        await mainPage.loadMainPage();
        await mainPage.clickSigninPage();
    });

    test('test signin functionality', async () => {
        await signinPage.signin(signinPageData.email, signinPageData.password, false);
        await expect(page).toHaveTitle('GitHub');
        await expect(await utils.getByText(homePageSelectors.createNewRepoText)).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
    })
})