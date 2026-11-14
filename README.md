# Agent Harness Skillbook

**Kho kiến thức thực hành AI Engineering, Agent Harness, Skills và MCP bằng tiếng Việt.** Nội dung được viết thành các quy trình có phạm vi, quyền, output, testcase và bằng chứng. Tài liệu tự biên soạn dựa trên tiêu chuẩn/tài liệu công khai; không phải sản phẩm chính thức của các tổ chức được tham khảo.

🌐 **Website:** https://trinhtanphat.github.io/agent-harness-skillbook/  
📚 **Tài liệu:** [14 hướng dẫn dạng HTML](docs/) · [60 SKILL.md](.agents/skills/) · [Danh mục nguồn](REFERENCES.md)  
💡 **MCP mẫu:** [Server stdio 2026-07-28](examples/mcp-stdio-demo/)  
🔬 **Bộ kiểm thử:** [Validator](scripts/validate.mjs) · [Browser QA](scripts/browser-qa.mjs)

## 60 kỹ năng / 10 nhóm

| Nhóm | Ví dụ |
|---|---|
| Agent Harness & Skills | agent loop, trigger design, context/memory, multi-agent, evaluation |
| Crawl & App Reconstruction | quyền/scope, route map, API contract, visual QA, asset provenance |
| Research & PhD | research protocol, PRISMA, screening, dedupe, evidence synthesis |
| MCP & Integrations | host/client/server, OAuth/RBAC, permission, observability, schema |
| Problem Solving | scientific debugging, 5 Whys, RCA, incident, evidence reporting |
| QA, Security & Delivery | unit/integration/E2E, blue/green, rollbacks, security |
| Reverse Engineering & Forensics | static archaeology, sandbox, PE/ELF, PCAP, JS bundle |
| Knowledge & RAG | ingestion, PDF extraction, chunking, hybrid search, grounded eval |
| Git & Release Engineering | full Git mirror, LFS/submodules/releases, local CI, attestation |
| Data & Automation | crawler delta, durable scheduler, data invariants, idempotent queue |

## 14 playbooks

| Số | Chuyên đề |
|---|---|
| 01 | [Crawl & xây lại ứng dụng có quyền](docs/01-app-reconstruction.html) |
| 02 | [Nghiên cứu luận án có hệ thống](docs/02-phd-research.html) |
| 03 | [MCP & thiết bị từ xa](docs/03-mcp-integration.html) |
| 04 | [Giải quyết vấn đề gốc](docs/04-problem-solving.html) |
| 05 | [Agent Harness & Multi-agent](docs/05-agent-harness.html) |
| 06 | [QA & Blue/Green](docs/06-qa-release.html) |
| 07 | [Evidence ledger & nghiệm thu](docs/07-evidence-reporting.html) |
| 08 | [Security, quyền và đạo đức](docs/08-security-ethics.html) |
| 09 | [Đánh giá agent & chi phí](docs/09-evaluation-cost.html) |
| 10 | [Lộ trình 30 ngày](docs/10-learning-roadmap.html) |
| 11 | [Reverse engineering / Forensics](docs/11-reverse-forensics.html) |
| 12 | [Knowledge Engineering / RAG](docs/12-knowledge-rag.html) |
| 13 | [Git mirror toàn bộ refs, LFS, Releases](docs/13-full-github-mirror.html) |
| 14 | [Data pipelines & scheduler](docs/14-data-automation.html) |

## Khởi chạy / kiểm thử local

Yêu cầu Node 22+ cho bộ kiểm thử. Website chạy hoàn toàn tĩnh, không cần API, framework hay GitHub Actions.

~~~bash
git clone https://github.com/trinhtanphat/agent-harness-skillbook.git
cd agent-harness-skillbook
node --check assets/app.js
node --check data/catalog.js
node scripts/validate.mjs
node examples/mcp-stdio-demo/client-smoke.mjs
~~~

Browser QA với Chromium hoặc Edge headless **profile cách ly**:

~~~bash
node scripts/browser-qa.mjs https://trinhtanphat.github.io/agent-harness-skillbook/
~~~

Nếu không phát hiện browser binary, script sẽ SKIP minh bạch. QA images và browser-qa.json được ghi trong thư mục qa-evidence của workspace local (không tự động gửi dữ liệu đi).

## Dùng Skill

Đọc metadata và phạm vi SKILL.md, sau đó sử dụng trong hệ thống agent tương thích định dạng [Agent Skills](https://agentskills.io/specification). Chẳng hạn: [skill Git mirror](.agents/skills/complete-repository-mirror/SKILL.md).

## Nghiệm thu và đạo đức

Tách **IMPLEMENTED → TESTED → REVIEWED → DEPLOYED → PRODUCTION_VERIFIED → ACCEPTED**. HTTP 200, unit PASS hoặc SHA trùng không đủ tự chứng minh đầy đủ chức năng và chất lượng UI/asset. Không đưa credential, PII, nội dung riêng tư hoặc tài sản có bản quyền thiếu phép vào repository.

Các mẫu là tài liệu giáo dục; phải xác minh tool/SDK, giấy phép và quyền theo môi trường trước khi áp dụng. Repo sử dụng giấy phép MIT cho nội dung/mã do dự án biên soạn. Tư liệu bên thứ ba giữ nguyên bản quyền riêng.

Nguồn: [Agent Skills](https://agentskills.io/specification) · [MCP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28) · [PRISMA](https://www.prisma-statement.org/) · [Playwright](https://playwright.dev/).
