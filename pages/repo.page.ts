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

    async clickDeletePage(pageSelector: string): Promise<void> {
        await this.utils.click(pageSelector, repoPageSelectors.renameField)
    }

    async deleteRepo(accountName: string, repoName: string): Promise<void> {
        let deleteButton = await this.utils.getByRole('button', repoPageData.deleteButtonText);
        await this.utils.click(deleteButton, repoPageSelectors.deleteConfirmationLabel);
        await this.utils.fill(repoPageSelectors.deleteConfirmationLabel, accountName + '/' + repoName, repoPageSelectors.deleteConfirmationLabel)
        let deleteLabel = await this.utils.getByText(repoPageData.deleteLabelTest);

        await this.utils.click(deleteLabel, profilePageSelectors.repoButton);
    }
}