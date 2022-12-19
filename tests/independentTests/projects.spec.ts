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

    test('create a porject test', async () => {
        previousNumberOfProject = await getNumberOfProjects(profilePage);

        await profilePage.clickCreateProject();
        await projectPage.closePopWindow();

        let projectName = projectPageData.projectName + uuid();
        await projectPage.renameProject(projectName);

        await util.sleep(5);
        await profilePage.clickProfilePage()
        await profilePage.clickProjectsSectionLink();
        expect(await getNumberOfProjects(profilePage)).toBeLessThan(previousNumberOfProject + 3);
    })

    test('delete a project test', async () => {
        
        previousNumberOfProject = await getNumberOfProjects(profilePage)
        await profilePage.clickCreateProject();
        await projectPage.closePopWindow();

        let projectName = projectPageData.projectName + uuid();
        await projectPage.renameProject(projectName);
        await projectPage.clickProjectSettings();
        await projectPage.deleteProject(projectName);

        await util.sleep(5);
        
        expect(await getNumberOfProjects(profilePage)).toBeLessThan(previousNumberOfProject + 3); 
    });

    test.afterAll(async () => {
        await page.close()
    })
});

async function getNumberOfProjects(profilePage: profilePage) : Promise<number> {
    await profilePage.clickProfilePage();
    await profilePage.clickProjectsSectionLink();
    return await profilePage.getNumberOfProjects();
}