---
name: safe-deploy
description: "Triển khai có kiểm tra readiness, backup và rollback rõ ràng. Chỉ dùng khi yêu cầu liên quan đến deploy an toàn với blue/green và release gate."
---

# Deploy an toàn với blue/green và release gate

**Chuyên mục:** QA, Security & Delivery  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://docs.github.com/en/pages

## Khi nào sử dụng

Triển khai có kiểm tra readiness, backup và rollback rõ ràng.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Kiểm tra dung lượng, secrets, backups và schema migration.
2. Build reproducible và ký/ghi hash manifest.
3. Deploy lên môi trường song song.
4. Health/readiness/smoke/E2E trước chuyển traffic.
5. Giám sát post-deploy và duy trì bản rollback.

## Kết quả phải bàn giao

Release manifest, smoke report, rollback proof.

## Bằng chứng nghiệm thu

- [ ] Không dọn release đang sử dụng.
- [ ] Không đụng production trước gate.
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
