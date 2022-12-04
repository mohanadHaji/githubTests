import { test, expect, Page, BrowserContext } from '@playwright/test';
import { commonData } from '../Data/common.data';
import { signinPageData } from '../Data/signinPage.data';
import { factory } from '../factory';
import signinPage from '../pages/signin.page';

test.describe('signin', () =>
{
    let page : Page;
    let signinPage : signinPage;
    test.beforeAll(async ({browser}) =>
    {
        page = await browser.newPage();
        signinPage = factory.initSigninPage(page);
        await signinPage.gotoSigninPage();
        
    });
    test('test signin functionality', async () => 
    {
        await signinPage.signin(signinPageData.email, signinPageData.password);
        await expect(page).toHaveTitle('GitHub');
    });

    test.afterAll(async () =>
    {
        await page.close();
    })
})