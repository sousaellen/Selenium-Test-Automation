const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser, until} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');

suite(function(env) {
 describe("UC07", function() {
        this.timeout(30000)
        let driver;
    before(async function() {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      //driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    after(async () => await driver.quit());
        it('TC30 - Realizar logout', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("Welcome "+ FIRST_NAME + " " + LAST_NAME, await driver.findElement(By.css(".smallText")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());

            let menuLogOut = await driver.findElement(By.linkText("Log Out")).click();
            //Asserts
            assert.equal("Customer Login\nUsername\nPassword\nForgot login info?\nRegister", await driver.findElement(By.id("leftPanel")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", await driver.getCurrentUrl());
            await driver.quit()
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
            await driver.get("https://parabank.parasoft.com/parabank/index.htm");
            let users2 = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME2, LAST_NAME2, USERNAME2, PASSWORD2} = users;
            let username2 = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password2 = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton2 = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("Welcome "+ FIRST_NAME + " " + LAST_NAME, await driver.findElement(By.css(".smallText")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());

            let menuLogOut2 = await driver.findElement(By.linkText("Log Out")).click();
            //Asserts
            assert.equal("Customer Login\nUsername\nPassword\nForgot login info?\nRegister", await driver.findElement(By.id("leftPanel")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", await driver.getCurrentUrl());

            await driver.quit()
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();

            await driver.quit()
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
        });
})
},{ browsers: [Browser.CHROME]})