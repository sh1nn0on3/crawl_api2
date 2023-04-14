const scrapeCategory = async (browser, url) => {
  try {
    let page = await browser.newPage();
    console.log(">> mở ra tab mới ...");
    await page.goto(url);
    console.log(">> Truy cập vào " + url);
    await page.waitForSelector("#webpage");
    console.log(">> Website đã load xog ...");

    const dataCategory = await page.$$eval("#navbar-menu > ul > li", (els) => {
      dataCategory = els.map((el) => {
        return {
          category: el.querySelector("a").innerText,
          link: el.querySelector("a").href,
        };
      });
      return dataCategory;
    });
    console.log(dataCategory);

    await page.close();
  } catch (error) {
    console.log("lỗi ở scrape category" + error);
  }
};

module.exports = { scrapeCategory };
