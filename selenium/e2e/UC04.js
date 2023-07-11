const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser, until, Key, chord} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
let chrome = require('selenium-webdriver/chrome');

suite(function(env) {
 describe("UC04", function() {
        this.timeout(30000)
        let driver;
    before(async function() {
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
      //driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    });
    after(async () => await driver.quit());
        it('TC18 - Atualizar dados com sucesso', async function() {
            let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/update_data/update_data_users.json'));
            const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, NEW_ADDRESS, NEW_CITY, NEW_STATE, NEW_ZIP_CODE, NEW_PHONE} = users;
            let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
            let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
            let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
            let menuUpdateContactInfo = await driver.findElement(By.linkText("Update Contact Info")).click();
            //Asserts 
            assert.equal("Update Profile", await driver.findElement(By.className("title")).getText());
            
            await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME)
            await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME)
            await driver.findElement(By.id("customer.address.street")).sendKeys(NEW_ADDRESS)
            await driver.findElement(By.id("customer.address.city")).sendKeys(NEW_CITY)
            await driver.findElement(By.id("customer.address.state")).sendKeys(NEW_STATE)
            await driver.findElement(By.id("customer.address.zipCode")).sendKeys(NEW_ZIP_CODE)
            await driver.findElement(By.id("customer.phoneNumber")).sendKeys(NEW_PHONE)
            await driver.findElement(By.xpath("//*[@id=\"rightPanel\"]/div/div/form/table/tbody/tr[8]/td[2]/input")).click()
            //Asserts 
            await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Profile Updated')]")));
            assert.equal("Profile Updated", await driver.findElement(By.className("title")).getText());
            assert.equal("Your updated address and phone number have been added to the system.", await driver.findElement(By.css(".ng-scope > p")).getText());
            assert.equal("https://parabank.parasoft.com/parabank/updateprofile.htm", await driver.getCurrentUrl());

        await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
        });
        it('TC19 - Atualizar dados com todos os campos vazios', async function() {
          let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/update_data/update_data_users.json'));
          const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, NEW_ADDRESS, NEW_CITY, NEW_STATE, NEW_ZIP_CODE, NEW_PHONE} = users;
          let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
          let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
          let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
          let menuUpdateContactInfo = await driver.findElement(By.linkText("Update Contact Info")).click();
          //Asserts 
          assert.equal("Update Profile", await driver.findElement(By.className("title")).getText());
          fn= await driver.findElement(By.id("customer.firstName"))
          fn.sendKeys(' ', Key.CONTROL, "A")
          ln = await driver.findElement(By.id("customer.lastName"))
          ln.sendKeys(' ', Key.CONTROL, "A")
          a = await driver.findElement(By.id("customer.address.street"))
          a.sendKeys(' ', Key.CONTROL, "A")
          c = await driver.findElement(By.id("customer.address.city"))
          c.sendKeys(' ', Key.CONTROL, "A")
          s = await driver.findElement(By.id("customer.address.state"))
          s.sendKeys(' ', Key.CONTROL, "A")
          z = await driver.findElement(By.id("customer.address.zipCode"))
          z.sendKeys(' ', Key.CONTROL, "A")
          p = await driver.findElement(By.id("customer.phoneNumber"))
          p.sendKeys(' ', Key.CONTROL, "A")
          await driver.wait(until.elementLocated(By.className("input ng-valid ng-empty ng-dirty ng-valid-parse ng-touched")));
          await driver.findElement(By.xpath("//*[@id=\"rightPanel\"]/div/div/form/table/tbody/tr[8]/td[2]/input")).click()
          //Asserts 
          await driver.wait(until.elementLocated(By.css("tr:nth-child(1) .error")));
          assert.equal("First name is required.", await driver.findElement(By.css("tr:nth-child(1) .error")).getText());
          assert.equal("Last name is required.", await driver.findElement(By.css("tr:nth-child(2) .error")).getText());
          assert.equal("Address is required.", await driver.findElement(By.css("tr:nth-child(3) .error")).getText());
          assert.equal("City is required.", await driver.findElement(By.css("tr:nth-child(4) .error")).getText());
          assert.equal("State is required.", await driver.findElement(By.xpath('//*[@id="rightPanel"]/div/div/form/table/tbody/tr[5]/td[3]/span')).getText());
          assert.equal("Zip Code is required.", await driver.findElement(By.xpath('//*[@id="rightPanel"]/div/div/form/table/tbody/tr[6]/td[3]/span')).getText());
          assert.equal("https://parabank.parasoft.com/parabank/updateprofile.htm", await driver.getCurrentUrl());

          await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
      });
      it('TC20 - Atualizar dados com campos obrigatórios vazios', async function() {
        let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/update_data/update_data_users.json'));
        const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, NEW_ADDRESS, NEW_CITY, NEW_STATE, NEW_ZIP_CODE, NEW_PHONE} = users;
        let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
        let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
        let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
        let menuUpdateContactInfo = await driver.findElement(By.linkText("Update Contact Info")).click();
        //Asserts 
        assert.equal("Update Profile", await driver.findElement(By.className("title")).getText());

        await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME)
        await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME)
        await driver.findElement(By.id("customer.address.street")).sendKeys(NEW_ADDRESS)
        await driver.findElement(By.id("customer.address.city")).sendKeys(NEW_CITY)
        await driver.findElement(By.id("customer.address.state")).sendKeys(NEW_STATE)
        zc = await driver.findElement(By.id("customer.address.zipCode"))
        zc.sendKeys(' ', Key.CONTROL, "A")
        await driver.findElement(By.id("customer.phoneNumber")).sendKeys(NEW_PHONE)
        await driver.findElement(By.xpath("//*[@id=\"rightPanel\"]/div/div/form/table/tbody/tr[8]/td[2]/input")).click()
        //Asserts 
        assert.equal("Zip Code is required.", await driver.findElement(By.xpath('//*[@id="rightPanel"]/div/div/form/table/tbody/tr[6]/td[3]/span')).getText());
        assert.equal("https://parabank.parasoft.com/parabank/updateprofile.htm", await driver.getCurrentUrl());

        await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
    });
    it('TC21 - Atualizar dados com o campo telefone (não obrigatório) vazio', async function() {
      let users = JSON.parse(fs.readFileSync(process.cwd() + '/selenium/data/update_data/update_data_users.json'));
      const { FIRST_NAME, LAST_NAME, ADDRESS, CITY, STATE, ZIP_CODE, PHONE, SSN, USERNAME, PASSWORD, NEW_ADDRESS, NEW_CITY, NEW_STATE, NEW_ZIP_CODE, NEW_PHONE} = users;
      let username = await driver.findElement(By.name("username")).sendKeys(USERNAME);
      let password = await driver.findElement(By.name("password")).sendKeys(PASSWORD);
      let loginButton = await driver.findElement(By.css(".button:nth-child(1)")).click()
      let menuUpdateContactInfo = await driver.findElement(By.linkText("Update Contact Info")).click();
      //Asserts 
      assert.equal("Update Profile", await driver.findElement(By.className("title")).getText());

      await driver.findElement(By.id("customer.firstName")).sendKeys(FIRST_NAME)
      await driver.findElement(By.id("customer.lastName")).sendKeys(LAST_NAME)
      await driver.findElement(By.id("customer.address.street")).sendKeys(NEW_ADDRESS)
      await driver.findElement(By.id("customer.address.city")).sendKeys(NEW_CITY)
      await driver.findElement(By.id("customer.address.state")).sendKeys(NEW_STATE)
      await driver.findElement(By.id("customer.address.zipCode")).sendKeys(NEW_ZIP_CODE)
      pn = await driver.findElement(By.id("customer.phoneNumber"))
      pn.sendKeys(' ', Key.CONTROL, "A")
      await driver.findElement(By.xpath("//*[@id=\"rightPanel\"]/div/div/form/table/tbody/tr[8]/td[2]/input")).click()
      //Asserts 
      await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Profile Updated')]"))); 
      assert.equal("Profile Updated", await driver.findElement(By.className("title")).getText());
      assert.equal("Your updated address and phone number have been added to the system.", await driver.findElement(By.css(".ng-scope > p")).getText());
      assert.equal("https://parabank.parasoft.com/parabank/updateprofile.htm", await driver.getCurrentUrl());

      await driver.findElement(By.xpath("//a[contains(@href, 'parabank/logout.htm')]")).click();
  });
})
},{ browsers: [Browser.CHROME]})