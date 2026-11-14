---
name: citation-dedup
description: "Hợp nhất bản ghi nhiều nguồn mà vẫn giữ bằng chứng và DOI. Chỉ dùng khi yêu cầu liên quan đến quản lý trích dẫn và khử trùng lặp."
---

# Quản lý trích dẫn và khử trùng lặp

**Chuyên mục:** Research & PhD  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://www.crossref.org/documentation/retrieve-metadata/rest-api/

## Khi nào sử dụng

Hợp nhất bản ghi nhiều nguồn mà vẫn giữ bằng chứng và DOI.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Nhập RIS/BibTeX/CSV có source_id.
2. Chuẩn hóa DOI, title, year, authors.
3. Khử trùng lặp theo DOI và fuzzy title có kiểm tra.
4. Giữ liên kết từng bản ghi gốc.
5. Ghi checksum file full text và provenance.

## Kết quả phải bàn giao

Master bibliography, dedupe log, missing-fulltext list.

## Bằng chứng nghiệm thu

- [ ] Không gộp 2 nghiên cứu chỉ vì tiêu đề gần giống.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- https://learn.chatgpt.com/docs/build-skills
