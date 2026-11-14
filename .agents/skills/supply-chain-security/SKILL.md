---
name: supply-chain-security
description: "Kiểm tra phụ thuộc, nguồn tài sản, secret và artifact provenance. Chỉ dùng khi yêu cầu liên quan đến bảo vệ supply chain và khóa bí mật."
---

# Bảo vệ supply chain và khóa bí mật

**Chuyên mục:** QA, Security & Delivery  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://owasp.org/www-project-top-10-for-large-language-model-applications/

## Khi nào sử dụng

Kiểm tra phụ thuộc, nguồn tài sản, secret và artifact provenance.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Liệt kê dependency và license.
2. Khóa version theo lockfile.
3. Quét secret và giữ secret manager.
4. Phân quyền repo/token tối thiểu.
5. Lưu SBOM/manifest và kiểm tra artifact trước deploy.

## Kết quả phải bàn giao

Dependency inventory, SBOM, secret audit.

## Bằng chứng nghiệm thu

- [ ] Không commit env/token/PII.
- [ ] Không chạy script không rõ nguồn.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://owasp.org/www-project-top-10-for-large-language-model-applications/
- https://learn.chatgpt.com/docs/build-skills
