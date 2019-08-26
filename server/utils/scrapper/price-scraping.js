const puppeteer = require('puppeteer');


const BASE_URL = 'https://www.amazon.com/';

let browser = null;
let page = null;

const scraper = {
  initialize: async () => {
    console.log("Starting the scraper...");

    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.on('console', message => {
      console.log(`This is the message from the browser: ${message.text()}`)
    })

    await page.goto(BASE_URL, ({ waitUntil: 'networkidle2'})); // wait for page to laod completely
  },
  getProductDetails: async (link) => {
    console.log('Scrapping the product page');

    await page.goto(link, ({ waitUntil: 'networkidle2'}));

    // start getting the detail of the products
    let details = await page.evaluate(() => {

      let title = document.querySelector('#productTitle').innerText;
      let price = document.querySelector('#priceblock_ourprice, #priceblock_dealprice').innerText;
      let image = document.querySelector(".a-dynamic-image").src

      return { title, price, image };
    });

    return details;
  },
  end: async () => {
    console.log("Stopping the scraper...");

    await browser.close();
  }
}

module.exports = scraper