const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser, until} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');

suite(function(env) {
 describe("UC06", function() {
        this.timeout(50000)
        let driver;
    before(async function() {
      //driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    after(async () => await driver.quit());
        it('TC24 - Visualizar painel geral das contas com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            let menuAccountsOverview = await driver.findElement(By.linkText("Accounts Overview")).click();
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC25 - Exibir lista de contas com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            let menuAccountsOverview = await driver.findElement(By.linkText("Accounts Overview")).click();
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());
            assert.equal(true, await driver.findElement(By.id("accountTable")).isDisplayed());
            assert.equal("Account Balance* Available Amount", await driver.findElement(By.css("#accountTable > thead > tr")).getText());

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC26 - Visualizar detalhes de uma conta com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            let menuAccountsOverview = await driver.findElement(By.linkText("Accounts Overview")).click();
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal(true, await driver.findElement(By.id("accountTable")).isDisplayed());
            assert.equal("Account Balance* Available Amount", await driver.findElement(By.css("#accountTable > thead > tr")).getText());

            await driver.wait(until.elementLocated(By.css("td:nth-child(1) > .ng-binding")));
            await driver.findElement(By.css("td:nth-child(1) > .ng-binding")).click();
            //Asserts 
            assert.equal("Account Details", await driver.findElement(By.css(".ng-scope:nth-child(1) > .title")).getText());

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC27 - Verificar dados da conta', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            let menuAccountsOverview = await driver.findElement(By.linkText("Accounts Overview")).click();
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal(true, await driver.findElement(By.id("accountTable")).isDisplayed());
            assert.equal("Account Balance* Available Amount", await driver.findElement(By.css("#accountTable > thead > tr")).getText());

            await driver.wait(until.elementLocated(By.css("td:nth-child(1) > .ng-binding")));
            await driver.findElement(By.css("td:nth-child(1) > .ng-binding")).click();
            //Asserts 
            await driver.wait(until.elementLocated(By.css(".ng-scope:nth-child(1) > .title")));
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
        it('TC28 - Visualizar atividades da conta', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            await driver.findElement(By.linkText("Transfer Funds")).click()
            await driver.wait(until.elementLocated(By.id("toAccountId")));
            const dropdowntoAccount= await driver.findElement(By.id("toAccountId"))
            dropdowntoAccount.click()
            await driver.wait(until.elementLocated(By.css("#toAccountId > option:nth-child(2)")));
            await dropdowntoAccount.findElement(By.css("#toAccountId > option:nth-child(2)")).click()
            await driver.findElement(By.id("amount")).sendKeys("1")
            await driver.findElement(By.css(".button:nth-child(1)")).click()
            let menuAccountsOverview = await driver.findElement(By.linkText("Accounts Overview")).click();
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal(true, await driver.findElement(By.id("accountTable")).isDisplayed());
            assert.equal("Account Balance* Available Amount", await driver.findElement(By.css("#accountTable > thead > tr")).getText());

            await driver.wait(until.elementLocated(By.css("td:nth-child(1) > .ng-binding")));
            await driver.findElement(By.css("td:nth-child(1) > .ng-binding")).click();
            let activityPeriod = await driver.findElement(By.id("month")).getText();
            let activityType = await driver.findElement(By.id("transactionType")).getText();
            if (activityPeriod !== "All" && activityType !== "All") {
                const dropdownMonth = await driver.findElement(By.id("month"))
                dropdownMonth.click()
                await dropdownMonth.findElement(By.xpath("//option[. = 'All']")).click()
                const dropdownType = await driver.findElement(By.id("transactionType"))
                dropdownType.click()
                await dropdownType.findElement(By.xpath("//option[. = 'All']")).click()

                await driver.findElement(By.xpath("//input[@value='Go']")).click();
            } else {
                await driver.findElement(By.xpath("//input[@value='Go']")).click();
            }
            //Asserts 
            await driver.wait(until.elementLocated(By.id("transactionTable")));
            assert.equal("Account Activity", await driver.findElement(By.css(".ng-scope:nth-child(2) > .title")).getText());
            assert.equal(true, await driver.findElement(By.id("transactionTable")).isDisplayed());
            assert.equal("Date Transaction Debit (-) Credit (+)", await driver.findElement(By.css("#transactionTable > thead > tr")).getText());
        
            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC29 - Visualizar lista de transações da conta', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            let pagetransfer = await driver.getCurrentUrl();
            if  (pagetransfer !== 'https://parabank.parasoft.com/parabank/overview.htm'){
                await driver.wait(until.elementLocated(By.linkText("Transfer Funds")), 10000);
                await driver.get("https://parabank.parasoft.com/parabank/index.htm");
                let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
                let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
                let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click();
            } 
            await driver.findElement(By.linkText("Transfer Funds")).click()
            await driver.wait(until.elementLocated(By.id("toAccountId")));
            const dropdowntoAccount= await driver.findElement(By.id("toAccountId"))
            dropdowntoAccount.click()
            await driver.wait(until.elementLocated(By.css("#toAccountId > option:nth-child(2)")));
            await dropdowntoAccount.findElement(By.css("#toAccountId > option:nth-child(2)")).click()
            await driver.findElement(By.id("amount")).sendKeys("1")
            await driver.findElement(By.css(".button:nth-child(1)")).click()
            let menuAccountsOverview = await driver.findElement(By.linkText("Accounts Overview")).click();
            
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal(true, await driver.findElement(By.id("accountTable")).isDisplayed());
            assert.equal("Account Balance* Available Amount", await driver.findElement(By.css("#accountTable > thead > tr")).getText());

            await driver.wait(until.elementLocated(By.css("td:nth-child(1) > .ng-binding")));
            await driver.findElement(By.css("td:nth-child(1) > .ng-binding")).click();
            let activityPeriod = await driver.findElement(By.id("month")).getText();
            let activityType = await driver.findElement(By.id("transactionType")).getText();
            if (activityPeriod !== "All" && activityType !== "All") {
                const dropdownMonth = await driver.findElement(By.id("month"))
                dropdownMonth.click()
                await dropdownMonth.findElement(By.xpath("//option[. = 'All']")).click()
                const dropdownType = await driver.findElement(By.id("transactionType"))
                dropdownType.click()
                await dropdownType.findElement(By.xpath("//option[. = 'All']")).click()
                await driver.findElement(By.xpath("//input[@value='Go']")).click();
            } else {
                await driver.findElement(By.xpath("//input[@value='Go']")).click();
            }
            //Asserts 
            await driver.wait(until.elementLocated(By.id("transactionTable")));
            assert.equal(true, await driver.findElement(By.id("transactionTable")).isDisplayed());
            assert.equal("Date Transaction Debit (-) Credit (+)", await driver.findElement(By.css("#transactionTable > thead > tr")).getText());
            
            await driver.wait(until.elementLocated(By.xpath("//a[contains(@href, 'transaction.htm?id')]")));
            await driver.findElement(By.xpath("//a[contains(@href, 'transaction.htm?id')]")).click();
            //Asserts 
            assert.equal("Transaction Details", await driver.findElement(By.className("title")).getText());
            assert.equal(true, await driver.findElement(By.xpath("//b[contains(.,'Transaction ID:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.css("tr:nth-child(1) > td:nth-child(2)")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//b[contains(.,'Date:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.css("tr:nth-child(2) > td:nth-child(2)")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//b[contains(.,'Description:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.css("tr:nth-child(3) > td:nth-child(2)")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//b[contains(.,'Type:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.css("tr:nth-child(4) > td:nth-child(2)")).isDisplayed()); 
            assert.equal(true, await driver.findElement(By.xpath("//b[contains(.,'Amount:')]")).isDisplayed());
            assert.equal(true, await driver.findElement(By.css("tr:nth-child(5) > td:nth-child(2)")).isDisplayed()); 

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
})
},{ browsers: [Browser.CHROME]})