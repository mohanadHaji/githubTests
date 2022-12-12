import { Page } from "@playwright/test";
import homePage from "./pages/home.page";
import { mainPage } from "./pages/main.page";
import { profilePage } from "./pages/profile.page";
import { repoPage } from "./pages/repo.page";
import signinPage from "./pages/signin.page";
import { utils } from "./Utils/utils";

class Factory {
    initUtils(page: Page): utils {
        return new utils(page)
    }

    initMainPage(page: Page): mainPage {
        return new mainPage(page);
    }

    initHomePage(page: Page): homePage {
        return new homePage(page);
    }

    initProfilePage(page: Page): profilePage {
        return new profilePage(page);
    }

    initSigninPage(page: Page): signinPage {
        return new signinPage(page);
    }

    initRepoPage(page: Page): repoPage {
        return new repoPage(page);
    }
}

let factory = new Factory();

export { factory };