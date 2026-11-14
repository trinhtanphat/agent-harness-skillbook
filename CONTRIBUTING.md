# Contributing

Đóng góp skill và playbook phải ghi nguồn, input, steps, deliverables, tests thực tế, rủi ro và permission. Không đưa credential, PII, internal URL hoặc tài sản thiếu license vào repo công khai.

## QA local

~~~bash
node --check assets/app.js
node --check data/catalog.js
node scripts/validate.mjs
~~~

Không thêm GitHub Actions, tracking bên thứ ba hoặc dependency không cần thiết. Mọi liên kết site dùng đường dẫn tương đối.
