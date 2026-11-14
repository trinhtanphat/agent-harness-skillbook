---
name: reproducible-dashboard
description: "Biến nguồn dữ liệu thành dashboard có metric definitions và traceable calculations. Chỉ kích hoạt khi người dùng yêu cầu tạo dashboard từ dữ liệu có kiểm toán."
license: MIT
---

# Tạo dashboard từ dữ liệu có kiểm toán

**Chuyên mục:** Data & Automation  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Biến nguồn dữ liệu thành dashboard có metric definitions và traceable calculations.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Định nghĩa nguồn, grain, time zone và công thức từng KPI trước khi vẽ.
2. Tách actuals, estimates và missing values; tránh làm mịn che outliers.
3. Thêm filters, drill-down và tooltip mô tả công thức/khoảng thời gian.
4. Kiểm tra tổng/chi tiết, số âm, số 0, missing và kết quả ngoại lệ.
5. Ghi data freshness, source ID và lịch refresh; lưu snapshot mẫu.

## Kết quả

Metric dictionary, dashboard, QA reconciliation.

## Bằng chứng nghiệm thu

- [ ] KPI tái tính được từ dữ liệu nguồn.
- [ ] Không dùng chart không có nguồn/đơn vị.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `reproducible-dashboard` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.w3.org/WAI/standards-guidelines/
- https://agentskills.io/specification
