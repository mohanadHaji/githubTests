import { Locator, Page } from "@playwright/test";
import { stateEnum } from "../enums/state.enum";

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
            console.log('failed navigiating to the to page\nwith error : ' + error);
            throw error;
        }
    }

    async isLocatorVisible(selector: string): Promise<boolean> {
        try {
            return await (await this.locator(selector)).isVisible();
        }
        catch (error) {
            console.log('failed finding the visibilty of the locater: ' + selector + '\nwith error : ' + error);
            throw error;
        }
    }

    async isLocatorChecked(selector: string): Promise<boolean> {
        try {
            return await (await this.locator(selector)).isChecked();
        } catch (error) {
            console.log('could not check if locator: ' + selector + 'is checked with error:' + error);
            throw error;
        }
    }

    async locator(selector: string): Promise<Locator> {
        try {
            return this.page.locator(selector);
        } catch (error) {
            console.log('failed finding the locater: ' + selector + '\nwith error : ' + error);
            throw error;
        }
    }

    async fill(selector: string, data: string, waitForSelector?: string): Promise<void> {
        try {
            if (waitForSelector) {
                await this.waitForSelector(waitForSelector)
            }
            await (await this.locator(selector)).fill(data);
        } catch (error) {
            console.log('failed to fill the selector ' + selector + '\nwith error : ' + error);
            throw error;
        }
    }

    async click(selector: string | Locator, nextSelector: string, timeout?: number): Promise<void> {
        try {
            let locator = typeof selector === 'string' ? await this.locator(selector) : selector;
            await locator.click();
            await this.waitForSelector(nextSelector, { timeout: timeout })
        } catch (error) {
            console.log('failed to click the selector ' + selector + '\nwith error : ' + error);
            throw error;
        }
    }

    async getByRole(role: "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem",
        name: string | RegExp): Promise<Locator> {
        try {
            return this.page.getByRole(role, { name: name });
        } catch (error) {
            console.log('failed to get the loctor by role: ' + role + '\nwith error : ' + error);
            throw error;
        }
    }

    async getByText(selector: string): Promise<Locator> {
        try {
            return this.page.getByText(selector);
        } catch (error) {
            console.log('failed to get the locator by text: ' + selector + '\nwith error : ' + error);
            throw error;
        }
    }

    async waitForSelector(selector: string, option?: { timeout?: number }) {
        await this.page.waitForSelector(selector, { state: stateEnum.visible, timeout: option?.timeout })
    }

    format(input: string, inputArray: string[]) : string {
        try {
            return input.replace(/{(\d+)}/g, function (match, number) {
                return typeof inputArray[number] != 'undefined'
                    ? inputArray[number]
                    : match;
            });
        } catch (error) {
            console.log('falied formating the string');
            throw error;
        }
    };

    async sleep(dealyInSeconds: number) {
        await this.page.waitForTimeout(dealyInSeconds * 1000);
    }
}