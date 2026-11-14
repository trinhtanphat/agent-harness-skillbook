---
name: root-cause-analysis
description: "Tìm cơ chế lỗi thay vì đổ trách nhiệm cho cá nhân. Chỉ dùng khi yêu cầu liên quan đến điều tra nguyên nhân gốc với 5 whys."
---

# Điều tra nguyên nhân gốc với 5 Whys

**Chuyên mục:** Problem Solving  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://opentelemetry.io/docs/

## Khi nào sử dụng

Tìm cơ chế lỗi thay vì đổ trách nhiệm cho cá nhân.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Thu thập timeline và sự kiện quan sát được.
2. Vẽ quan hệ nhân quả với 5 Whys/fishbone.
3. Tách trigger, contributing factors và root cause.
4. Thiết kế corrective & preventive actions.
5. Giao owner và ngày kiểm chứng hiệu quả.

## Kết quả phải bàn giao

RCA, CAPA, action owners.

## Bằng chứng nghiệm thu

- [ ] Không gọi suy đoán là nguyên nhân đã được xác minh.
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
