const scrapers = require("./scraper");
const fs = require("fs");

const scrapeControlleer = async (browserInstance) => {
  const url = "https://books.toscrape.com/";
  const indexs = [1, 2, 3, 4, 5];
  try {
    let browser = await browserInstance;
    // ------- gọi hàm cạo ở files scrape -----------
    const categories = await scrapers.scrapeCategory(browser, url);
    const selectedCategories = categories.filter((category, index) =>
      indexs.some((i) => i === index)
    );
    let result = await scrapers.scraper(browser, selectedCategories[2].link);
    // ------- đọc ra file dùng fs ------------
    fs.writeFile("data.json" , JSON.stringify(result) , (err) => {
      if(err) console.log("lỗi err" + err);
      console.log("thêm data thành công");
    } )
  } catch (error) {
    console.log("lỗi ơ scrapeController " + error);
  }
};

module.exports = scrapeControlleer;
