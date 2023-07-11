const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser, until} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');

suite(function(env) {
 describe("UC05", function() {
        this.timeout(30000)
        let driver;
    before(async function() {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      //driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    after(async () => await driver.quit());
        it('TC22 - Criar uma conta com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("Welcome "+ FIRST_NAME + " " + LAST_NAME, await driver.findElement(By.css(".smallText")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());

            await driver.findElement(By.linkText("Open New Account")).click()
            assert.equal("Open New Account", await driver.findElement(By.className("title")).getText())
            const dropdownType = await driver.findElement(By.id("type"))
            dropdownType.click()
            await dropdownType.findElement(By.xpath("//option[. = 'SAVINGS']")).click()
            const dropdownAccountId = await driver.findElement(By.id("fromAccountId"))
            dropdownAccountId.click() 
            await driver.actions().doubleClick(driver.findElement(By.xpath("//input[@class=\"button\"]"))).perform()
            await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Account Opened!')]")));
            //Asserts
            assert.equal("Account Opened!", await driver.findElement(By.className("title")).getText())
            assert.equal("Congratulations, your account is now open.", await driver.findElement(By.css(".ng-scope > p:nth-child(2)")).getText())
            assert.equal("Your new account number:", await driver.findElement(By.css("p:nth-child(3) > b")).getText())
            assert.equal(true, await driver.findElement(By.id("newAccountId")).isDisplayed())
            assert.equal("https://parabank.parasoft.com/parabank/openaccount.htm", await driver.getCurrentUrl());

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC23 - Visualizar detalhes de uma nova conta ', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("Welcome "+ FIRST_NAME + " " + LAST_NAME, await driver.findElement(By.css(".smallText")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());

            await driver.findElement(By.linkText("Open New Account")).click()
            assert.equal("Open New Account", await driver.findElement(By.className("title")).getText())
            const dropdownType = await driver.findElement(By.id("type"))
            dropdownType.click()
            await dropdownType.findElement(By.xpath("//option[. = 'SAVINGS']")).click()
            const dropdownAccountId = await driver.findElement(By.id("fromAccountId"))
            //dropdownAccountId.click()
            await driver.actions().doubleClick(driver.findElement(By.xpath("//input[@class=\"button\"]"))).perform()
            await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Account Opened!')]")));
            //Asserts
            assert.equal("Account Opened!", await driver.findElement(By.className("title")).getText())
            assert.equal("Congratulations, your account is now open.", await driver.findElement(By.css(".ng-scope > p:nth-child(2)")).getText())
            assert.equal("Your new account number:", await driver.findElement(By.css("p:nth-child(3) > b")).getText())
            assert.equal(true, await driver.findElement(By.id("newAccountId")).isDisplayed())

            let idNewAccount = await driver.findElement(By.id("newAccountId")).getText()
            await driver.findElement(By.id("newAccountId")).click()
            //Asserts 
            await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Account Details')]")));
            assert.equal("https://parabank.parasoft.com/parabank/activity.htm?id=" + idNewAccount, await driver.getCurrentUrl());
            assert.equal("Account Details", await driver.findElement(By.css(".ng-scope:nth-child(1) > .title")).getText());
            assert.equal(true, await driver.findElement(By.xpath("//td[contains(.,'Account Number:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.id("accountId")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//td[contains(.,'Account Type:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.id("accountType")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//td[contains(.,'Balance:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.id("balance")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//td[contains(.,'Available:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.id("availableBalance")).isDisplayed()); 
            
            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
})
},{ browsers: [Browser.CHROME]})