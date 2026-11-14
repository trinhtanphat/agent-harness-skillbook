---
name: incident-response
description: "Giữ dịch vụ và dữ liệu an toàn trước khi cố sửa hoàn toàn. Chỉ dùng khi yêu cầu liên quan đến ứng phó sự cố production có rollback."
---

# Ứng phó sự cố production có rollback

**Chuyên mục:** Problem Solving  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://opentelemetry.io/docs/

## Khi nào sử dụng

Giữ dịch vụ và dữ liệu an toàn trước khi cố sửa hoàn toàn.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Triage mức độ và điều kiện dừng.
2. Đóng băng ghi nguy hiểm và giữ backup.
3. Phân công incident commander, scribe và fix owner.
4. Đổi traffic bằng blue/green nếu có kiểm chứng.
5. Hồi phục SLI, postmortem không đổ lỗi.

## Kết quả phải bàn giao

Incident log, rollback record, postmortem.

## Bằng chứng nghiệm thu

- [ ] Không xóa dữ liệu hoặc restart mù.
- [ ] Giữ đường rollback còn hoạt động.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://opentelemetry.io/docs/
- https://learn.chatgpt.com/docs/build-skills
