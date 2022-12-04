import { Page } from "@playwright/test"
import { deletePageData } from "../Data/deletePage.data";
import { factory } from "../factory"
import { deletePageSelectors } from "../selectors/deletePage.selectors";
import { utils } from "../Utils/utils"

export default class deletePage
{
    private readonly utils : utils

    constructor(page : Page)
    {
        this.utils = factory.initUtils(page);
    }

    async gotoDeletePage(pageSelector : string) : Promise<void>
    {
        await this.utils.click(pageSelector, deletePageSelectors.renameField)
    }

    async deleteRepo(accountName : string, repoName : string) : Promise<void>
    {
        let deleteButton = await this.utils.getByRole('button', deletePageData.deleteButtonText);
        await this.utils.clickLocator(deleteButton, deletePageSelectors.deleteConfirmationLabel);
        await this.utils.fill(deletePageSelectors.deleteConfirmationLabel, accountName + '/' + repoName)
        let deleteLabel = await this.utils.getByText(deletePageData.deleteLabelTest);

        await this.utils.clickLocator(deleteLabel);
    }
}