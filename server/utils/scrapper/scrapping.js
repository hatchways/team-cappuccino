const puppeteer = require("puppeteer");

const BASE_URL = "https://www.amazon.com/";

let browser = null;
let page = null;

const itemScrapping = {
  initialize: async () => {
    console.log("Starting the scraper...");

    browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);

    await page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort();
      }
      else {
          req.continue();
      }
    });

    await page.goto(BASE_URL, { waitUntil: "networkidle2" }); // wait for page to laod completely
  },
  getProductDetails: async link => {
    console.log("Scrapping the product page");

    await page.goto(link, { waitUntil: "networkidle2" });

    // start getting the detail of the products
    let details = await page.evaluate(() => {
      let title = document.querySelector("#productTitle").innerText;
      let price = document.querySelector(
        "#priceblock_ourprice, #priceblock_dealprice, #a-size-medium"
      ).innerText;
      let image = document.querySelector(".a-dynamic-image").src;

      return { title, price, image };
    });

    return details;
  },
  end: async () => {
    console.log("Stopping the scraper...");

    await browser.close();
  }
};

// scrapping only price for cronjob
const priceScrapping = {
  initialize: async () => {
    console.log("Starting cron-job price scrapping...");

    browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
    await page.on("console", message => {
      console.log(`This is the message from the browser: ${message.text()}`);
    });

    await page.goto(BASE_URL, { waitUntil: "networkidle2" }); // wait for page to laod completely
  },
  getProductPrice: async link => {
    console.log("Scrapping the price for product page");

    await page.goto(link, { waitUntil: "networkidle2" });

    // start getting the detail of the products
    let details = await page.evaluate(() => {
      let price = document.querySelector(
        "#priceblock_ourprice, #priceblock_dealprice, #a-size-medium"
      ).innerText;

      return { price };
    });

    return details;
  },
  end: async () => {
    console.log("Stopping Starting cron-job price scrapping...");

    setTimeout(() => {
      browser.close();
    }, 3000);
  }
};

module.exports = { itemScrapping, priceScrapping };
