import { Page } from "@playwright/test";
import { factory } from "../factory";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { projectPageSelectors } from "../selectors/projectPage.selectors";
import { utils } from "../Utils/utils";

export class projectPage
{
    private readonly utils : utils;

    constructor(page : Page) {
        this.utils = factory.initUtils(page);
    }

    async closePopWindow() {
        await this.utils.click(projectPageSelectors.popoutWindoCreateButton, projectPageSelectors.projectTitle);
    }

    async renameProject(projectName: string): Promise<void> {
        await this.utils.click(projectPageSelectors.projectTitle, projectPageSelectors.projectTitle)
        await this.utils.fill(projectPageSelectors.projectTitle, projectName, projectPageSelectors.projectTitle);
        await this.utils.pressKey(projectPageSelectors.projectTitle, 'Enter');
    }

    async clickProjectSettings() {
        await this.utils.click(projectPageSelectors.projectMenuButton, projectPageSelectors.projectSettingsButton)
        await this.utils.click(projectPageSelectors.projectSettingsButton, projectPageSelectors.projectDeleteButton);
    }

    async deleteProject(projectName: string) {
        await this.utils.click(projectPageSelectors.projectDeleteButton, projectPageSelectors.projectConfirmDeleteInput);
        await this.utils.fill(projectPageSelectors.projectConfirmDeleteInput, projectName, projectPageSelectors.projectConfirmDeleteInput);
        await this.utils.click(await this.utils.getByRole('button', projectPageSelectors.deleteButtonText), profilePageSelectors.projectsPageButton);
    }
}