import { test, expect, Page } from '@playwright/test';
import { factory } from '../factory';
import signinPage from '../pages/signin.page';
import { signinPageData } from '../Data/signinPage.data';
import { utils } from '../Utils/utils';
import { commonData } from '../Data/common.data';

test.describe('signout tests', () =>
{    
    let page : Page;
    let signinPage : signinPage;
    let util : utils;

    test.beforeAll(async ({browser}) =>
    {
        page = await browser.newPage();
        signinPage = factory.initSigninPage(page);
        util = factory.initUtils(page);
    });
    
    test('signout test', async () => 
    {
        await signinPage.gotoSigninPage();
        await signinPage.signin(signinPageData.email, signinPageData.password, false)
        await signinPage.signout();
        await expect(await util.locator(commonData.homePageSelector)).toBeVisible();
    });

    test.afterAll(async () =>
    {
        await page.close();
    })
});


