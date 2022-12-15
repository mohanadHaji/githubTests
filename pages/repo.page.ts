import { Page } from "@playwright/test";
import { utils } from "../Utils/utils";
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { repoPageData } from "../Data/repoPage.data";
import { profilePageSelectors } from "../selectors/profilePage.selectors";

export class repoPage {
    private readonly utils: utils

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    /**
     * expect to be in new repo page
     * redirect to repo page => code tab
    */
    async createRepo(repoName: string, desciption?: string, isPublic: boolean = true): Promise<void> {
        await this.utils.fill(repoPageSelectors.newRepoNameSelector, repoName, repoPageSelectors.newRepoNameSelector);

        if (desciption != null) {
            await this.utils.fill(repoPageSelectors.repository_description, desciption, repoPageSelectors.repository_description);
        }

        let repoVisibilitySelector = isPublic ? repoPageSelectors.repository_visibility_public : repoPageSelectors.repository_visibility_private
        await this.utils.click(repoVisibilitySelector, repoPageSelectors.repository_visibility_public)

        if (!await this.utils.isLocatorChecked(repoVisibilitySelector)) {
            let errorMessage : string = 'repo visibilty (' + repoVisibilitySelector + ') is not checked correctly'
            console.log(errorMessage)
            throw new Error(errorMessage);
        }

        await this.utils.click(repoPageSelectors.createRepoButton, repoPageSelectors.codeTab);
    }

    /**
     * expect to be in code tab
     * redirect to settings tab
    */
    async clickSettingsTab(): Promise<void> {
        await this.utils.click(repoPageSelectors.settingsTab, repoPageSelectors.renameField)
    }

    /**
     * expect to be in settings tab
     * redirect to pofile page => overview tab
    */
    async deleteRepo(accountName: string, repoName: string): Promise<void> {
        let deleteButton = await this.utils.getByRole('button', repoPageData.deleteButtonText);
        await this.utils.click(deleteButton, repoPageSelectors.deleteConfirmationLabel);
        await this.utils.fill(repoPageSelectors.deleteConfirmationLabel, accountName + '/' + repoName, repoPageSelectors.deleteConfirmationLabel)
        let deleteLabel = await this.utils.getByText(repoPageData.deleteLabelTest);

        await this.utils.click(deleteLabel, profilePageSelectors.repoButton);
    }

    /**
     * expect to be in code tab
     * redirect to project tab
    */ 
    async clickProjectTab(): Promise<void> {
        await this.utils.click(repoPageSelectors.projectTab, repoPageSelectors.linkOrAddProjectButton);
    }

    /**
     * expect to be in project tab
    */
    async linkProject(projectName: string): Promise<void> {
        await this.utils.click(repoPageSelectors.linkOrAddProjectButton, repoPageSelectors.searhForProjectButton);
        await this.utils.fill(repoPageSelectors.searhForProjectButton, projectName, repoPageSelectors.searhForProjectButton);
        await this.utils.click(await this.utils.getByText(projectName), repoPageSelectors.linkOrAddProjectButton);
        await this.utils.click(repoPageSelectors.linkOrAddProjectButton, repoPageSelectors.linkOrAddProjectButton);
    }

    /**
     * expect to be in code tab\n
     * return the clone urls for https
    */
    async getRepoCloneLink(): Promise<string> {
        return await (await this.utils.locator(repoPageSelectors.cloneUrlLoctors)).getAttribute('value') ?? '';
    }

    /**
      * expect to be in settings page
      * redirect to repo code tab
    */
    async renameRepo(newName: string): Promise<void> {
        await this.utils.fill(repoPageSelectors.renameField, newName, repoPageSelectors.renameField)
        await this.utils.click(await this.utils.getByText(repoPageSelectors.renameButtonText), repoPageSelectors.cloneUrlLoctors);
    }
}