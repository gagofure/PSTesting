"use strict";
const webdriver = require("selenium-webdriver");
const assert = require('assert');

require('chromedriver');


var driver = new webdriver.Builder().forBrowser('chrome').build();

driver.manage().window().maximize();

async function basicTest() {

    try {
        await driver.manage().setTimeouts({ implicit: 10000 });

        // launches www.parallelscore.com to a browser (in my case chrome browser).
        await driver.get('https://www.parallelscore.com');

        //Navigate to the career page
        await driver.navigate().to('https://www.parallelscore.com/Careers');

        //Selects the search criteria: Category as Full-Time
        var category = await driver.findElement(webdriver.By.css('#category>option[value=full-time]'));
        category.click();

        // Selects the search criteria:  Location as Lagos
        let location = await driver.findElement(webdriver.By.css('#location>option[value=lagos]'));
        location.click();

        //close "Subscribe to our newsletter" model
        let closeModel = await driver.findElement(webdriver.By.css('div.mc-closeModal'))
        closeModel.click();

        //Search 
        var search = await driver.findElement(webdriver.By.css('input[type=submit]'))
        var searchResults = search.click();

        try {
            if (searchResults.isDisplayed()) {
                console.log("Validation Pass");
            } else { console.log("Validation Failed"); }
        } catch (error) {
            console.log("There was an error: " + error);
        }

    }

    catch (err) {
        handleFailure(err, driver)
    }

}

basicTest();


function handleFailure(err, driver) {
    console.error('Something went wrong!\n', err.stack, '\n');
    driver.quit();
}