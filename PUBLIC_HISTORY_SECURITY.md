# Lịch sử Git công khai — kiểm toán credential đã xóa khỏi HEAD

GitHub là nguồn mã chính. Một tệp đã xóa khỏi phiên bản mới vẫn có thể còn trong các commit tổ tiên công khai. Bộ quét HEAD-only không phát hiện được điều này.

## Chạy

```bash
node scripts/audit-public-history.mjs
node scripts/test-public-history.mjs
```

Scanner kiểm tra mọi Git blob **có thể truy cập từ HEAD** và tên tệp từng xuất hiện trong lịch sử của nhánh, dùng `git rev-list`, `git log -z` và `git cat-file --batch`. Giới hạn dung lượng đầu vào để fail-closed thay vì quá tải. Không tải mạng, không thay đổi history, không tạo bản sao Git repo, không in nội dung nghi ngờ là credential.

### Negative tests

Tạo repository tạm với **token giả** rồi xóa ở commit sau. Scanner HEAD phải PASS nhưng scanner lịch sử phải chặn vì blob cũ còn tồn tại. Thử thêm `.env.production` giả rồi xóa, bảo đảm đường dẫn lịch sử vẫn bị chặn. Không dùng key thật; test dọn sạch repository tạm.

Release Gate chạy liên tiếp `public-tree-secrets`, `public-history-secrets` và `public-history-contract` trước các bước còn lại. Tổng cộng **12 cổng** cho `--mode release`, **9 cổng** cho Node và **10 cổng** cho local (tăng thêm 2 cổng từ phiên bản trước).

**Phạm vi:** chỉ các commit là tổ tiên của `HEAD` được kiểm tra; không bảo đảm đã quét mọi nhánh remote, reflog, Git object không thể truy cập hoặc dữ liệu trên nền tảng bên ngoài. Các quy tắc có thể bỏ sót secret không khớp chữ ký. Nếu phát hiện một secret thật trong lịch sử, cần vô hiệu/đổi secret ngay và đánh giá cách xử lý lịch sử với quy trình riêng; không tự force push hoặc viết lại commit.

### Kết quả

Chỉ cập nhật phần dưới sau khi chạy QA trên commit ứng viên rồi nghiệm thu lại bản công khai ở SHA cuối.