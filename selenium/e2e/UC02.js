const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');
suite(function(env) {
 describe("UC02", function() {
        this.timeout(30000)
        let driver;
    before(async function() {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      //driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    //after(async () => await driver.quit());
        it('TC07 - Login com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Accounts Overview", await driver.findElement(By.className("title")).getText());
            assert.equal("Welcome "+ FIRST_NAME + " " + LAST_NAME, await driver.findElement(By.css(".smallText")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/overview.htm", await driver.getCurrentUrl());

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC08 - Login com todos os campos vazios', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/user_login_all_fields_empty.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("Please enter a username and password.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/login.htm", await driver.getCurrentUrl());        
        });
        it('TC09 - Login com usuário não cadastrado', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/user_login_unregistered.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("The username and password could not be verified.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/login.htm", await driver.getCurrentUrl());           
        });
        it('TC10 - Login com senha errada', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/user_login_wrong_password.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("The username and password could not be verified.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/login.htm", await driver.getCurrentUrl()); 
        });
        it('TC11 - Login com campo de usuário vazio', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys("");
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("Please enter a username and password.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/login.htm", await driver.getCurrentUrl());           
        });
        it('TC12 - Login com campo de senha vazio', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/login/users_login.json'));
            const { FIRST_NAME, LAST_NAME, USERNAME, PASSWORD} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys("");
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("Please enter a username and password.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/login.htm", await driver.getCurrentUrl());          
        });
})
},{ browsers: [Browser.CHROME]})