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

test.describe('create repo tests', () =>
{    
    let page : Page;
    let repoPage : repoPage;
    let signinPage : signinPage;
    let profilePage : profilePage
    let previousNumberOfRepo : number;
    const guid: string = uuid();

    test.beforeAll(async ({browser}) =>
    {
        var context = await utils.getContext(browser, commonData.storageStateFileName);
        page = await context.newPage();
        repoPage = factory.initRepoPage(page);
        signinPage = factory.initSigninPage(page);
        profilePage = factory.initProfilePage(page);


        await profilePage.gotoProfilePage(commonData.accountName);
        previousNumberOfRepo = await profilePage.getNumberOfRepos();
        await repoPage.gotoCreateRepoPage(signinPage, signinPageData.email, signinPageData.password);
    });
    
    test('create new repo', async () => 
    {
        var repoName = repoPageData.newRepoName + guid;
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await expect(page).toHaveURL(new RegExp(repoName));

        await utils.sleep(2);
        await profilePage.gotoProfilePage(commonData.accountName);
        let currentNumberOfRepo : number = await profilePage.getNumberOfRepos();
        expect(currentNumberOfRepo).toBe(previousNumberOfRepo + 1);
    });

    test.afterAll(async () =>
    {
        await page.close();
    })
});


