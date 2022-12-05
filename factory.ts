import { Page } from "@playwright/test";
import deletePage from "./pages/delete.page";
import mainPage from "./pages/main.page";
import { repoPage } from "./pages/repo.page";
import signinPage from "./pages/signin.page";
import { utils } from "./Utils/utils";

class Factory
{
    initUtils(page : Page) : utils
    {
        return new utils(page)
    }

    initMainPage(page : Page)
    {
        return new mainPage(page);
    }
    
    initSigninPage(page : Page) : signinPage
    {
        return new signinPage(page);
    }

    initRepoPage(page : Page) : repoPage
    {
        return new repoPage(page);
    }

    initDeletePage(page : Page) : deletePage
    {
        return new deletePage(page);
    }
}

let factory = new Factory();

export {factory};