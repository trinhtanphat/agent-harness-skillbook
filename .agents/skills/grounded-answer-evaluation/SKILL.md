---
name: grounded-answer-evaluation
description: "Chống hallucination bằng kiểm tra claim, trích dẫn và tình huống không có đủ tài liệu. Chỉ kích hoạt khi người dùng yêu cầu đánh giá câu trả lời có dẫn chứng."
license: MIT
---

# Đánh giá câu trả lời có dẫn chứng

**Chuyên mục:** Knowledge & RAG  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Chống hallucination bằng kiểm tra claim, trích dẫn và tình huống không có đủ tài liệu.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Tạo tập câu hỏi đáp có oracle và file nguồn chứng minh.
2. Xác định claim-level groundedness; mỗi claim trỏ đúng nguồn và span.
3. Test truy vấn ngoài phạm vi, thiếu thông tin và nguồn mâu thuẫn.
4. Phân loại lỗi retrieval vs synthesis vs citation misalignment.
5. Ghi precision, abstention appropriateness và false attribution rate.

## Kết quả

RAG evaluation suite, hallucination ledger, remediation list.

## Bằng chứng nghiệm thu

- [ ] Không tạo DOI/link/tác giả không có thật.
- [ ] Có ca phải từ chối suy đoán khi thiếu dữ liệu.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `grounded-answer-evaluation` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://agentskills.io/specification
