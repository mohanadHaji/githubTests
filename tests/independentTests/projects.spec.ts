import test, { expect, Page } from "@playwright/test";
import { projectPageData } from "../../Data/projectsPage.data";
import { factory } from "../../factory";
import { v4 as uuid } from 'uuid';
import homePage from "../../pages/home.page";
import { profilePage } from "../../pages/profile.page";
import { projectPage } from "../../pages/project.page";
import { utils } from "../../Utils/Utils";

test.describe('projects tests', () => {
    let page: Page;
    let util: utils;
    let homePage: homePage;
    let profilePage: profilePage
    let projectPage: projectPage;

    let previousNumberOfProject: number;

    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext();
        page = await context.newPage();

        util = factory.initUtils(page);
        homePage = factory.initHomePage(page);
        profilePage = factory.initProfilePage(page);
        projectPage = factory.initProjectsPage(page);

        await homePage.loadHomePage();
    });

    test.beforeEach(async () => {
        await profilePage.clickProfilePage();
        await profilePage.clickProjectsSectionLink();
        previousNumberOfProject = await profilePage.getNumberOfProjects();
        await profilePage.clickCreateProject();
        await projectPage.closePopWindow();
    })

    test('create a porject test', async () => {
        let projectName = projectPageData.projectName + uuid();
        await projectPage.renameProject(projectName);
    })

    test('delete a project test', async () => {
        let projectName = projectPageData.projectName + uuid();
        await projectPage.renameProject(projectName);
        await projectPage.clickProjectSettings();
        await projectPage.deleteProject(projectName);
    });


    test.afterEach(async () => {
        await util.sleep(5);
        await profilePage.clickProfilePage()
        await profilePage.clickProjectsSectionLink();
        await expect(await profilePage.getNumberOfProjects()).toBeLessThan(previousNumberOfProject + 3); 
    })

    test.afterAll(async () => {
        await page.close()
    })
});