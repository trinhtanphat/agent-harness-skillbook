---
name: knowledge-ingestion
description: "Thiết kế pipeline nhập tệp, website có phép và metadata vào hệ thống truy xuất. Chỉ kích hoạt khi người dùng yêu cầu nhập liệu kiến thức có truy xuất nguồn."
license: MIT
---

# Nhập liệu kiến thức có truy xuất nguồn

**Chuyên mục:** Knowledge & RAG  
**Mức độ:** Cơ bản  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Thiết kế pipeline nhập tệp, website có phép và metadata vào hệ thống truy xuất.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác định nguồn, giấy phép, phân quyền, lịch sử phiên bản và retention.
2. Giữ source URI, title, updated_at, page/span và hash khi trích xuất.
3. Chuẩn hóa văn bản Unicode, bảng, heading, layout và loại trùng.
4. Thiết lập retry, checksum, bảng quarantined errors và delta update.
5. Kiểm chứng từng nguồn có thể truy xuất được trước lập index.

## Kết quả

Ingestion manifest, provenance table, extraction QA.

## Bằng chứng nghiệm thu

- [ ] Mọi chunk dẫn về nguồn hợp lệ.
- [ ] Không nhập nội dung có quyền hạn ngoài scope.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `knowledge-ingestion` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://agentskills.io/specification
