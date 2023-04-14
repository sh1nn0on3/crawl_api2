const scrapers = require("./scraper");

const scrapeControlleer = async (browserInstance) => {
  const url = "https://phongtro123.com/";
  try {
    let browser = await browserInstance;
    let categories = scrapers.scrapeCategory(browser, url);
  } catch (error) {
    console.log("lỗi ơ scrapeController" + error);
  }
};

module.exports = scrapeControlleer;
