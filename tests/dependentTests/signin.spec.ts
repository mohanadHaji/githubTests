import { test, expect, Page } from '@playwright/test';
import { signinPageData } from '../../Data/signinPage.data';
import { factory } from '../../factory';
import homePage from '../../pages/home.page';
import { mainPage } from '../../pages/main.page';
import signinPage from '../../pages/signin.page';
import { homePageSelectors } from '../../selectors/homePage.selectors';
import { mainPageSelectors } from '../../selectors/mainPage.selectors';
import { utils } from '../../Utils/utils';

test.describe.serial('signin', () => {
    let page: Page;
    let signinPage: signinPage;
    let mainPage: mainPage
    let homePage: homePage
    let utils: utils;
    
    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext();
        page = await context.newPage();

        utils = factory.initUtils(page);
        signinPage = factory.initSigninPage(page);
        mainPage = factory.initMainPage(page);
        homePage = factory.initHomePage(page);

        await homePage.loadHomePage();
    });

    test('signout test', async () => {
        await signinPage.signout();
        await expect(await utils.locator(mainPageSelectors.userEmailForSignUp)).toBeVisible();
    });

    test('test signin functionality', async () => {
        await mainPage.clickSigninPageButton();
        await signinPage.signin(signinPageData.email, signinPageData.password);
        
        await expect(page).toHaveTitle('GitHub');
        await expect(await utils.getByText(homePageSelectors.createNewRepoText)).toBeVisible();
    });

    test.afterAll(async () => {
        await page.close();
    })
})