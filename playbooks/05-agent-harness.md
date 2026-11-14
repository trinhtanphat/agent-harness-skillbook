# Playbook — Agent Harness, Skills, Context và Multi-agent

> Đóng gói agent thành hệ thống được kiểm soát: model suy luận, harness điều phối, skill chuyên biệt và MCP kết nối.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Các lớp kiến trúc

1. Model là năng lực; Harness là loop định tuyến tool, state, retry và checkpoint.

2. SKILL.md là workflow đơn nhiệm vụ với frontmatter name/description và references/scripts tùy chọn.

3. AGENTS.md lưu chính sách repo; MCP là giao thức và không thay cho authorization.

## 2. Vòng lặp làm việc

1. Đầu tiên chốt outcome và tiêu chí nghiệm thu; kiểm tra công cụ thực tế hiện có.

2. Gom bằng chứng read-only, lập plan có giới hạn quyền, thực hiện thay đổi nhỏ và ghi checkpoint.

3. Test độc lập, kiểm tra artifact SHA/runtime, handoff đầy đủ completed/blocked/next.

## 3. Multi-agent có kiểm soát

1. Phân vai researcher, implementer, reviewer, test runner và release owner.

2. Dùng workspace/worktree tách biệt, cấm cùng ghi tệp thiếu phối hợp.

3. Hợp nhất diff sau review, tránh nhầm agent tự kiểm thử với external approval.

## 4. Evaluation

1. Golden tasks cùng oracle và negative controls; chạy thử prompt có và không nên trigger skill.

2. Đo task accuracy, permission violations, latency p95, chi phí và tỷ lệ hồi phục lỗi.

3. Tách dataset tối ưu khỏi dataset đánh giá, ghi uncertainty và so sánh có fairness.

## Bàn giao

Reusable skills, context handoff, role contracts, evaluation rubric.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://learn.chatgpt.com/docs/build-skills
- https://learn.chatgpt.com/docs/build-skills
