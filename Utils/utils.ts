import { Browser, BrowserContext, Locator, Page } from "@playwright/test";
import { operations } from "../enums/operations.enum";
import { stateEnum } from "../enums/state.enum";

export class utils
{
    private readonly page : Page

    constructor(page : Page)
    {
        this.page = page;
    }

    async goto(url : string, nextSelector : string, operation : operations.visible | operations.waitFor = operations.waitFor, timeout? : number) : Promise<boolean>
    {
        await this.page.goto(url)
        if(operation === operations.waitFor)
        {
            await this.page.waitForSelector(nextSelector, { state : stateEnum.attached, timeout : timeout})
        }
        else
        {
            await this.page.goto(url)
            return await this.isLocatorVisible(nextSelector)
        }

        return true;
    }

    async isLocatorVisible(selector : string) : Promise<boolean>
    {
        return await (await this.locator(selector)).isVisible();
    }
    
    async locator(selector : string) : Promise<Locator>
    {
        return await this.page.locator(selector);
    }

    async fill(selector : string, data : string) : Promise<void>
    {
        await (await this.locator(selector)).fill(data);
    }

    async click(selector : string, nextSelector? : string, nextState? : stateEnum.attached| stateEnum.visible, timeout? : number) : Promise<void>
    {
        await (await this.locator(selector)).click();
        if (nextSelector != null)
        {
            await this.page.waitForSelector(nextSelector, { state: nextState === null ? stateEnum.visible : nextState, timeout : timeout})
        }
    }

    async clickLocator(locator : Locator, nextSelector? : string, nextState? : stateEnum.attached| stateEnum.visible, timeout? : number) : Promise<void>
    {
        await locator.click();
        
        if (nextSelector != null)
        {
            await this.page.waitForSelector(nextSelector, { state: nextState === null ? stateEnum.visible : nextState, timeout : timeout})
        }
    }

    async getByRole(role : "alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem",
    name : string | RegExp) : Promise<Locator>
    {
        return await this.page.getByRole(role, { name: name });
    }

    async getByText(selector : string) : Promise<Locator>
    {
        return await this.page.getByText(selector);
    }

    async saveContext(storageName : string)
    {
        await (await this.page.context()).storageState({path : storageName});;
    }

    static async getContext(browser : Browser, storageName : string) : Promise<BrowserContext>
    {
        return await browser.newContext({storageState : storageName});
    }
}