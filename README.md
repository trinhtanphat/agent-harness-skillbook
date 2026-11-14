# Agent Harness Skillbook

> **Kho hướng dẫn thực hành bằng tiếng Việt** về agentic engineering, kỹ năng tái sử dụng, MCP, nghiên cứu học thuật, tái tạo ứng dụng có quyền, kiểm toán, QA và triển khai an toàn.

🌐 **Website GitHub Pages:** https://trinhtanphat.github.io/agent-harness-skillbook/  
📚 **Thư viện:** [Mở trang chủ](index.html) · [Skills](.agents/skills/) · [Playbooks](playbooks/) · [Nguồn tham khảo](REFERENCES.md)

## Mục tiêu

1. **Học có cấu trúc**: giải thích khái niệm, quy trình và điểm kiểm soát.
2. **Làm được thật**: cung cấp `SKILL.md`, mã mẫu, checklist và rubric nghiệm thu.
3. **Không đánh đồng trạng thái**: phân biệt kế hoạch, mã đã viết, test, commit, deployment và production verified.
4. **An toàn theo mặc định**: chỉ crawl/clone tài sản được phép, không sao chép bí mật, dữ liệu cá nhân, tài sản có bản quyền khi chưa được phép.
5. **Sử dụng lại**: mỗi skill là một công việc hẹp, có đầu vào/đầu ra và giới hạn rõ.

## Các học phần

| Nhóm | Nội dung |
|---|---|
| Agent Harness | lập kế hoạch, tool routing, context/memory, reasoning effort, delegation, checkpoint |
| Skills | SKILL.md, progressive disclosure, trigger design, evaluation |
| MCP | host/client/server, stdio vs Streamable HTTP, OAuth, RBAC, least privilege |
| Crawl & App Reconstruction | scope & quyền, sitemap, network capture, UI diff, assets, API contracts, regression |
| PhD Research | câu hỏi nghiên cứu, PRISMA, thư mục tài liệu, SLR, citation, chất lượng bằng chứng |
| Problem Solving | RCA, 5 Whys, falsification, risk matrix, recovery |
| QA & SRE | unit/integration/E2E, visual QA, artifact provenance, rollback |
| Coding & Deployment | Git, branch, PR, reviewer gate, release manifests, GitHub Pages |
| Security | secrets, prompt injection, supply chain, threat modeling |
| Multi-agent & Eval | agents, separation of duties, benchmark, cost/latency |

## Bắt đầu

Site tĩnh (HTML/CSS/JS), không cần Node, cơ sở dữ liệu hay Actions. Mở `index.html` hoặc chạy local web server, ví dụ:

```bash
python -m http.server 8000
```

Để dùng các skill với Codex, lưu `SKILL.md` trong `.agents/skills/<skill-name>/`. Kiểm tra phiên bản công cụ và tài liệu chính thức trước khi cấu hình.

## Quy ước trạng thái

`DRAFT` → `IMPLEMENTED` → `TESTED` → `COMMITTED` → `DEPLOYED` → `PRODUCTION_VERIFIED`. Không bỏ qua bằng chứng hoặc coi một bước là toàn bộ dự án hoàn tất.

## Nguồn tham khảo

- [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI Codex customization](https://learn.chatgpt.com/docs/customization/overview)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [PRISMA 2020](https://www.prisma-statement.org/)
- [Playwright](https://playwright.dev/)

Chi tiết ghi tại [REFERENCES.md](REFERENCES.md). Tất cả nội dung diễn giải được biên soạn lại, không sao chép nguyên văn nội dung nguồn.

## Giấy phép

Nội dung hướng dẫn và mã mẫu do dự án tạo ra: MIT (xem `LICENSE`). Tài liệu và mã nguồn bên thứ ba vẫn thuộc giấy phép/chủ sở hữu tương ứng.

**Ghi chú:** Số lượng test PASS hay URL trả HTTP 200 không đủ chứng minh ứng dụng đã khớp nguồn và đạt nghiệm thu hình ảnh/kinh doanh.
