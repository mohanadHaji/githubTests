import { Page } from "@playwright/test";
import { utils } from "../Utils/utils";
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
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
        await this.utils.fill(repoPageSelectors.newRepoSelectors.newRepoNameSelector, repoName, repoPageSelectors.newRepoSelectors.newRepoNameSelector);

        if (desciption != null) {
            await this.utils.fill(repoPageSelectors.newRepoSelectors.repository_description, desciption, repoPageSelectors.newRepoSelectors.repository_description);
        }

        let repoVisibilitySelector = isPublic ? repoPageSelectors.newRepoSelectors.repository_visibility_public : repoPageSelectors.newRepoSelectors.repository_visibility_private
        await this.utils.click(repoVisibilitySelector, repoPageSelectors.newRepoSelectors.repository_visibility_public)

        if (!await this.utils.isLocatorChecked(repoVisibilitySelector)) {
            let errorMessage : string = 'repo visibilty (' + repoVisibilitySelector + ') is not checked correctly'
            console.log(errorMessage)
            throw new Error(errorMessage);
        }

        await this.utils.click(await this.utils.getByText(repoPageSelectors.newRepoSelectors.createRepoButton), repoPageSelectors.codeTab);
    }

    /**
     * expect to be in code tab
     * redirect to settings tab
    */
    async clickSettingsTabButton(): Promise<void> {
        await this.utils.click(repoPageSelectors.settingsTab.settingsTab, repoPageSelectors.settingsTab.renameField)
    }

    /**
     * expect to be in settings tab
     * redirect to pofile page => overview tab
    */
    async deleteRepo(accountName: string, repoName: string): Promise<void> {
        let deleteButton = await this.utils.getByRole('button', repoPageSelectors.settingsTab.deleteButtonText);
        await this.utils.click(deleteButton, repoPageSelectors.settingsTab.deleteConfirmationLabel);
        await this.utils.fill(repoPageSelectors.settingsTab.deleteConfirmationLabel, accountName + '/' + repoName, repoPageSelectors.settingsTab.deleteConfirmationLabel)
        let deleteLabel = await this.utils.getByText(repoPageSelectors.settingsTab.deleteLabelTest);

        await this.utils.click(deleteLabel, profilePageSelectors.repoButton);
    }

    /**
     * expect to be in code tab
     * redirect to project tab
    */ 
    async clickProjectTabButton(): Promise<void> {
        await this.utils.click(repoPageSelectors.settingsTab.projectTab, repoPageSelectors.settingsTab.linkOrAddProjectButton);
    }

    /**
     * expect to be in project tab
    */
    async linkProject(projectName: string): Promise<void> {
        await this.utils.click(repoPageSelectors.settingsTab.linkOrAddProjectButton, repoPageSelectors.settingsTab.searhForProjectButton);
        await this.utils.fill(repoPageSelectors.settingsTab.searhForProjectButton, projectName, repoPageSelectors.settingsTab.searhForProjectButton);
        await this.utils.click(await this.utils.getByText(projectName), repoPageSelectors.settingsTab.linkOrAddProjectButton);
        await this.utils.click(repoPageSelectors.settingsTab.linkOrAddProjectButton, repoPageSelectors.settingsTab.linkOrAddProjectButton);
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
        await this.utils.fill(repoPageSelectors.settingsTab.renameField, newName, repoPageSelectors.settingsTab.renameField)
        await this.utils.click(await this.utils.getByText(repoPageSelectors.settingsTab.renameButtonText), repoPageSelectors.cloneUrlLoctors);
    }

    /**
     * expect to be in settinfs tab
     * satys in settings tab after changing
     */
    async changeRepoVisibility() {
        await this.utils.click(await this.utils.getByText(repoPageSelectors.settingsTab.ChangeVisibilityButtonText), await this.utils.getByText(repoPageSelectors.settingsTab.ChangeVisibilityToButtonRegex))
        await this.utils.click(await this.utils.getByText(repoPageSelectors.settingsTab.ChangeVisibilityToButtonRegex), repoPageSelectors.settingsTab.ChangeRepoConfirmButton);

        await this.utils.click(repoPageSelectors.settingsTab.ChangeRepoConfirmButton, repoPageSelectors.settingsTab.ChangeRepoConfirmButton);        
        await this.utils.click(repoPageSelectors.settingsTab.ChangeRepoConfirmButton, repoPageSelectors.settingsTab.ChangeRepoConfirmButton);
        await this.utils.click(repoPageSelectors.settingsTab.ChangeRepoConfirmButton, repoPageSelectors.settingsTab.renameField);
    }
}