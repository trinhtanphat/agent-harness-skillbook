---
name: incremental-web-monitor
description: "Phát hiện thay đổi route, asset hoặc nội dung có quyền mà không crawl toàn bộ quá thường xuyên. Chỉ kích hoạt khi người dùng yêu cầu theo dõi website có quyền theo delta."
license: MIT
---

# Theo dõi website có quyền theo delta

**Chuyên mục:** Data & Automation  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Phát hiện thay đổi route, asset hoặc nội dung có quyền mà không crawl toàn bộ quá thường xuyên.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác định scope và lịch hợp lệ; tôn trọng robots và rate limit.
2. Lưu ETag/Last-Modified hoặc content hash cùng timestamp và URL.
3. Chỉ tải trang thay đổi; tách redirect, 403 và 5xx khỏi diff nội dung.
4. Đánh giá mức độ thay đổi và tạo issue/report có bằng chứng.
5. Giữ lịch sử để phát hiện rollback hoặc chuyển phiên bản bất ngờ.

## Kết quả

Delta manifest, change log, deduplicated alert report.

## Bằng chứng nghiệm thu

- [ ] Không tạo tải quá mức cho nguồn.
- [ ] 403/429 không bị coi như nội dung bị xóa.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `incremental-web-monitor` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.rfc-editor.org/rfc/rfc9309
- https://agentskills.io/specification
