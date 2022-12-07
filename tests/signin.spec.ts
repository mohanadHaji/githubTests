import { test, expect, Page, BrowserContext } from '@playwright/test';
import { signinPageData } from '../Data/signinPage.data';
import { factory } from '../factory';
import mainPage from '../pages/main.page';
import signinPage from '../pages/signin.page';

test.describe('signin', () => {
    let page: Page;
    let signinPage: signinPage;
    let mainPage: mainPage

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies();

        signinPage = factory.initSigninPage(page);
        mainPage = factory.initMainPage(page);

        await mainPage.loadMainPage(false);
        await mainPage.gotoSigninPage();
    });

    test('test signin functionality', async () => {
        await signinPage.signin(signinPageData.email, signinPageData.password, false);
        await expect(page).toHaveTitle('GitHub');
    });

    test.afterAll(async () => {
        await page.close();
    })
})