const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');

suite(function(env) {
 describe("UC03", function() {
        this.timeout(30000)
        let driver;
    before(async function() {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      //driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    after(async () => await driver.quit());
        it('TC13 - Encontrar informações de login com sucesso', async function() {
            let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/find_login_info/registered_user.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
            let menuForgotLoginInfo= await driver.findElement(By.linkText("Forgot login info?")).click();
            let firstName = await driver.findElement(By.id("firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("address.zipCode")).sendKeys(ZIP_CODE);
            let ssn = await driver.findElement(By.id("ssn")).sendKeys(SSN)
            let FindMyLoginInfoButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("Customer Lookup", await driver.findElement(By.className("title")).getText());
            assert.equal("Your login information was located successfully. You are now logged in.", await driver.findElement(By.css("#rightPanel > p:nth-child(2)")).getText());
            assert.equal("Username: " + USERNAME + "\nPassword: " + PASSWORD, await driver.findElement(By.css("#rightPanel > p:nth-child(3)")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/lookup.htm", await driver.getCurrentUrl());

            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC14 - Encontrar informações de login com todos os campos vazios', async function() {
            let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/find_login_info/registered_user_all_fields_empty.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
            let menuForgotLoginInfo= await driver.findElement(By.linkText("Forgot login info?")).click();
            let firstName = await driver.findElement(By.id("firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("address.zipCode")).sendKeys(ZIP_CODE);
            let ssn = await driver.findElement(By.id("ssn")).sendKeys(SSN)
            let FindMyLoginInfoButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("First name is required.", await driver.findElement(By.id("firstName.errors")).getText());
            assert.equal("Last name is required.", await driver.findElement(By.id("lastName.errors")).getText());
            assert.equal("Address is required.", await driver.findElement(By.id("address.street.errors")).getText());
            assert.equal("City is required.", await driver.findElement(By.id("address.city.errors")).getText());
            assert.equal("State is required.", await driver.findElement(By.id("address.state.errors")).getText());
            assert.equal("Zip Code is required.", await driver.findElement(By.id("address.zipCode.errors")).getText());
            assert.equal("Social Security Number is required.", await driver.findElement(By.id("ssn.errors")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/lookup.htm", await driver.getCurrentUrl());
            assert.equal("Please fill out the following information in order to validate your account.", await driver.findElement(By.css("#rightPanel > p")).getText() )
        });
        it('TC15 - Encontrar informações de login com dados inconsistentes', async function() {
            let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/find_login_info/registered_users_inconsistent_data.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
            let menuForgotLoginInfo= await driver.findElement(By.linkText("Forgot login info?")).click();
            let firstName = await driver.findElement(By.id("firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("address.zipCode")).sendKeys(ZIP_CODE);
            let ssn = await driver.findElement(By.id("ssn")).sendKeys(SSN)
            let FindMyLoginInfoButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("The customer information provided could not be found.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/lookup.htm", await driver.getCurrentUrl());
        });
        it('TC16 - Encontrar informações de login com usuário não cadastrado', async function() {
            let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/find_login_info/unregistered_users.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
            let menuForgotLoginInfo= await driver.findElement(By.linkText("Forgot login info?")).click();
            let firstName = await driver.findElement(By.id("firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("address.zipCode")).sendKeys(ZIP_CODE);
            let ssn = await driver.findElement(By.id("ssn")).sendKeys(SSN)
            let FindMyLoginInfoButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("Error!", await driver.findElement(By.className("title")).getText());
            assert.equal("The customer information provided could not be found.", await driver.findElement(By.className("error")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/lookup.htm", await driver.getCurrentUrl());
        });
        it('TC17 - Encontrar informações de login com campos obrigatórios vazios', async function() {
            let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/find_login_info/registered_user_empty_required_fields.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
            let menuForgotLoginInfo= await driver.findElement(By.linkText("Forgot login info?")).click();
            let firstName = await driver.findElement(By.id("firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("address.zipCode")).sendKeys(ZIP_CODE);
            let ssn = await driver.findElement(By.id("ssn")).sendKeys(SSN)
            let FindMyLoginInfoButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("Social Security Number is required.", await driver.findElement(By.id("ssn.errors")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/lookup.htm", await driver.getCurrentUrl());
            assert.equal("Please fill out the following information in order to validate your account.", await driver.findElement(By.css("#rightPanel > p")).getText() )
        });
})
},{ browsers: [Browser.CHROME]})