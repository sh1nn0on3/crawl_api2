https://www.youtube.com/watch?v=rR5vN7SLZww&t=2369s
npm puppeteer 
        --> lưu ý : phải dùng BĐB async/await
    + let browser = puppeteer.launch()
    + let page = browser.newPage()
    + hàm page 
        + screenshot
        + đọc ghi file 
        + click 
        + $eval , $$eval 
            + ex: $$eval(a , b)
                + a : "..."
                        --> điền selector cần lấy
                + b : cái này là callback 
                        --> khi trả data nó ra mảng nên tiếp sẽ dùng map để tìm :v  
        + ...
    + hàm đóng page.close()

+ làm xog dùng đọc file 
    + fs json