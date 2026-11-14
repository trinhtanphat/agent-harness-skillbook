---
name: pdf-table-extraction
description: "Tách văn bản và bảng từ PDF có nguồn, kiểm tra layout và trường hợp scan cần xử lý riêng. Chỉ kích hoạt khi người dùng yêu cầu trích xuất pdf và bảng đáng tin cậy."
license: MIT
---

# Trích xuất PDF và bảng đáng tin cậy

**Chuyên mục:** Knowledge & RAG  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Tách văn bản và bảng từ PDF có nguồn, kiểm tra layout và trường hợp scan cần xử lý riêng.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Phân loại PDF native text, hybrid hoặc scan và kiểm tra quyền đọc.
2. Trích xuất theo page, preserve heading/table alignment và bounding info.
3. Kiểm tra mẫu bằng hình ảnh trang và đối chiếu số liệu với bản gốc.
4. Đánh dấu confidence thấp/ô trống; OCR chỉ khi cần và lưu bản sai để reviewer.
5. Xuất CSV/JSON cùng page citation, hash và trạng thái chưa kiểm chứng.

## Kết quả

Structured tables, page references, extraction error report.

## Bằng chứng nghiệm thu

- [ ] Số và dấu âm/cột không bị đảo.
- [ ] Không suy đoán dữ liệu mất từ scan.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `pdf-table-extraction` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.w3.org/WAI/standards-guidelines/pdf/
- https://agentskills.io/specification
