const puppeteer = require("puppeteer");

let BASE_URL = null;
let browser = null;
let page = null;

const blockedResourceTypes = [
  'image',
  'media',
  'font',
  'texttrack',
  'object',
  'beacon',
  'csp_report',
  'imageset',
];

const skippedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
];


const getBaseUrl = (url) => {
  return url.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/,'$1');
}

const itemScrapping = {
  initialize: async (inputUrl) => {
    console.log("Starting the scraper...");

    BASE_URL = await getBaseUrl(inputUrl);
    browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);

    await page.on('request', (request) => {
      const requestUrl = request._url.split('?')[0].split('#')[0];
      if (
        blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
        skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(BASE_URL, { waitUntil: "networkidle2" }); // wait for page to laod completely
  },
  getProductDetails: async link => {
    console.log("Scrapping the product page");

    await page.goto(link, { waitUntil: "networkidle2" });

    // start getting the detail of the products
    let details = await page.evaluate(() => {
      let title = document.querySelector("#productTitle, #pdp_product_title").innerText;
      let price = document.querySelector(
        "#priceblock_ourprice, #priceblock_dealprice, #a-size-medium, .css-b9fpep"
      ).innerText;
      let image = document.querySelector(".a-dynamic-image, .css-m5dkrx").src;

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
  initialize: async (inputUrl) => {
    console.log("Starting cron-job price scrapping...");

    BASE_URL = await getBaseUrl(inputUrl);
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
        "#priceblock_ourprice, #priceblock_dealprice, #a-size-medium, .css-b9fpep"
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
