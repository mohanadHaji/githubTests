import { Locator, Page } from "@playwright/test";

export class utils {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string, nextSelector: string, timeout?: number) {
        try {
            await this.page.goto(url)
            await this.waitForSelector(nextSelector, { timeout: timeout })
        }
        catch (error) {
            throw new Error('failed navigiating to the to page\nwith error : ' + error);
        }
    }

    async isLocatorChecked(selector: string): Promise<boolean> {
        try {
            return await (await this.locator(selector)).isChecked();
        } catch (error) {
            throw new Error('could not check if locator: ' + selector + 'is checked with error:' + error);
        }
    }

    async locator(selector: string): Promise<Locator> {
        try {
            return this.page.locator(selector);
        } catch (error) {
            throw new Error('failed finding the locater: ' + selector + '\nwith error : ' + error);
        }
    }

    async fill(selector: string, data: string, waitForSelector: string): Promise<void> {
        try {
            await this.waitForSelector(waitForSelector)
            await (await this.locator(selector)).fill(data);
        } catch (error) {
            throw new Error('failed to fill the selector ' + selector + '\nwith error : ' + error);
        }
    }

    async click(selector: string | Locator, nextSelector: string | Locator, timeout?: number): Promise<void> {
        try {
            let locator = typeof selector === 'string' ? await this.locator(selector) : selector;
            await locator.click();

            if (typeof nextSelector === 'string') {
                await this.waitForSelector(nextSelector, { timeout: timeout })
            }
            else if (!await this.isLocatorVisible(selector)) {
                throw Error('next locator is not visible after clicking the selector')
            }
        } catch (error) {
            throw new Error('failed to click the selector ' + selector + '\nwith error : ' + error);
        }
    }

    async pressKey(selector: string, key: string, waitForSelector: string) {
        try {
            await (await this.locator(selector)).press(key);
            await this.waitForSelector(waitForSelector);
        } catch (error) {
            throw new Error('failed to press key: ' + key + ' on the selector: ' + selector + '\nwith error : ' + error);
        }
    }

    async getByRole(role: "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem",
        name: string | RegExp): Promise<Locator> {
        try {
            return this.page.getByRole(role, { name: name });
        } catch (error) {
            throw new Error('failed to get the loctor by role: ' + role + '\nwith error : ' + error);
        }
    }

    async getByText(selector: string | RegExp): Promise<Locator> {
        try {
            return this.page.getByText(selector);
        } catch (error) {
            throw new Error('failed to get the locator by text: ' + selector + '\nwith error : ' + error);
        }
    }

    async waitForSelector(selector: string, option?: { timeout?: number }) {
        await this.page.waitForSelector(selector, { timeout: option?.timeout })
    }

    async isLocatorVisible(selector: string | Locator, timeout: number = 5): Promise<boolean> {
        let locator: Locator = typeof selector === 'string' ? await this.locator(selector) : selector;
        try {
            return await this.setTimeout(timeout, async () => await locator.isVisible());
        } catch (error) {
            throw new Error('failed finding the visibilty of the locater: ' + selector + '\nwith error : ' + error);
        }
    }

    async reloadPage(nextSelector: string) {
        await this.page.reload();
        await this.waitForSelector(nextSelector);
    }

    format(input: string, inputArray: string[]): string {
        try {
            return input.replace(/{(\d+)}/g, function (match, number) {
                return typeof inputArray[number] != 'undefined'
                    ? inputArray[number]
                    : match;
            });
        } catch (error) {
            throw new Error('falied formating the string');
        }
    };

    async sleep(dealyInSeconds: number) {
        await this.page.waitForTimeout(dealyInSeconds * 1000);
    }

    async setTimeout(timeoutInSeconds: number, call: (args: void) => Promise<boolean>) {
        var startTime = Date.now();
        while ((Date.now() - startTime) < timeoutInSeconds * 1000) {
            if (await call()) {
                return true;
            }
        }

        return false;
    };
}