---
name: hybrid-retrieval
description: "Xây truy xuất vừa chính xác với thuật ngữ hiếm vừa bao quát ý nghĩa của câu hỏi. Chỉ kích hoạt khi người dùng yêu cầu kết hợp bm25, vector và reranking."
license: MIT
---

# Kết hợp BM25, vector và reranking

**Chuyên mục:** Knowledge & RAG  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Xây truy xuất vừa chính xác với thuật ngữ hiếm vừa bao quát ý nghĩa của câu hỏi.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Thiết lập lexical baseline và kiểm tra tokenization đa ngôn ngữ.
2. Tạo vector embeddings từ dữ liệu được phép, có batch tracking và version.
3. Hợp nhất kết quả BM25/vector bằng rank fusion có log parameters.
4. Rerank top-k với giới hạn latency và quyền truy cập ở từng tầng.
5. Đo recall@k, MRR, nDCG và truy vết tài liệu gây false positive.

## Kết quả

Hybrid retriever, benchmark, latency report.

## Bằng chứng nghiệm thu

- [ ] Không hiển thị tài liệu vượt quyền sau rerank.
- [ ] Có so sánh với BM25-only baseline.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `hybrid-retrieval` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://agentskills.io/specification
