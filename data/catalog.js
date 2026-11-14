window.SKILLBOOK_CATALOG = [
  {
    "category": "Agent Harness & Skills",
    "id": "agent-operating-loop",
    "title": "Vòng lặp agent có kiểm soát",
    "level": "Cơ bản",
    "summary": "Biến yêu cầu mở thành kế hoạch có đầu ra, bằng chứng và giới hạn quyền.",
    "steps": [
      "Xác định mục tiêu và điều kiện kết thúc",
      "Liệt kê công cụ có quyền truy cập thực tế",
      "Thu thập bằng chứng trước thay đổi",
      "Thực hiện theo bước nhỏ có checkpoint",
      "Đối chiếu bằng chứng và báo cáo phần chưa xong"
    ],
    "deliverables": "Bảng mục tiêu, nhật ký công cụ, checklist nghiệm thu",
    "checks": [
      "Không có lời khẳng định thành công thiếu chứng cứ",
      "Thay đổi ngoài phạm vi phải được ngăn"
    ],
    "tags": [
      "harness",
      "planning",
      "evidence"
    ],
    "origin": "Tự biên soạn",
    "source": "https://learn.chatgpt.com/docs/customization/overview",
    "path": ".agents/skills/agent-operating-loop/SKILL.md"
  },
  {
    "category": "Agent Harness & Skills",
    "id": "author-skill",
    "title": "Viết SKILL.md đúng chuẩn",
    "level": "Cơ bản",
    "summary": "Tạo skill đơn nhiệm vụ với metadata, trigger, quy trình và kiểm thử.",
    "steps": [
      "Định nghĩa một nhiệm vụ và trường hợp kích hoạt",
      "Viết frontmatter name và description rõ ràng",
      "Thêm Input, Steps, Verification, Safety",
      "Đặt vào .agents/skills/skill-name/SKILL.md",
      "Thử prompt kích hoạt và prompt không phù hợp"
    ],
    "deliverables": "SKILL.md tái sử dụng và test kích hoạt",
    "checks": [
      "Frontmatter hợp lệ",
      "Không chứa token hay thông tin nhạy cảm"
    ],
    "tags": [
      "skills",
      "markdown",
      "reusable"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://learn.chatgpt.com/docs/build-skills",
    "path": ".agents/skills/author-skill/SKILL.md"
  },
  {
    "category": "Agent Harness & Skills",
    "id": "harness-routing",
    "title": "Chọn công cụ theo năng lực và bằng chứng",
    "level": "Trung cấp",
    "summary": "Dùng công cụ nào cho web, file, mã nguồn, máy tính hoặc dịch vụ từ xa.",
    "steps": [
      "Phân loại nguồn dữ liệu công khai hay riêng tư",
      "Kiểm tra quyền và khả dụng từng connector",
      "Chọn công cụ chuyên dụng thay vì suy đoán",
      "Chặn công cụ ghi khi chỉ cần đọc",
      "Ghi nguồn và kết quả kiểm chứng"
    ],
    "deliverables": "Sơ đồ định tuyến tools và ma trận quyền",
    "checks": [
      "Đúng nguồn dữ liệu",
      "Không dùng web thay cho tài liệu riêng tư"
    ],
    "tags": [
      "routing",
      "mcp",
      "tools"
    ],
    "origin": "Tự biên soạn",
    "source": "https://learn.chatgpt.com/docs/customization/overview",
    "path": ".agents/skills/harness-routing/SKILL.md"
  },
  {
    "category": "Agent Harness & Skills",
    "id": "context-engineering",
    "title": "Quản trị context, memory và handoff",
    "level": "Trung cấp",
    "summary": "Giữ được ràng buộc dài hạn mà không để ngữ cảnh cũ lấn át bằng chứng mới.",
    "steps": [
      "Tách user intent, policy, evidence và assumption",
      "Tóm tắt state bằng file checkpoint",
      "Gắn timestamp và nguồn cho mỗi fact",
      "Chuyển giao qua handoff ngắn, đủ đường dẫn và trạng thái",
      "Xóa thông tin mật và đánh dấu dữ liệu hết hạn"
    ],
    "deliverables": "Checkpoint, handoff.md, evidence ledger",
    "checks": [
      "Không gán suy luận thành thực tế",
      "Không lộ PII trong log"
    ],
    "tags": [
      "context",
      "memory",
      "handoff"
    ],
    "origin": "Tự biên soạn",
    "source": "https://learn.chatgpt.com/docs/customization/overview",
    "path": ".agents/skills/context-engineering/SKILL.md"
  },
  {
    "category": "Agent Harness & Skills",
    "id": "multi-agent-review",
    "title": "Điều phối nhiều agent và phản biện độc lập",
    "level": "Nâng cao",
    "summary": "Chia việc độc lập để tăng tốc mà không gây tranh chấp branch hoặc tệp.",
    "steps": [
      "Chọn các phần việc có ranh giới độc lập",
      "Mỗi agent có workspace và mục tiêu rõ",
      "Cấm cùng sửa tệp khi chưa phối hợp",
      "Tổng hợp theo ma trận evidence",
      "Review chéo và chạy regression hợp nhất"
    ],
    "deliverables": "Worktree plan, review findings, integrated report",
    "checks": [
      "Không có ghi đè cạnh tranh",
      "Chỉ merge sau test hợp nhất"
    ],
    "tags": [
      "multi-agent",
      "worktree",
      "review"
    ],
    "origin": "Tự biên soạn",
    "source": "https://learn.chatgpt.com/docs/customization/overview",
    "path": ".agents/skills/multi-agent-review/SKILL.md"
  },
  {
    "category": "Agent Harness & Skills",
    "id": "agent-evaluation",
    "title": "Đánh giá agent bằng benchmark và rubric",
    "level": "Nâng cao",
    "summary": "Đánh giá chất lượng đúng/sai, an toàn, chi phí và độ ổn định.",
    "steps": [
      "Viết golden tasks với đáp án hoặc oracle",
      "Tách dev/test; chọn test mù",
      "Đo correctness, safety, latency, cost",
      "Chạy lặp để đánh giá phương sai",
      "Phân loại lỗi và đưa regression về bộ test"
    ],
    "deliverables": "Eval set, rubric, scorecard, regression suite",
    "checks": [
      "Không dùng tỷ lệ PASS của test tự tạo làm chứng cứ duy nhất"
    ],
    "tags": [
      "eval",
      "benchmark",
      "quality"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.nist.gov/itl/ai-risk-management-framework",
    "path": ".agents/skills/agent-evaluation/SKILL.md"
  },
  {
    "category": "Crawl & App Reconstruction",
    "id": "legal-scope",
    "title": "Xác lập quyền và phạm vi tái tạo",
    "level": "Cơ bản",
    "summary": "Phân biệt nghiên cứu kỹ thuật với sao chép tài sản thương mại hoặc thông tin không được phép.",
    "steps": [
      "Ghi chủ sở hữu và quyền thu thập",
      "Xác định URL, chức năng, dữ liệu được phép",
      "Kiểm tra robots.txt, ToS và hạn chế truy cập",
      "Phân loại tài sản bên thứ ba",
      "Dự kiến giải pháp clean-room cho phần bị hạn chế"
    ],
    "deliverables": "Scope, permission record, asset rights matrix",
    "checks": [
      "Không bypass login/CAPTCHA/paywall",
      "Không sao chép dữ liệu cá nhân"
    ],
    "tags": [
      "crawl",
      "legal",
      "scope"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.rfc-editor.org/rfc/rfc9309",
    "path": ".agents/skills/legal-scope/SKILL.md"
  },
  {
    "category": "Crawl & App Reconstruction",
    "id": "app-inventory",
    "title": "Khảo sát route, state, asset và API",
    "level": "Trung cấp",
    "summary": "Tạo bản đồ đầy đủ những phần có thể quan sát hợp pháp của ứng dụng.",
    "steps": [
      "Duyệt các route công khai và phiên có quyền",
      "Thu thập sitemap, navigation, network log",
      "Ghi state đăng nhập/khách và desktop/mobile",
      "Liệt kê fonts, hình ảnh, 3D và API contracts",
      "Lập coverage matrix và ưu tiên chưa thấy"
    ],
    "deliverables": "Route inventory, API inventory, asset manifest",
    "checks": [
      "Coverage mỗi route có nguồn và screenshot",
      "Không tải nội dung ngoài scope"
    ],
    "tags": [
      "crawl",
      "routes",
      "assets"
    ],
    "origin": "Tự biên soạn",
    "source": "https://playwright.dev/docs/intro",
    "path": ".agents/skills/app-inventory/SKILL.md"
  },
  {
    "category": "Crawl & App Reconstruction",
    "id": "reconstruct-ui",
    "title": "Tái dựng giao diện responsive bằng đặc tả",
    "level": "Trung cấp",
    "summary": "Dựng lại chức năng và bố cục từ đặc tả, không sao chép mã độc quyền.",
    "steps": [
      "Tạo token màu, typography, spacing và grid",
      "Xây component map có trạng thái",
      "Thiết kế breakpoint và a11y",
      "Dùng tài sản được cấp phép hoặc tự tạo",
      "So sánh screenshot ở viewport cố định"
    ],
    "deliverables": "Design tokens, UI components, screenshots",
    "checks": [
      "Không còn text overflow và lỗi tương tác",
      "Đạt keyboard navigation cơ bản"
    ],
    "tags": [
      "ui",
      "responsive",
      "visual"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.w3.org/TR/WCAG22/",
    "path": ".agents/skills/reconstruct-ui/SKILL.md"
  },
  {
    "category": "Crawl & App Reconstruction",
    "id": "api-contract-rebuild",
    "title": "Tái hiện API contract trên backend thử nghiệm",
    "level": "Nâng cao",
    "summary": "Đặc tả lại chức năng API từ đầu vào/đầu ra được phép và tạo mock.",
    "steps": [
      "Liệt kê endpoint, method, auth và schema",
      "Phân loại lỗi 4xx/5xx, retries và idempotency",
      "Tạo mock fixtures không chứa PII",
      "Viết contract tests cho edge cases",
      "So sánh khác biệt có tài liệu hóa"
    ],
    "deliverables": "OpenAPI draft, mocks, contract tests",
    "checks": [
      "Không truy cập sản xuất trái phép",
      "Không log credential thật"
    ],
    "tags": [
      "api",
      "contract",
      "mock"
    ],
    "origin": "Tự biên soạn",
    "source": "https://playwright.dev/docs/intro",
    "path": ".agents/skills/api-contract-rebuild/SKILL.md"
  },
  {
    "category": "Crawl & App Reconstruction",
    "id": "asset-provenance",
    "title": "Kiểm kê và nghiệm thu tài nguyên 2D/3D",
    "level": "Nâng cao",
    "summary": "Tách kiểm tra hash/tải thành công khỏi kiểm duyệt chất lượng hình ảnh.",
    "steps": [
      "Ghi license, nguồn và mục đích từng asset",
      "Hash SHA-256 bản gốc và bản xuất",
      "Render đúng camera/ánh sáng/tỷ lệ",
      "Chụp screenshot cùng viewport mục tiêu",
      "Reviewer kiểm tra xuất xứ, chất lượng và vị trí"
    ],
    "deliverables": "Asset ledger, checksums, review sheet",
    "checks": [
      "Hash PASS không thay thế human art approval",
      "Không claim 100% khi thiếu review"
    ],
    "tags": [
      "assets",
      "3d",
      "art-gate"
    ],
    "origin": "Tự biên soạn",
    "source": "https://playwright.dev/docs/intro",
    "path": ".agents/skills/asset-provenance/SKILL.md"
  },
  {
    "category": "Crawl & App Reconstruction",
    "id": "visual-diff-gate",
    "title": "Kiểm thử visual regression có ngưỡng",
    "level": "Nâng cao",
    "summary": "Phát hiện lệch giao diện thay vì chỉ test HTTP 200.",
    "steps": [
      "Cố định browser, viewport, font, locale và dữ liệu",
      "Chụp baseline và candidate",
      "Tạo diff và khoanh vùng sai khác",
      "Phân biệt thay đổi mong muốn với regression",
      "Lưu bằng chứng trước khi phê duyệt"
    ],
    "deliverables": "Baseline, actual, diff, waiver log",
    "checks": [
      "Không bỏ qua vùng sai khác chưa giải thích"
    ],
    "tags": [
      "visual",
      "playwright",
      "qa"
    ],
    "origin": "Tự biên soạn",
    "source": "https://playwright.dev/docs/intro",
    "path": ".agents/skills/visual-diff-gate/SKILL.md"
  },
  {
    "category": "Research & PhD",
    "id": "research-question",
    "title": "Đặt câu hỏi và khoảng trống luận án",
    "level": "Cơ bản",
    "summary": "Đưa đề tài rộng về câu hỏi có phạm vi, biến và đóng góp rõ ràng.",
    "steps": [
      "Xác định đối tượng, bối cảnh, thời gian và đơn vị phân tích",
      "Viết vấn đề và câu hỏi theo PICo/SPIDER khi phù hợp",
      "Đối chiếu công trình gần nhất",
      "Tách khoảng trống dữ liệu, lý thuyết và ứng dụng",
      "Xin phản biện và tinh chỉnh"
    ],
    "deliverables": "Problem statement, research questions, gap matrix",
    "checks": [
      "Không tuyên bố novelty khi chưa tổng quan có hệ thống"
    ],
    "tags": [
      "phd",
      "question",
      "gap"
    ],
    "origin": "Tự biên soạn",
    "source": "https://training.cochrane.org/handbook/current",
    "path": ".agents/skills/research-question/SKILL.md"
  },
  {
    "category": "Research & PhD",
    "id": "literature-protocol",
    "title": "Thiết kế protocol tổng quan tài liệu",
    "level": "Trung cấp",
    "summary": "Định nghĩa cơ sở dữ liệu, truy vấn, tiêu chí chọn và phương pháp sàng lọc.",
    "steps": [
      "Xác định review type và cơ sở dữ liệu",
      "Soạn chuỗi Boolean đa ngôn ngữ",
      "Công bố inclusion/exclusion và mốc thời gian",
      "Đăng ký protocol nếu phù hợp",
      "Chuẩn bị bảng quyết định có lý do loại"
    ],
    "deliverables": "Review protocol, search strings, screening rules",
    "checks": [
      "Có thể tái lập tìm kiếm",
      "Không đổi tiêu chí theo kết quả không ghi chú"
    ],
    "tags": [
      "phd",
      "slr",
      "protocol"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://www.prisma-statement.org/",
    "path": ".agents/skills/literature-protocol/SKILL.md"
  },
  {
    "category": "Research & PhD",
    "id": "citation-dedup",
    "title": "Quản lý trích dẫn và khử trùng lặp",
    "level": "Trung cấp",
    "summary": "Hợp nhất bản ghi nhiều nguồn mà vẫn giữ bằng chứng và DOI.",
    "steps": [
      "Nhập RIS/BibTeX/CSV có source_id",
      "Chuẩn hóa DOI, title, year, authors",
      "Khử trùng lặp theo DOI và fuzzy title có kiểm tra",
      "Giữ liên kết từng bản ghi gốc",
      "Ghi checksum file full text và provenance"
    ],
    "deliverables": "Master bibliography, dedupe log, missing-fulltext list",
    "checks": [
      "Không gộp 2 nghiên cứu chỉ vì tiêu đề gần giống"
    ],
    "tags": [
      "citations",
      "dedupe",
      "zotero"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.crossref.org/documentation/retrieve-metadata/rest-api/",
    "path": ".agents/skills/citation-dedup/SKILL.md"
  },
  {
    "category": "Research & PhD",
    "id": "prisma-screening",
    "title": "Sàng lọc và báo cáo PRISMA",
    "level": "Trung cấp",
    "summary": "Lập flow từ nhận diện đến full text và nghiên cứu đưa vào.",
    "steps": [
      "Tổng hợp số records theo nguồn",
      "Ghi số duplicate và số bị loại từng vòng",
      "Đánh giá title/abstract, rồi full-text",
      "Lưu lý do loại full text",
      "Kiểm tra phương trình số lượng PRISMA"
    ],
    "deliverables": "PRISMA flow, exclusion table, audit trail",
    "checks": [
      "Số lượng luôn cân đối",
      "Không ghi full-text reviewed khi chưa đọc"
    ],
    "tags": [
      "prisma",
      "screening",
      "audit"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://www.prisma-statement.org/",
    "path": ".agents/skills/prisma-screening/SKILL.md"
  },
  {
    "category": "Research & PhD",
    "id": "evidence-synthesis",
    "title": "Tổng hợp bằng chứng và đánh giá phương pháp",
    "level": "Nâng cao",
    "summary": "Chuyển paper thành ma trận thiết kế, mẫu, kết quả và hạn chế.",
    "steps": [
      "Trích xuất mục tiêu, mẫu, phương pháp, bias và kết quả",
      "Phân biệt quan hệ tương quan với nhân quả",
      "Đánh giá chất lượng và độ tin cậy",
      "Phân nhóm theo chủ đề/địa lý/thời gian",
      "Đưa ra kết luận có giới hạn"
    ],
    "deliverables": "Evidence table, synthesis narrative, limitations",
    "checks": [
      "Không tạo citation, DOI hoặc số liệu giả"
    ],
    "tags": [
      "evidence",
      "bias",
      "synthesis"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://training.cochrane.org/handbook/current",
    "path": ".agents/skills/evidence-synthesis/SKILL.md"
  },
  {
    "category": "Research & PhD",
    "id": "thesis-defense",
    "title": "Viết luận án và chuẩn bị phản biện",
    "level": "Nâng cao",
    "summary": "Xây dựng luận chứng, đóng góp, hạn chế và bản trình bày bảo vệ.",
    "steps": [
      "Lập outline theo câu hỏi nghiên cứu",
      "Liên kết mỗi claim với bằng chứng có nguồn",
      "Đồng bộ trích dẫn với bibliography",
      "Kiểm tra đạo đức, đồng thuận và bảo mật dữ liệu",
      "Luyện câu hỏi phản biện và kiểm chứng số liệu"
    ],
    "deliverables": "Chapter outline, citation audit, defense deck",
    "checks": [
      "Không dùng AI tạo dữ liệu nghiên cứu tưởng tượng"
    ],
    "tags": [
      "thesis",
      "writing",
      "defense"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.prisma-statement.org/",
    "path": ".agents/skills/thesis-defense/SKILL.md"
  },
  {
    "category": "MCP & Integrations",
    "id": "mcp-architecture",
    "title": "Hiểu kiến trúc MCP từ host đến tool",
    "level": "Cơ bản",
    "summary": "Phân biệt host, client, server, tools, resources, prompts và transport.",
    "steps": [
      "Xác định host và ranh giới tin cậy",
      "Liệt kê tools/resources/prompts cần thiết",
      "Chọn local stdio hoặc remote Streamable HTTP",
      "Xác định auth và permission cho từng action",
      "Đo thử thời gian, lỗi và tracing"
    ],
    "deliverables": "MCP architecture diagram, capability map",
    "checks": [
      "Không để tool đọc/ghi vượt phạm vi yêu cầu"
    ],
    "tags": [
      "mcp",
      "transport",
      "architecture"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://modelcontextprotocol.io/",
    "path": ".agents/skills/mcp-architecture/SKILL.md"
  },
  {
    "category": "MCP & Integrations",
    "id": "mcp-server",
    "title": "Thiết kế MCP server tối giản",
    "level": "Trung cấp",
    "summary": "Xây MCP server với tool schema rõ, phản hồi có cấu trúc và error handling.",
    "steps": [
      "Lựa chọn SDK chính thức và khóa version",
      "Định nghĩa input schema chặt",
      "Kiểm tra quyền tại server cho từng tool",
      "Chống path traversal và SSRF",
      "Viết test happy/denied/timeout và log redacted"
    ],
    "deliverables": "Server skeleton, tool contracts, test fixtures",
    "checks": [
      "Không hardcode API key",
      "Đường dẫn ngoài allowlist bị từ chối"
    ],
    "tags": [
      "mcp",
      "server",
      "sdk"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://modelcontextprotocol.io/",
    "path": ".agents/skills/mcp-server/SKILL.md"
  },
  {
    "category": "MCP & Integrations",
    "id": "mcp-security",
    "title": "Bảo mật MCP: OAuth, RBAC, capability",
    "level": "Nâng cao",
    "summary": "Áp dụng least privilege, xác thực và phân quyền theo hành động.",
    "steps": [
      "Lập principal-to-resource matrix",
      "Chọn OAuth/OIDC phù hợp transport và client",
      "Phân tách read/write/admin và scope",
      "Chống confused deputy, token exfiltration",
      "Test 401/403, replay, expiry và audit"
    ],
    "deliverables": "Threat model, RBAC matrix, negative tests",
    "checks": [
      "403 không được coi là thành công",
      "Không đưa token vào log"
    ],
    "tags": [
      "oauth",
      "rbac",
      "security"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization",
    "path": ".agents/skills/mcp-security/SKILL.md"
  },
  {
    "category": "MCP & Integrations",
    "id": "mcp-device-workflow",
    "title": "Điều phối nhiều thiết bị không phá phiên đang dùng",
    "level": "Nâng cao",
    "summary": "Thiết kế orchestration remote computer giữ nguyên phiên người dùng.",
    "steps": [
      "Kiểm tra online/identity/capabilities",
      "Tách job khỏi phiên GUI người dùng",
      "Dùng workspace được phép và sandbox",
      "Tạo checkpoint trước thay đổi hệ thống",
      "Xác minh phục hồi và chỉ đóng tiến trình thuộc job"
    ],
    "deliverables": "Device plan, session map, rollback steps",
    "checks": [
      "Không đóng tab/Session 2 nếu chưa được phép",
      "Không đổi production chỉ để test"
    ],
    "tags": [
      "remote",
      "device",
      "sessions"
    ],
    "origin": "Tự biên soạn",
    "source": "https://learn.chatgpt.com/docs/customization/overview",
    "path": ".agents/skills/mcp-device-workflow/SKILL.md"
  },
  {
    "category": "MCP & Integrations",
    "id": "tool-schema-design",
    "title": "Thiết kế tool schema chống lỗi agent",
    "level": "Trung cấp",
    "summary": "Tạo input hợp lệ, output ít nhiễu và thao tác idempotent.",
    "steps": [
      "Đặt tên tool theo động từ và phạm vi",
      "Giới hạn type, enum, size, timeout và retry",
      "Chuẩn hóa error code cùng correlation ID",
      "Có dry-run, expected version và idempotency key khi ghi",
      "Tạo contract tests cho malformed input"
    ],
    "deliverables": "JSON schemas, examples, contracts",
    "checks": [
      "Không cho phép arbitrary shell theo mặc định"
    ],
    "tags": [
      "tools",
      "schema",
      "idempotency"
    ],
    "origin": "Tự biên soạn",
    "source": "https://modelcontextprotocol.io/",
    "path": ".agents/skills/tool-schema-design/SKILL.md"
  },
  {
    "category": "MCP & Integrations",
    "id": "mcp-observability",
    "title": "Theo dõi vận hành MCP và tỷ lệ lỗi",
    "level": "Nâng cao",
    "summary": "Lập dashboard latency, error, retries, cache và auth-deny.",
    "steps": [
      "Phân định trace/span giữa host/client/server",
      "Chỉ log metadata an toàn đã lọc",
      "Đặt SLI về success và p95",
      "Đánh dấu RBAC denial khác transport outage",
      "Bật alert theo ngưỡng và kiểm tra false positives"
    ],
    "deliverables": "Telemetry spec, runbook, alert matrix",
    "checks": [
      "Trace không chứa prompt bí mật",
      "Có correlation ID xuyên suốt"
    ],
    "tags": [
      "observability",
      "mcp",
      "sli"
    ],
    "origin": "Tự biên soạn",
    "source": "https://opentelemetry.io/docs/",
    "path": ".agents/skills/mcp-observability/SKILL.md"
  },
  {
    "category": "Problem Solving",
    "id": "scientific-debugging",
    "title": "Gỡ lỗi theo giả thuyết có thể bác bỏ",
    "level": "Cơ bản",
    "summary": "Không sửa mò; tiến hành quan sát, giả thuyết, thử nghiệm và kết luận.",
    "steps": [
      "Định nghĩa expected vs actual và cách tái hiện",
      "Thu thập log, config, diff và mốc thời gian",
      "Đưa ít nhất hai giả thuyết thay thế",
      "Thiết kế phép thử phân biệt các giả thuyết",
      "Chỉ sửa sau khi đủ bằng chứng; regression sau sửa"
    ],
    "deliverables": "Repro steps, hypotheses, test evidence, fix",
    "checks": [
      "Không thay đổi nhiều biến trong một phép thử"
    ],
    "tags": [
      "debug",
      "hypothesis",
      "repro"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.nist.gov/itl/ai-risk-management-framework",
    "path": ".agents/skills/scientific-debugging/SKILL.md"
  },
  {
    "category": "Problem Solving",
    "id": "root-cause-analysis",
    "title": "Điều tra nguyên nhân gốc với 5 Whys",
    "level": "Trung cấp",
    "summary": "Tìm cơ chế lỗi thay vì đổ trách nhiệm cho cá nhân.",
    "steps": [
      "Thu thập timeline và sự kiện quan sát được",
      "Vẽ quan hệ nhân quả với 5 Whys/fishbone",
      "Tách trigger, contributing factors và root cause",
      "Thiết kế corrective & preventive actions",
      "Giao owner và ngày kiểm chứng hiệu quả"
    ],
    "deliverables": "RCA, CAPA, action owners",
    "checks": [
      "Không gọi suy đoán là nguyên nhân đã được xác minh"
    ],
    "tags": [
      "rca",
      "5-whys",
      "incident"
    ],
    "origin": "Tự biên soạn",
    "source": "https://opentelemetry.io/docs/",
    "path": ".agents/skills/root-cause-analysis/SKILL.md"
  },
  {
    "category": "Problem Solving",
    "id": "decision-matrix",
    "title": "Đánh giá phương án bằng ma trận rủi ro",
    "level": "Trung cấp",
    "summary": "Chọn phương án tối ưu khi thời gian, chi phí và độ tin cậy xung đột.",
    "steps": [
      "Đặt tiêu chí và trọng số minh bạch",
      "Định nghĩa baseline và phương án tối thiểu",
      "Ước lượng tác động cùng độ bất định",
      "Chạy sensitivity analysis",
      "Ghi quyết định, giả định và điểm xét lại"
    ],
    "deliverables": "ADR, scoring matrix, decision log",
    "checks": [
      "Tránh ngụy chính xác khi thiếu dữ liệu"
    ],
    "tags": [
      "decision",
      "tradeoff",
      "risk"
    ],
    "origin": "Tự biên soạn",
    "source": "https://www.nist.gov/itl/ai-risk-management-framework",
    "path": ".agents/skills/decision-matrix/SKILL.md"
  },
  {
    "category": "Problem Solving",
    "id": "incident-response",
    "title": "Ứng phó sự cố production có rollback",
    "level": "Nâng cao",
    "summary": "Giữ dịch vụ và dữ liệu an toàn trước khi cố sửa hoàn toàn.",
    "steps": [
      "Triage mức độ và điều kiện dừng",
      "Đóng băng ghi nguy hiểm và giữ backup",
      "Phân công incident commander, scribe và fix owner",
      "Đổi traffic bằng blue/green nếu có kiểm chứng",
      "Hồi phục SLI, postmortem không đổ lỗi"
    ],
    "deliverables": "Incident log, rollback record, postmortem",
    "checks": [
      "Không xóa dữ liệu hoặc restart mù",
      "Giữ đường rollback còn hoạt động"
    ],
    "tags": [
      "incident",
      "sre",
      "rollback"
    ],
    "origin": "Tự biên soạn",
    "source": "https://opentelemetry.io/docs/",
    "path": ".agents/skills/incident-response/SKILL.md"
  },
  {
    "category": "Problem Solving",
    "id": "truthful-status",
    "title": "Báo cáo tiến độ bằng bằng chứng đa tầng",
    "level": "Cơ bản",
    "summary": "Phân biệt code viết xong với hệ thống đã chạy và người dùng đã nghiệm thu.",
    "steps": [
      "Ghi commit SHA, branch và artifact SHA",
      "Chạy test với môi trường ghi rõ",
      "Kiểm chứng staging trước production",
      "Đối chiếu runtime SHA, API, E2E và visual review",
      "Ghi blockers và bằng chứng còn thiếu"
    ],
    "deliverables": "Release scorecard, evidence links",
    "checks": [
      "Không dùng từ 100% nếu thiếu checklist scope"
    ],
    "tags": [
      "report",
      "evidence",
      "truth"
    ],
    "origin": "Tự biên soạn",
    "source": "https://docs.github.com/en/pages",
    "path": ".agents/skills/truthful-status/SKILL.md"
  },
  {
    "category": "Problem Solving",
    "id": "reproducible-experiments",
    "title": "Thiết kế thí nghiệm tái lập được",
    "level": "Trung cấp",
    "summary": "Tái hiện lỗi, đo lường hoặc giả thuyết trên dữ liệu độc lập.",
    "steps": [
      "Cố định version, seed, locale và môi trường",
      "Lưu input fixtures và command tái lập",
      "Chạy kiểm chứng với positive/negative control",
      "Lưu metrics và artifacts",
      "Đọc lại từ máy/tài khoản khác nếu phù hợp"
    ],
    "deliverables": "Reproduction kit, checksums, result table",
    "checks": [
      "Không báo test PASS nếu không chạy thực tế"
    ],
    "tags": [
      "experiment",
      "repeatability",
      "test"
    ],
    "origin": "Tự biên soạn",
    "source": "https://playwright.dev/docs/intro",
    "path": ".agents/skills/reproducible-experiments/SKILL.md"
  },
  {
    "category": "QA, Security & Delivery",
    "id": "test-pyramid",
    "title": "Thiết kế kiểm thử từ unit đến E2E",
    "level": "Trung cấp",
    "summary": "Dùng đúng loại test cho logic, tích hợp, luồng người dùng và rủi ro.",
    "steps": [
      "Lập risk-based test matrix",
      "Viết unit cho logic thuần",
      "Viết integration/contract cho API và DB",
      "Viết E2E cho luồng quan trọng và negative cases",
      "Thêm visual, a11y, performance theo scope"
    ],
    "deliverables": "Test plan, coverage matrix, reproducible commands",
    "checks": [
      "Không nhầm unit PASS với user-journey PASS"
    ],
    "tags": [
      "qa",
      "testing",
      "e2e"
    ],
    "origin": "Tự biên soạn",
    "source": "https://playwright.dev/docs/intro",
    "path": ".agents/skills/test-pyramid/SKILL.md"
  },
  {
    "category": "QA, Security & Delivery",
    "id": "safe-deploy",
    "title": "Deploy an toàn với blue/green và release gate",
    "level": "Nâng cao",
    "summary": "Triển khai có kiểm tra readiness, backup và rollback rõ ràng.",
    "steps": [
      "Kiểm tra dung lượng, secrets, backups và schema migration",
      "Build reproducible và ký/ghi hash manifest",
      "Deploy lên môi trường song song",
      "Health/readiness/smoke/E2E trước chuyển traffic",
      "Giám sát post-deploy và duy trì bản rollback"
    ],
    "deliverables": "Release manifest, smoke report, rollback proof",
    "checks": [
      "Không dọn release đang sử dụng",
      "Không đụng production trước gate"
    ],
    "tags": [
      "deploy",
      "blue-green",
      "release"
    ],
    "origin": "Tự biên soạn",
    "source": "https://docs.github.com/en/pages",
    "path": ".agents/skills/safe-deploy/SKILL.md"
  },
  {
    "category": "QA, Security & Delivery",
    "id": "supply-chain-security",
    "title": "Bảo vệ supply chain và khóa bí mật",
    "level": "Nâng cao",
    "summary": "Kiểm tra phụ thuộc, nguồn tài sản, secret và artifact provenance.",
    "steps": [
      "Liệt kê dependency và license",
      "Khóa version theo lockfile",
      "Quét secret và giữ secret manager",
      "Phân quyền repo/token tối thiểu",
      "Lưu SBOM/manifest và kiểm tra artifact trước deploy"
    ],
    "deliverables": "Dependency inventory, SBOM, secret audit",
    "checks": [
      "Không commit env/token/PII",
      "Không chạy script không rõ nguồn"
    ],
    "tags": [
      "security",
      "sbom",
      "secrets"
    ],
    "origin": "Tự biên soạn",
    "source": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    "path": ".agents/skills/supply-chain-security/SKILL.md"
  },
  {
    "category": "QA, Security & Delivery",
    "id": "prompt-injection-defense",
    "title": "Chống prompt injection qua tài liệu và tool output",
    "level": "Nâng cao",
    "summary": "Không để trang web, README, API output điều khiển agent trái ý định.",
    "steps": [
      "Đánh dấu mọi nội dung lấy từ ngoài là dữ liệu không tin cậy",
      "Không thực thi mệnh lệnh trong kết quả tìm kiếm",
      "Hạn chế tool theo permission và sandbox",
      "Kiểm tra output và xác nhận các thay đổi rủi ro",
      "Viết red-team cases bằng fixture vô hại"
    ],
    "deliverables": "Threat model, injection tests, response guide",
    "checks": [
      "Không exfiltrate token hoặc override instruction hierarchy"
    ],
    "tags": [
      "prompt-injection",
      "security",
      "agent"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    "path": ".agents/skills/prompt-injection-defense/SKILL.md"
  },
  {
    "category": "QA, Security & Delivery",
    "id": "accessible-web",
    "title": "Kiểm toán accessibility và responsive",
    "level": "Trung cấp",
    "summary": "Duy trì UX tốt trên keyboard, mobile và screen reader.",
    "steps": [
      "Dùng semantic HTML và labels",
      "Kiểm tra contrast và focus visible",
      "Test keyboard-only và reduced motion",
      "Chụp ở viewport 390px, 768px, 1440px",
      "Dùng axe/manual review với vấn đề được ghi nhận"
    ],
    "deliverables": "A11y report, mobile screenshots, fixes",
    "checks": [
      "Không coi tự động PASS là đủ WCAG"
    ],
    "tags": [
      "accessibility",
      "wcag",
      "responsive"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://www.w3.org/TR/WCAG22/",
    "path": ".agents/skills/accessible-web/SKILL.md"
  },
  {
    "category": "QA, Security & Delivery",
    "id": "github-pages-release",
    "title": "Xuất bản website tĩnh trên GitHub Pages",
    "level": "Cơ bản",
    "summary": "Tạo website deploy không cần framework, với đường dẫn tương đối và kiểm chứng URL.",
    "steps": [
      "Tạo repo, index.html và .nojekyll",
      "Bật Pages từ branch trong Settings hoặc API",
      "Chỉ dùng đường dẫn tương đối cho project site",
      "Xác nhận source branch và build status",
      "Kiểm tra URL public, assets và console"
    ],
    "deliverables": "Public repo, Pages URL, smoke results",
    "checks": [
      "Repository tồn tại không có nghĩa Pages đã bật"
    ],
    "tags": [
      "github",
      "pages",
      "static"
    ],
    "origin": "Tham khảo và biên soạn",
    "source": "https://docs.github.com/en/pages",
    "path": ".agents/skills/github-pages-release/SKILL.md"
  }
];
