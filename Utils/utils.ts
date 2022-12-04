import { Browser, Locator, Page } from "@playwright/test";

export class utils
{
    private readonly page : Page

    constructor(page : Page)
    {
        this.page = page;
    }

    async goto(url : string, nextSelector : string, timeout? : number) : Promise<void>
    {
        await this.page.goto(url)
        await this.page.waitForSelector(nextSelector, { state : 'attached', timeout : timeout})
    }

    async gotoAndCheckForSelector(url : string, nextSelector : string) : Promise<boolean>
    {
        await this.page.goto(url)
        return await (await this.locator(nextSelector)).isVisible()
    }

    async locator(selector : string) : Promise<Locator>
    {
        return await this.page.locator(selector);
    }

    async fill(selector : string, data : string) : Promise<void>
    {
        await (await this.locator(selector)).fill(data);
    }

    async click(selector : string, nextSelector? : string, nextState? : "attached" | "visible", timeout? : number) : Promise<void>
    {
        await (await this.locator(selector)).click();
        if (nextSelector != null)
        {
            await this.page.waitForSelector(nextSelector, { state: nextState === null ? 'visible' : nextState, timeout : timeout})
        }
    }

    async clickLocator(locator : Locator, nextSelector? : string, nextState? : "attached" | "visible", timeout? : number) : Promise<void>
    {
        await locator.click();
        
        if (nextSelector != null)
        {
            await this.page.waitForSelector(nextSelector, { state: nextState === null ? 'visible' : nextState, timeout : timeout})
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
}