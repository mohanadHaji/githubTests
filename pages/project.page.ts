import { Page } from "@playwright/test";
import { factory } from "../factory";
import { projectPageSelectors } from "../selectors/projectPage.selectors";
import { utils } from "../Utils/utils";

export class projectPage
{
    private readonly utils : utils;

    constructor(page : Page) {
        this.utils = factory.initUtils(page);
    }

    async renameProject(projectName: string): Promise<void> {
        await this.utils.fill(projectPageSelectors.projectTitle, projectName, projectPageSelectors.projectTitle);
        await this.utils.pressKey(projectPageSelectors.projectTitle, 'Enter');
    }
}