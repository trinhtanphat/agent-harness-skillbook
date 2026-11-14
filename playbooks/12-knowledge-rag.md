# Playbook — Thiết kế RAG có nguồn và phân quyền

> Áp dụng cho công việc có quyền, với đầu ra tái lập được, có bằng chứng kiểm toán.

## 1. Nhập liệu có provenance

1. Mỗi tài liệu có document_id, source URI, license, ACL, retrieved_at, SHA-256, page/span và extractor version.

2. Phân biệt PDF text gốc và scan, đối chiếu bảng với ảnh trang, không tạo số liệu tưởng tượng.

3. Quarantine tài liệu lỗi; giữ raw record và trạng thái incomplete.

## 2. Chunking và retrieval

1. Chia chunks theo heading, paragraph, page và bảng; không cắt đôi trích dẫn hoặc công thức.

2. So sánh BM25, vector retrieval, rank fusion và rerank trên tập query cố định.

3. Áp dụng authorization trước và sau retriever/reranker để chặn cross-tenant leakage.

## 3. Answer grounding

1. Tạo evidence pack gồm source span và timestamp, mọi claim quan trọng phải trỏ về đoạn hỗ trợ.

2. Test tài liệu thiếu, nguồn mâu thuẫn, DOI sai, query không đủ bằng chứng và yêu cầu phải abstain.

3. Không trích nguồn ảo hoặc đánh đồng semantic similarity với bằng chứng.

## 4. Đánh giá và publish

1. Đo recall@k, nDCG, citation precision, groundedness và p95 latency.

2. Ghi chunk version, embedding model, retrieval params, index freshness và license.

3. Có negative ACL test, đầy đủ provenance và khả năng reproduce index/answer trước release.

## Mẫu báo cáo

- Tên nhiệm vụ và phạm vi được phép
- Source ID, timestamp và SHA artifact
- Phương pháp/công cụ/phiên bản
- Kết quả kiểm thử tích cực và tiêu cực
- Hạn chế, blocker và quyết định PASS/PARTIAL/BLOCKED
- Owner và rollback point

## Tiêu chí nghiệm thu

- [ ] Không ra ngoài scope hoặc tiết lộ bí mật.
- [ ] Mỗi tuyên bố có evidence thực tế.
- [ ] Negative cases được kiểm chứng.
- [ ] Dữ liệu quan trọng có backup và rollback phù hợp.

Nguồn: https://www.nist.gov/itl/ai-risk-management-framework
