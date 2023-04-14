const scrapers = require("./scraper");

const scrapeControlleer = async (browserInstance) => {
  const url = "https://books.toscrape.com/";
  const indexs = [1, 2, 3, 4, 5];
  try {
    let browser = await browserInstance;
    // gọi hàm cạo ở files scrape
    const categories = await scrapers.scrapeCategory(browser, url);
    const selectedCategories = categories.filter((category, index) =>
      indexs.some((i) => i === index)
    );
    await scrapers.scraper(browser, selectedCategories[0].link);
  } catch (error) {
    console.log("lỗi ơ scrapeController " + error);
  }
};

module.exports = scrapeControlleer;
