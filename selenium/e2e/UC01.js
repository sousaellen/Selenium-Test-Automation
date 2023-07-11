const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');

suite(function(env) {
 describe("UC01", function() {
        this.timeout(30000)
        let driver;
    before(async function() {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      //driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    after(async () => await driver.quit());
        it('TC01 - Cadastro de usuário com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/register_users/user_register_Mary.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = users;
            let menuRegister = await driver.findElement(By.linkText("Register")).click();
            let firstName =    await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("customer.address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("customer.address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("customer.address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("customer.address.zipCode")).sendKeys(ZIP_CODE);
            let phoneNumber = await driver.findElement(By.id("customer.phoneNumber")).sendKeys(PHONE);
            let ssn = await driver.findElement(By.id("customer.ssn")).sendKeys(SSN)
            let username = await driver.findElement(By.id("customer.username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.id("customer.password")).sendKeys(PASSWORD);
            let repeatedPassword = await driver.findElement(By.id("repeatedPassword")).sendKeys(REPETEATED_PASSWORD);
            let regiterButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("Welcome "+USERNAME, await driver.findElement((By.className("title"))).getText())
            assert.equal("Your account was created successfully. You are now logged in.", await driver.findElement((By.css("#rightPanel > p"))).getText())
            
            await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC02 - Cadastro de usuário com todos os campos vazios', async function() {
            let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/register_users/user_register_all_fields_empty.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
            let menuRegister = await driver.findElement(By.linkText("Register")).click();
            let firstName =    await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("customer.address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("customer.address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("customer.address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("customer.address.zipCode")).sendKeys(ZIP_CODE);
            let phoneNumber = await driver.findElement(By.id("customer.phoneNumber")).sendKeys(PHONE);
            let ssn = await driver.findElement(By.id("customer.ssn")).sendKeys(SSN)
            let username = await driver.findElement(By.id("customer.username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.id("customer.password")).sendKeys(PASSWORD);
            let repeatedPassword = await driver.findElement(By.id("repeatedPassword")).sendKeys(REPETEATED_PASSWORD);
            let regiterButton = await driver.findElement(By.css("td > .button")).click();
            //Asserts 
            assert.equal("First name is required.", await driver.findElement((By.id("customer.firstName.errors"))).getText());
            assert.equal("Last name is required.", await driver.findElement((By.id("customer.lastName.errors"))).getText());
            assert.equal("Address is required.", await driver.findElement((By.id("customer.address.street.errors"))).getText());
            assert.equal("City is required.", await driver.findElement((By.id("customer.address.city.errors"))).getText());
            assert.equal("State is required.", await driver.findElement((By.id("customer.address.state.errors"))).getText());
            assert.equal("Zip Code is required.", await driver.findElement((By.id("customer.address.zipCode.errors"))).getText());
            assert.equal("Social Security Number is required.", await driver.findElement((By.id("customer.ssn.errors"))).getText());
            assert.equal("Username is required.", await driver.findElement((By.id("customer.username.errors"))).getText());
            assert.equal("Password is required.", await driver.findElement((By.id("customer.password.errors"))).getText());
            assert.equal("Password confirmation is required.", await driver.findElement((By.id("repeatedPassword.errors"))).getText());
        });
        it('TC03 - Cadastro de usuário com um username já cadastrado', async function() {
          let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/register_users/user_register_John.json'));
          const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = users;
          var count = 1;
          while (count <= 2) {
            let menuRegister = await driver.findElement(By.linkText("Register")).click();
            let firstName =    await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME);
            let lastName = await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME);
            let addressStreet = await driver.findElement(By.id("customer.address.street")).sendKeys(ADDRESS);
            let addressCity = await driver.findElement(By.id("customer.address.city")).sendKeys(CITY);
            let addressState = await driver.findElement(By.id("customer.address.state")).sendKeys(STATE);
            let addressZipCode= await driver.findElement(By.id("customer.address.zipCode")).sendKeys(ZIP_CODE);
            let phoneNumber = await driver.findElement(By.id("customer.phoneNumber")).sendKeys(PHONE);
            let ssn = await driver.findElement(By.id("customer.ssn")).sendKeys(SSN)
            let username = await driver.findElement(By.id("customer.username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.id("customer.password")).sendKeys(PASSWORD);
            let repeatedPassword = await driver.findElement(By.id("repeatedPassword")).sendKeys(REPETEATED_PASSWORD);
            let regiterButton = await driver.findElement(By.css("td > .button")).click();
            if (count == 1) {
              assert.equal("Welcome "+USERNAME, await driver.findElement((By.className("title"))).getText())
              await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();  
            } else {
              //Asserts 
              assert.equal("This username already exists.", await driver.findElement((By.id("customer.username.errors"))).getText());   
            }
            count = count + 1;
          }
      });
      it('TC04 - Cadastro de usuário com campos não obrigatórios vazios', async function() {
        let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/register_users/user_registration_empty_non-required_fields.json'));
        const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
        let menuRegister = await driver.findElement(By.linkText("Register")).click();
        let firstName =    await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME);
        let lastName = await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME);
        let addressStreet = await driver.findElement(By.id("customer.address.street")).sendKeys(ADDRESS);
        let addressCity = await driver.findElement(By.id("customer.address.city")).sendKeys(CITY);
        let addressState = await driver.findElement(By.id("customer.address.state")).sendKeys(STATE);
        let addressZipCode= await driver.findElement(By.id("customer.address.zipCode")).sendKeys(ZIP_CODE);
        let phoneNumber = await driver.findElement(By.id("customer.phoneNumber")).sendKeys(PHONE);
        let ssn = await driver.findElement(By.id("customer.ssn")).sendKeys(SSN)
        let username = await driver.findElement(By.id("customer.username")).sendKeys(USERNAME);
        let password = await driver.findElement(By.id("customer.password")).sendKeys(PASSWORD);
        let repeatedPassword = await driver.findElement(By.id("repeatedPassword")).sendKeys(REPETEATED_PASSWORD);
        let regiterButton = await driver.findElement(By.css("td > .button")).click();
        //Asserts 
        assert.equal("Welcome "+USERNAME, await driver.findElement((By.className("title"))).getText())
        assert.equal("Your account was created successfully. You are now logged in.", await driver.findElement((By.css("#rightPanel > p"))).getText())

        await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
      });
      it('TC05 - Cadastro de usuário com senhas diferentes', async function() {
        let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/register_users/user_register_different_passwords.json'));
        const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
        let menuRegister = await driver.findElement(By.linkText("Register")).click();
        let firstName =    await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME);
        let lastName = await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME);
        let addressStreet = await driver.findElement(By.id("customer.address.street")).sendKeys(ADDRESS);
        let addressCity = await driver.findElement(By.id("customer.address.city")).sendKeys(CITY);
        let addressState = await driver.findElement(By.id("customer.address.state")).sendKeys(STATE);
        let addressZipCode= await driver.findElement(By.id("customer.address.zipCode")).sendKeys(ZIP_CODE);
        let phoneNumber = await driver.findElement(By.id("customer.phoneNumber")).sendKeys(PHONE);
        let ssn = await driver.findElement(By.id("customer.ssn")).sendKeys(SSN)
        let username = await driver.findElement(By.id("customer.username")).sendKeys(USERNAME);
        let password = await driver.findElement(By.id("customer.password")).sendKeys(PASSWORD);
        let repeatedPassword = await driver.findElement(By.id("repeatedPassword")).sendKeys(REPETEATED_PASSWORD);
        let regiterButton = await driver.findElement(By.css("td > .button")).click();
        //Asserts 
        assert.equal("Passwords did not match.", await driver.findElement((By.id("repeatedPassword.errors"))).getText());
      });
      it('TC06 - Cadastro de usuário com campos obrigatórios vazios', async function() {
        let user = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/register_users/user_register_empty_required_fields.json'));
        const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, REPETEATED_PASSWORD } = user;
        let menuRegister = await driver.findElement(By.linkText("Register")).click();
        let firstName =    await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME);
        let lastName = await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME);
        let addressStreet = await driver.findElement(By.id("customer.address.street")).sendKeys(ADDRESS);
        let addressCity = await driver.findElement(By.id("customer.address.city")).sendKeys(CITY);
        let addressState = await driver.findElement(By.id("customer.address.state")).sendKeys(STATE);
        let addressZipCode= await driver.findElement(By.id("customer.address.zipCode")).sendKeys(ZIP_CODE);
        let phoneNumber = await driver.findElement(By.id("customer.phoneNumber")).sendKeys(PHONE);
        let ssn = await driver.findElement(By.id("customer.ssn")).sendKeys(SSN)
        let username = await driver.findElement(By.id("customer.username")).sendKeys(USERNAME);
        let password = await driver.findElement(By.id("customer.password")).sendKeys(PASSWORD);
        let repeatedPassword = await driver.findElement(By.id("repeatedPassword")).sendKeys(REPETEATED_PASSWORD);
        let regiterButton = await driver.findElement(By.css("td > .button")).click();
        //Asserts 
        assert.equal("Social Security Number is required.", await driver.findElement((By.id("customer.ssn.errors"))).getText());
    });
})
},{ browsers: [Browser.CHROME]})