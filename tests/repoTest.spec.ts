import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { factory } from '../factory';
import { v4 as uuid } from 'uuid';
import { repoPage } from '../pages/repo.page';
import { repoPageData } from '../Data/repoPage.data';
import signinPage from '../pages/signin.page';
import { signinPageData } from '../Data/signinPage.data';

test.describe('create repo tests', () =>
{    
    let page : Page;
    let repoPage : repoPage;
    let signinPage : signinPage;
    const guid: string = uuid();

    test.beforeAll(async ({browser}) =>
    {
        var context = await browser.newContext({storageState : 'state.json'})
        page = await context.newPage();
        repoPage = factory.initRepoPage(page);
        signinPage = factory.initSigninPage(page);

        await repoPage.gotoCreateRepoPage(signinPage, signinPageData.email, signinPageData.password);
    });
    
    test('create new repo', async () => 
    {
        var repoName = repoPageData.newRepoName + guid;
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await expect(page).toHaveURL(new RegExp(repoName))
    });

    test.afterAll(async () =>
    {
        await page.close();
    })
});


