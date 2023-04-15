// hàm cào tổng
const scrapeCategory = (browser, url) =>
  new Promise(async (res, rej) => {
    try {
      let page = await browser.newPage();
      console.log(">> mở ra tab mới ...");
      await page.goto(url);
      console.log(">> Truy cập vào " + url);
      await page.waitForSelector("#default");
      console.log(">> Website đã load xog ...");

      const dataCategory = await page.$$eval(
        "#default > div > div > div > aside > div.side_categories > ul > li > ul > li",
        (els) => {
          dataCategory = els.map((el) => {
            return {
              category: el.querySelector("a").innerText,
              link: el.querySelector("a").href,
            };
          });
          return dataCategory;
        }
      );
      await page.close();
      console.log(">> Đã đóng");
      res(dataCategory);
    } catch (error) {
      console.log("lỗi ở scrape category" + error);
      rej(error);
    }
  });

// hàm scraper
const scraper = (browser, link) =>
  new Promise(async (res, rej) => {
    try {
      let newPage = await browser.newPage();
      console.log(">> Mở ra tab mới ...");
      await newPage.goto(link);
      console.log(">> Truy cập vào url " + link);
      await newPage.waitForSelector(".page_inner");
      console.log(">> Page đã load xog ...");

      const scrapeData = {};

      // ------- lấy header đầu link vào trang -------
      const headerData = await newPage.$eval(
        "#default > div > div > div > div > section > div:nth-child(2) > ol > li> article > div.image_container ",
        (el) => {
          return {
            link: el.querySelector("a").href,
          };
        }
      );

      // ------ lưu link vào trang vào scrapeData -------
      scrapeData.header = headerData;

      //----- lấy link details item -------
      const detailsLinks = await newPage.$$eval(
        "#default > div > div > div > div > section > div:nth-child(2) > ol > li> article > div.image_container ",
        (els) => {
          detailsLinks = els.map((el) => {
            return el.querySelector("a").href;
          });
          return detailsLinks;
        }
      );

      // console.log(detailsLinks);
      const scraperDetail = (link) =>
        new Promise(async (res, rej) => {
          try {
            let pageDetail = await browser.newPage();
            console.log(">> Mở ra link mới ...");
            await pageDetail.goto(link);
            console.log(">> truy cập " + link);
            await pageDetail.waitForSelector("#content_inner");
            console.log(">> Đã lấy được data ...");

            const detailData = {};
            // hàm cạo

            //------ cạo ảnh ------
            const images = await pageDetail.$eval(
              "#product_gallery > div > div > div ",
              (el) => {
                return {
                  imageUrl: el.querySelector("img").src,
                };
              }
            );

            detailData.images = images;

            // ------ lấy info ------
            const header = await pageDetail.$eval(
              "#content_inner > article > div.row > div.col-sm-6.product_main",
              (els) => {
                return {
                  bookTitle: els.querySelector("h1").innerText,
                  bookPrice: els.querySelector("p").innerText,
                };
              }
            );

            detailData.header = header;

            // ------ content --------

            const headerContent = await pageDetail.$eval(
              "#content_inner > article",
              (els) => {
                return {
                  description: els.querySelector("article > p").innerText,
                };
              }
            );

            detailData.content = headerContent;

            // ------------------------------

            await pageDetail.close();
            res(detailData);
          } catch (error) {
            console.log("lỗi ở scraperDetail " + error);
            rej(error);
          }
        });

      // --------- lọc và lưu cái data vừa cào ---------
      const details = [];
      for (let link of detailsLinks) {
        const detail = await scraperDetail(link);
        details.push(detail);
      }

      // -------- lưu details vào scrapeData-------
      scrapeData.body = details;

      // ------ hàm kết ---------
      await newPage.close();
      console.log(">> Trình duyệt đã đóng");
      res(scrapeData);
    } catch (error) {
      console.log("lỗi ở scraper " + error);
      rej(error);
    }
  });

module.exports = { scrapeCategory, scraper };
