---
name: semantic-chunking
description: "Tối ưu phạm vi chunk phục vụ retrieval mà vẫn giữ headings, trích dẫn và provenance. Chỉ kích hoạt khi người dùng yêu cầu chia chunk theo ngữ nghĩa và cấu trúc."
license: MIT
---

# Chia chunk theo ngữ nghĩa và cấu trúc

**Chuyên mục:** Knowledge & RAG  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Tối ưu phạm vi chunk phục vụ retrieval mà vẫn giữ headings, trích dẫn và provenance.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác định đơn vị atomic theo heading, paragraph, table hoặc điều khoản.
2. Không cắt giữa citation, bảng hoặc công thức quan trọng.
3. Gắn metadata document_id, section, page range, source SHA và access policy.
4. Thử nhiều kích thước/overlap trên tập query xác định trước.
5. Đánh giá recall, citation accuracy và latency trước khi chọn chiến lược.

## Kết quả

Chunk index schema, retrieval ablation report.

## Bằng chứng nghiệm thu

- [ ] Chunk có citation cùng nguồn và vị trí.
- [ ] Không trộn nội dung khác permission.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `semantic-chunking` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://agentskills.io/specification
