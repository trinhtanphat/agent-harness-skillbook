# Public Git tree security preflight

**Mục đích:** mọi tệp được Git theo dõi trong repo công khai đều có thể được GitHub Pages phục vụ. `DEPLOY_INTEGRITY_PASS` chỉ nói rằng file đã lên đúng byte; nó không chứng minh file an toàn để công khai.

Chạy trước các kiểm thử khác:

```bash
node scripts/audit-public-tree.mjs
node scripts/test-public-tree.mjs
```

Chỉ đọc **Git HEAD** bằng `git ls-tree -r -l -z HEAD` và `git cat-file blob <SHA>`; không đọc file tạm chưa commit, không dùng mạng, không sửa mã, không dùng npm package hay GitHub Actions.

### Quy tắc chặn

- Đường dẫn bí mật (phân biệt hoa/thường theo chính sách thống nhất): `.env`, `.env.*`, `.ssh`, `.aws`, `.gnupg`, `.kube`, `.azure`, `.npmrc`, `.pypirc`, `.netrc`, `.git-credentials`, các tên khóa SSH, `credentials.json`, `secrets.json`, `service-account.json` và các định dạng khóa/keystore/dữ liệu nhạy cảm.
- Nội dung có các dấu hiệu **độ tin cậy cao**: private-key PEM/PGP, token GitHub/OpenAI/Slack, AWS access key. **Không bao giờ in nguyên văn token hoặc khóa** trong log; chỉ báo mã rủi ro và đường dẫn.
- Không thể kiểm tra an toàn tệp Git có kích thước trên 20 MiB, không xác định kích thước hoặc Git submodule. Những trường hợp này **fail closed** để review trước khi phát hành.

### Kiểm thử hồi quy

`scripts/test-public-tree.mjs` tạo **repository Git tạm riêng**, commit dữ liệu giả lập để chứng minh scanner từ chối tên tệp và token kiểu mẫu; tệp giả chỉ sống trong thư mục tạm và được dọn trong `finally`. Test cũng xác nhận scanner PASS trên Git HEAD hiện tại. Không có khóa thật trong các fixture.

Release Gate chạy bước `public-tree-secrets` đầu tiên ở cả `node`, `local` và `release`, trước browser QA hay tải GitHub Pages. Kết quả âm tính là một lý do từ chối phát hành; không xóa hoặc sửa nguồn tự động.

**Giới hạn:** regex có thể bỏ sót dạng secret mới và không thể thay cho kiểm toán lịch sử Git, hệ thống secret scanning chuyên dụng hoặc kiểm định thủ công. Quá trình kiểm tra nội dung Git HEAD không xác nhận rằng toàn bộ lịch sử commit chưa từng chứa bí mật. Nếu nghi ngờ đã lộ khóa, phải thu hồi/đổi khóa và rà soát lịch sử phù hợp.
