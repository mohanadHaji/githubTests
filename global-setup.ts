import { chromium, FullConfig } from '@playwright/test';
import { signinPageData } from './Data/signinPage.data';
import { factory } from './factory';
import signinPage from './pages/signin.page';
import { signinPageSelectors } from './selectors/signinPage.selectors';
import { utils } from './Utils/utils';

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    let utils: utils = factory.initUtils(page);
    let signinPage: signinPage = factory.initSigninPage(page);

    await utils.goto(baseURL as string, signinPageSelectors.emailSelector)
    await signinPage.signin(signinPageData.email, signinPageData.password, true, storageState as string)
    await browser.close();
}

export default globalSetup;