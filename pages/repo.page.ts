import { Page } from "@playwright/test";
import { utils } from "../Utils/utils";
import { factory } from "../factory";
import { repoPageSelectors } from "../selectors/repoPage.selectors";
import { commonData } from "../Data/common.data";
import { repoPageData } from "../Data/repoPage.data";
import { stateEnum } from "../enums/state.enum";

export class repoPage {
    private readonly utils: utils

    constructor(page: Page) {
        this.utils = factory.initUtils(page);
    }

    async createRepo(repoName: string, desciption?: string, isPublic: boolean = true): Promise<void> {
        await this.utils.fill(repoPageSelectors.newRepoNameSelector, repoName, repoPageSelectors.newRepoNameSelector);
        if (desciption != null) {
            await this.utils.fill(repoPageSelectors.repository_description, desciption);
        }

        isPublic ? await this.utils.click(repoPageSelectors.repository_visibility_public) :
            await this.utils.click(repoPageSelectors.repository_visibility_private);
        await this.utils.click(repoPageSelectors.createRepoButton, repoPageSelectors.codeTab, stateEnum.visible, 8000);
    }

    async gotoDeletePage(pageSelector: string): Promise<void> {
        await this.utils.click(pageSelector, repoPageSelectors.renameField)
    }

    async deleteRepo(accountName: string, repoName: string): Promise<void> {
        let deleteButton = await this.utils.getByRole('button', repoPageData.deleteButtonText);
        await this.utils.click(deleteButton, repoPageSelectors.deleteConfirmationLabel);
        await this.utils.fill(repoPageSelectors.deleteConfirmationLabel, accountName + '/' + repoName)
        let deleteLabel = await this.utils.getByText(repoPageData.deleteLabelTest);

        await this.utils.click(deleteLabel);
    }
}