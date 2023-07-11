const fs = require('fs');
const process = require('process');
require("chromedriver");
const {By, Builder, Browser} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

describe('presetup', function() {
    this.timeout(30000)
    let driver;
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
        //driver = await new Builder().forBrowser('chrome').build();
        await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    })
    after(async () => await driver.quit());
  
    it('presetup', async function() {
      await driver.findElement(By.linkText("Admin Page")).click()
      await driver.findElement(By.id("accessMode3")).click()
      await driver.findElement(By.css("td:nth-child(2) > .button")).click()
      await driver.findElement(By.id("accessMode4")).click()
      await driver.findElement(By.css("td:nth-child(2) > .button")).click()
      await driver.findElement(By.id("accessMode2")).click()
      await driver.findElement(By.css("td:nth-child(2) > .button")).click()
      await driver.findElement(By.id("accessMode1")).click()
      await driver.findElement(By.css("td:nth-child(2) > .button")).click()
      await driver.close()
    })
  })