# Cài 60 Agent Skills vào dự án riêng

Thư viện Skillbook có 60 thư mục SKILL.md độc lập. Dùng Node.js 22+ (không npm install) sau khi clone repository. Chỉ cài vào dự án do bạn sở hữu hoặc được phép thay đổi.

## 1. Xem danh sách

~~~bash
git clone https://github.com/trinhtanphat/agent-harness-skillbook.git
cd agent-harness-skillbook
node scripts/install-skills.mjs --list
~~~

## 2. Chạy thử không ghi dữ liệu

~~~bash
node scripts/install-skills.mjs --skill complete-repository-mirror --target /path/to/your-project
~~~

Trên Windows có thể dùng --target "D:\\MyProject". Dự án đích phải tồn tại. Chế độ mặc định là DRY RUN; in skill và checksum, không ghi file.

## 3. Cài khi đã kiểm tra phạm vi

~~~bash
node scripts/install-skills.mjs --skill complete-repository-mirror --target /path/to/your-project --write
node scripts/install-skills.mjs --all --target /path/to/your-project --write
node scripts/install-skills.mjs --skill complete-repository-mirror --format claude --target /path/to/your-project --write
node scripts/install-skills.mjs --skill complete-repository-mirror --format github --target /path/to/your-project --write
~~~

Format agents ghi vào .agents/skills; claude vào .claude/skills; github vào .github/skills.

**An toàn:** chỉ đọc file Skillbook hiện có; không cần API hoặc mạng; yêu cầu --target; không ghi đè skill cũ; chống ID ngoài danh mục, thư mục đích symlink và ghi ngoài dự án. Nếu một skill đã tồn tại, preflight dừng trước khi bắt đầu ghi.

## 4. Kiểm thử

~~~bash
node scripts/test-install-skills.mjs
~~~

Bộ test tạo dự án giả trong thư mục tạm, kiểm tra đủ 60 skill, ba layout, file gốc khớp từng byte, từ chối ghi đè và path traversal. Không sử dụng GitHub Actions.

Giới hạn: đây là trình chép file Skill.md vào dự án, không tự cài extension hay thay đổi cấu hình agent. Việc sử dụng các skill tùy thuộc chương trình AI agent hỗ trợ định dạng tương ứng.