# Contributing

Đóng góp skill và playbook phải ghi nguồn, input, steps, deliverables, tests thực tế, rủi ro và permission. Không đưa credential, PII, internal URL hoặc tài sản thiếu license vào repo công khai.

## QA local

~~~bash
node --check assets/app.js
node --check data/catalog.js
node scripts/validate.mjs
~~~

Không thêm GitHub Actions, tracking bên thứ ba hoặc dependency không cần thiết. Mọi liên kết site dùng đường dẫn tương đối.

## Bảo vệ repository công khai

Trước khi đưa bất kỳ file nào lên GitHub, chạy `node scripts/audit-public-tree.mjs` trên commit chuẩn bị phát hành. `node scripts/test-public-tree.mjs` kiểm thử khả năng từ chối file nhạy cảm bằng mẫu giả. Không chỉ dựa vào `.gitignore`: file đã `git add -f` vẫn có thể bị xuất bản. Nếu scan FAIL, xử lý trên nhánh QA trước khi merge; không đăng token/secret vào issue hoặc log.
