+ index.js
    + lưu 2 giá trị của browser và scrapeController
    + lưu giá trị browser vào 1 biến 
    + truyền browser vào scrapeController

+ browser 
        --> đầu vào browser 
    + điều kiện kèm thi truy vấn web
    + puppeteer.launch ( chủ yếu là điền vào thằng này những gtri cần lấy)
        + headless 
                --> nhận true || false 
                    true : bật ui web khi chạy code
                    false : chạy ngầm k hiện ui 
        + args 
                --> tra doc 
                    Đại khái là bỏ qua sự ngăn cản của web
        
+ scapeController 
        --> hàm điều hướng 
            Để chia nhỏ thôi ...
    + điều hướng cho các thg scraper hoạt động 
    + Nhận giá trị đầu vào là browser 
    + làm biến lưu URL luôn để tiện xử lý

+ scraper.js 
        --> hàm chính dùng để lấy crawl data 
            Bên trong có nhiều hàm để lấy các data khác nhau
            Export tẹo cũng là các hàm :v
    + dùng các hàm ntn thì tự đọc code -.-