---
name: api-contract-rebuild
description: "Đặc tả lại chức năng API từ đầu vào/đầu ra được phép và tạo mock. Chỉ dùng khi yêu cầu liên quan đến tái hiện api contract trên backend thử nghiệm."
---

# Tái hiện API contract trên backend thử nghiệm

**Chuyên mục:** Crawl & App Reconstruction  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://playwright.dev/docs/intro

## Khi nào sử dụng

Đặc tả lại chức năng API từ đầu vào/đầu ra được phép và tạo mock.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Liệt kê endpoint, method, auth và schema.
2. Phân loại lỗi 4xx/5xx, retries và idempotency.
3. Tạo mock fixtures không chứa PII.
4. Viết contract tests cho edge cases.
5. So sánh khác biệt có tài liệu hóa.

## Kết quả phải bàn giao

OpenAPI draft, mocks, contract tests.

## Bằng chứng nghiệm thu

- [ ] Không truy cập sản xuất trái phép.
- [ ] Không log credential thật.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://playwright.dev/docs/intro
- https://learn.chatgpt.com/docs/build-skills
