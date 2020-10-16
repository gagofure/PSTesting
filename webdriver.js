"use strict";
const webdriver = require("selenium-webdriver");
require('chromedriver');


var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.manage().window().maximize();

var baseUrl = 'https://www.parallelscore.com'
var navigateToUrl = 'https://www.parallelscore.com/Careers'
var locationCssSector = '#location>option[value=lagos]'
var categoryCssSector = '#category>option[value=full-time]'
var modalCssSelector = 'div.mc-closeModal'
var serchCssSelector = 'input[type=submit]'

async function basicTest() {

    try {
        await driver.manage().setTimeouts({ implicit: 10000 });

        // launches website to a browser (in my case chrome browser).
        await driver.get(baseUrl);

        //Navigate to the career page
        await driver.navigate().to(navigateToUrl);

        //Selects the search criteria: Category as Full-Time
        var category = await driver.findElement(webdriver.By.css(categoryCssSector));
        category.click();

        // Selects the search criteria:  Location as Lagos
        var location = await driver.findElement(webdriver.By.css(locationCssSector));
        location.click();

        //close "Subscribe to our newsletter" model
        var closeModel = await driver.findElement(webdriver.By.css(modalCssSelector))
        closeModel.click();

        //Search 
        var search = await driver.findElement(webdriver.By.css(serchCssSelector))
        search.click();

        //Validate search result
        //check if lagos and fulltime were actually selected as the search criteria
        var isLagos = await driver.findElement(webdriver.By.css(locationCssSector));
        var isFulltime = await driver.findElement(webdriver.By.css(categoryCssSector));

        if (isFulltime.isSelected() && isLagos.isSelected) {
            console.log("The search result satisfies the search criteria: " + true);
        } else { console.log("The search result did NOT satisfy the search criteria: " + false); }
    }
    catch (err) {
        handleFailure(err, driver)
    }
}

basicTest();

function handleFailure(err, driver) {
    console.error('Something went wrong!\n', err.stack, StaleElementReferenceError, '\n');
    driver.quit();
}