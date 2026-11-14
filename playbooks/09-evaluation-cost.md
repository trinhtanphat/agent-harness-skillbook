# Playbook — Đánh giá chất lượng và chi phí Agent

> Không đánh giá agent qua demo đơn lẻ; đo correctness, security, latency, cost và robustness bằng golden tasks.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Benchmark

1. Viết tập 30–100 task có oracle hoặc rubric; chia dev và hidden test.

2. Bao gồm happy path, denied write, conflicting context, stale data, network failure và injection mock.

3. Chạy lặp và ghi số mẫu; báo confidence khi có độ dao động.

## 2. Metrics

1. Task pass rate, grounded citation, unauthorized action rate, tool-call reliability và recovery rate.

2. Latency end-to-end p50/p95, tokens in/out, retry overhead, chi phí compute và tool use.

3. Báo kết quả theo môi trường, model, version, quyền tool nhất quán.

## 3. Optimization

1. Dùng code deterministic cho các bước có thể xác minh, tránh model cho toán đơn giản.

2. Thử tool routing, context compression, caching hợp lệ, batch khi không làm mất quan sát.

3. Không dùng test set để tinh chỉnh tới mức học thuộc rồi báo điểm như independent eval.

## 4. Regression

1. Mỗi failure tạo testcase. Đo trước/sau với cùng workload và tiêu chí.

2. Khi cost giảm mà correctness/permission xấu đi, đánh dấu tradeoff thay vì tối ưu thành công.

3. Duy trì dashboard trong scope hạn chế PII và secrets.

## Bàn giao

Golden tasks, scoring rubric, latency/cost report, regression history.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://learn.chatgpt.com/docs/build-skills
