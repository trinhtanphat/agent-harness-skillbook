---
name: agent-evaluation
description: "Đánh giá chất lượng đúng/sai, an toàn, chi phí và độ ổn định. Chỉ dùng khi yêu cầu liên quan đến đánh giá agent bằng benchmark và rubric."
---

# Đánh giá agent bằng benchmark và rubric

**Chuyên mục:** Agent Harness & Skills  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://www.nist.gov/itl/ai-risk-management-framework

## Khi nào sử dụng

Đánh giá chất lượng đúng/sai, an toàn, chi phí và độ ổn định.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Viết golden tasks với đáp án hoặc oracle.
2. Tách dev/test; chọn test mù.
3. Đo correctness, safety, latency, cost.
4. Chạy lặp để đánh giá phương sai.
5. Phân loại lỗi và đưa regression về bộ test.

## Kết quả phải bàn giao

Eval set, rubric, scorecard, regression suite.

## Bằng chứng nghiệm thu

- [ ] Không dùng tỷ lệ PASS của test tự tạo làm chứng cứ duy nhất.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://learn.chatgpt.com/docs/build-skills
