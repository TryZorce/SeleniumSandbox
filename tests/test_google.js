const { By, Key, Builder, WebElementCondition, until } = require("selenium-webdriver");
const assert = require("assert");

(async function test_google() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get('https://www.google.com');

        let acceptButton = await driver.wait(until.elementLocated(By.css('.QS5gu.sy4vM')), 5000);
        if (acceptButton) {
            await acceptButton.click();
        } else {
            console.log('Bouton tout accepter pas trouvée');
        }

        let searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);

        await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
        let title = await driver.getTitle();
        assert(title.includes('Selenium WebDriver'));

    } catch (e) {
        console.log(e);

    } finally {
        await driver.quit();

        /*
        setInterval(function(){
            driver.quit();
        }, 10000);
        */

    }
})()