import { test, expect, Page } from '@playwright/test';
import { factory } from '../../factory';
import { v4 as uuid } from 'uuid';
import { repoPage } from '../../pages/repo.page';
import { repoPageData } from '../../Data/repoPage.data';
import { utils } from '../../Utils/utils';
import { commonData } from '../../Data/common.data';
import { profilePage } from '../../pages/profile.page';
import homePage from '../../pages/home.page';
import { repoPageSelectors } from '../../selectors/repoPage.selectors';
import { projectPageData } from '../../Data/projectsPage.data';
import { projectPage } from '../../pages/project.page';
import { homePageSelectors } from '../../selectors/homePage.selectors';

test.describe('create repo tests', () => {
    let page: Page;
    let repoPage: repoPage;
    let profilePage: profilePage
    let util: utils;
    let homePage: homePage
    let projectPage: projectPage;

    let previousNumberOfRepo: number;


    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext({ storageState: commonData.storageStateFileName });
        page = await context.newPage();

        repoPage = factory.initRepoPage(page);
        profilePage = factory.initProfilePage(page);
        util = factory.initUtils(page);
        homePage = factory.initHomePage(page);
        projectPage = factory.initProjectsPage(page);
    });

    test.beforeEach(async () => {
        await homePage.loadHomePage();
        await profilePage.clickProfilePage();
        await profilePage.clickReposTab();
        previousNumberOfRepo = await profilePage.getNumberOfRepos();
        await homePage.clickHomePage();
    });

    test('create new repo', async () => {
        const guid: string = uuid();
        var repoName = repoPageData.newRepoName + guid;
        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await expect(page).toHaveURL(new RegExp(repoName));
    });

    test('deleting repo', async () => {
        const guid: string = uuid();
        var repoName = repoPageData.newRepoName + guid;

        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName);

        await repoPage.clickSettingsTab();
        await repoPage.deleteRepo(commonData.accountName, repoName);
    });

    test('link project to repo', async () => {
        let projectName = projectPageData.projectName + uuid();
        await profilePage.clickProfilePage();
        await profilePage.clickProjectsSectionLink();
        await profilePage.clickCreateProject();
        await projectPage.closePopWindow();
        await projectPage.renameProject(projectName);
        await homePage.clickHomePage(homePageSelectors.githubSvgInProjectPage);

        const guid: string = uuid();
        var repoName = repoPageData.newRepoName + guid;
        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await repoPage.clickProjectTab();
        await repoPage.linkProject(projectName);

        expect(await util.getByText(projectName)).toBeVisible()
    });

    test('test clone url', async () => {
        var repoName = repoPageData.newRepoName + uuid();
        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);
        let cloneUrl = await repoPage.getRepoCloneLink();
        expect(cloneUrl).toBe(commonData.gitHubUrl + '/' + commonData.accountName + '/' + repoName + '.git')
    });

    test('rename repo', async () => {
        var repoName = repoPageData.newRepoName + uuid();
        var repoRename = repoPageData.renameRepoName + uuid();
        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);
        await repoPage.clickSettingsTab();
        await repoPage.renameRepo(repoRename);

        await expect(page).toHaveURL(new RegExp(repoRename))
    });

    test('change privacy to private', async () => {
        var repoName = repoPageData.newRepoName + uuid();
        await homePage.clickCreateRepoPage();
        await repoPage.createRepo(repoName, repoPageData.descrption);

        await repoPage.clickSettingsTab();
        await repoPage.changeRepoVisibility();

        await util.click(await util.getByText(repoPageSelectors.ChangeVisibilityButtonText), await util.getByText(repoPageSelectors.ChangeVisibilityToButtonRegex));
        await expect(await util.getByText(repoPageSelectors.ChangeVisibilityToButtonRegex)).toHaveText(repoPageData.changeToPublicText)
        await util.click(await util.getByText(repoPageSelectors.ChangeVisibilityButtonText), repoPageSelectors.renameField);
    });

    test.afterEach(async () => {
        await util.sleep(7);
        await profilePage.clickProfilePage();
        await profilePage.clickReposTab();
        let currentNumberOfRepo: number = await profilePage.getNumberOfRepos();
        expect(currentNumberOfRepo).toBeLessThan(previousNumberOfRepo + 5);
    });

    test.afterAll(async () => {
        await page.close();
    })
});


