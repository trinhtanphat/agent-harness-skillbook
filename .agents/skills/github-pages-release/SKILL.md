---
name: github-pages-release
description: "Tạo website deploy không cần framework, với đường dẫn tương đối và kiểm chứng URL. Chỉ dùng khi yêu cầu liên quan đến xuất bản website tĩnh trên github pages."
---

# Xuất bản website tĩnh trên GitHub Pages

**Chuyên mục:** QA, Security & Delivery  
**Mức độ:** Cơ bản  
**Nguồn:** Tham khảo và biên soạn — https://docs.github.com/en/pages

## Khi nào sử dụng

Tạo website deploy không cần framework, với đường dẫn tương đối và kiểm chứng URL.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Tạo repo, index.html và .nojekyll.
2. Bật Pages từ branch trong Settings hoặc API.
3. Chỉ dùng đường dẫn tương đối cho project site.
4. Xác nhận source branch và build status.
5. Kiểm tra URL public, assets và console.

## Kết quả phải bàn giao

Public repo, Pages URL, smoke results.

## Bằng chứng nghiệm thu

- [ ] Repository tồn tại không có nghĩa Pages đã bật.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://docs.github.com/en/pages
- https://learn.chatgpt.com/docs/build-skills
