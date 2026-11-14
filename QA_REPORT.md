# QA REPORT — Agent Harness Skillbook

**Ngày chạy:** 2026-11-14 07:45:40 UTC (14:45:40 Việt Nam)  
**Repo:** trinhtanphat/agent-harness-skillbook  
**Commit kiểm thử:** e4d2f97bebb92670392dc96a67eec6a8f0c7875c  
**Site:** https://trinhtanphat.github.io/agent-harness-skillbook/  
**Môi trường:** DESKTOP-PHA1S90, Chrome headless, profile riêng tự tạo, không đụng Edge/Session 2.  
**Command:** node scripts/browser-qa.mjs https://trinhtanphat.github.io/agent-harness-skillbook/

## 7/7 Browser smoke checks PASS

| Hạng mục | Quan sát |
|---|---|
| Desktop catalog | 60 skills, 11 category buttons, không horizontal overflow ở 1440px |
| Search MCP | 7 kết quả phù hợp, filter hoạt động |
| Category Research | 6 skills, aria-pressed=true |
| Detail drawer | mở và đóng bằng UI thành công |
| Mobile 390px | 60 skills, viewport/scrollWidth đều 390 |
| Playbook mobile | 14 menu links, có heading và không overflow |
| Runtime JS exceptions | 0 |

## Hình ảnh kiểm chứng

![Desktop 1440x900](evidence/2026-11-14/home-desktop-1440.png)

![Mobile 390px](evidence/2026-11-14/home-mobile-390.png)

[Chi tiết skill](evidence/2026-11-14/skill-detail-desktop.png) · [Trang playbook mobile](evidence/2026-11-14/docs-mobile-390.png)

## MCP protocol tests

Node smoke tests on WIN11-181: discovery, per-request metadata, tool listing, deterministic tool calls, validation error, unknown tool, version mismatch and missing metadata: PASS. Protocol revision: **2026-07-28**, reference: https://modelcontextprotocol.io/specification/2026-07-28.

## Giới hạn

- Đây là kiểm thử smoke, không phải nghiệm thu mọi tương tác và nội dung của 60 skill.
- Screenshot không thay cho human pixel-level art review.
- Trang tĩnh không thao tác hệ thống production và không có backend người dùng.
- GitHub Pages / commit cần kiểm tra lại sau mỗi cập nhật, không tự áp dụng kết quả cũ cho commit mới.
- Thông tin và mã ví dụ chỉ dùng cho nghiên cứu/phát triển có quyền.

**Quyết định:** PASS cho các kiểm tra ở bảng trên; các mục nằm ngoài phạm vi được ghi chưa kiểm chứng.
